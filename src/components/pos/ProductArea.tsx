import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProductFilter } from '../../hooks/useProductFilter'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { formatPKR } from '../../lib/format'
import { CATEGORIES } from '../../constants'
import { cn } from '../../lib/utils'
import type { Product } from '../../types'

const COLOR_MAP: Record<Product['colorClass'], { bg: string; text: string; ring: string }> = {
  c1: { bg: 'bg-blue-100',    text: 'text-blue-700',   ring: 'ring-blue-300' },
  c2: { bg: 'bg-emerald-100', text: 'text-emerald-700', ring: 'ring-emerald-300' },
  c3: { bg: 'bg-amber-100',   text: 'text-amber-700',  ring: 'ring-amber-300' },
  c4: { bg: 'bg-purple-100',  text: 'text-purple-700', ring: 'ring-purple-300' },
}

const STOCK_BAR_COLOR: Record<Product['colorClass'], string> = {
  c1: 'bg-blue-400',
  c2: 'bg-emerald-400',
  c3: 'bg-amber-400',
  c4: 'bg-purple-400',
}

function StockBar({ stock, reorderPoint, colorClass }: { stock: number; reorderPoint: number; colorClass: Product['colorClass'] }) {
  const max = Math.max(reorderPoint * 3, stock, 1)
  const pct = Math.min(100, (stock / max) * 100)
  const isLow = stock > 0 && stock <= reorderPoint

  return (
    <div className="mt-2">
      <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            stock === 0 ? 'bg-red-300' : isLow ? 'bg-amber-400' : STOCK_BAR_COLOR[colorClass],
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function ProductArea() {
  const { activeCategory, searchQuery, setCategory, setSearch } = useUIStore()
  const products = useProductFilter()
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or SKU…"
            className="w-full h-10 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 px-4 py-2 overflow-x-auto scrollbar-none border-b border-gray-100 shrink-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              activeCategory === cat
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 content-start">
        {products.map((product, i) => {
          const colors = COLOR_MAP[product.colorClass]
          const isOut = product.stock === 0
          const isLow = product.stock > 0 && product.stock <= product.reorderPoint

          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => addItem(product)}
              disabled={isOut}
              className={cn(
                'relative text-left bg-white rounded-xl border border-gray-100 p-3.5 hover:border-brand-400 hover:shadow-md transition-all active:scale-95 flex flex-col',
                isOut && 'opacity-50 cursor-not-allowed',
              )}
            >
              {/* Color icon */}
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 text-sm font-bold ring-2 ring-offset-1', colors.bg, colors.text, colors.ring)}>
                {product.name.slice(0, 2).toUpperCase()}
              </div>

              <p className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">{product.name}</p>
              <p className="text-xs text-gray-400 mt-0.5 font-mono">{product.sku}</p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold text-brand-600">{formatPKR(product.price)}</span>
                {isOut ? (
                  <span className="text-xs text-red-500 font-medium">Out</span>
                ) : isLow ? (
                  <span className="text-xs text-amber-500 font-medium">Low: {product.stock}</span>
                ) : (
                  <span className="text-xs text-gray-400">Stk: {product.stock}</span>
                )}
              </div>

              <StockBar stock={product.stock} reorderPoint={product.reorderPoint} colorClass={product.colorClass} />

              {/* Category pill */}
              <span className={cn('mt-2 self-start text-[10px] font-medium px-1.5 py-0.5 rounded-full', colors.bg, colors.text)}>
                {product.category}
              </span>
            </motion.button>
          )
        })}

        {products.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">
            <p className="text-sm">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
