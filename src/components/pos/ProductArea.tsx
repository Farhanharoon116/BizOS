import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { useProductFilter } from '../../hooks/useProductFilter'
import { useUIStore } from '../../store/uiStore'
import { useCartStore } from '../../store/cartStore'
import { formatPKR } from '../../lib/format'
import { CATEGORIES } from '../../constants'
import { cn } from '../../lib/utils'
import type { Product } from '../../types'

const COLOR_MAP: Record<Product['colorClass'], string> = {
  c1: 'bg-blue-100 text-blue-700',
  c2: 'bg-emerald-100 text-emerald-700',
  c3: 'bg-amber-100 text-amber-700',
  c4: 'bg-purple-100 text-purple-700',
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
        {products.map((product, i) => (
          <motion.button
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            className={cn(
              'relative text-left bg-white rounded-xl border border-gray-100 p-3.5 hover:border-brand-400 hover:shadow-md transition-all active:scale-95',
              product.stock === 0 && 'opacity-50 cursor-not-allowed',
            )}
          >
            {/* Color indicator */}
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 text-xs font-bold', COLOR_MAP[product.colorClass])}>
              {product.name.slice(0, 2).toUpperCase()}
            </div>
            <p className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">{product.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{product.sku}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-bold text-brand-600">{formatPKR(product.price)}</span>
              {product.stock === 0 ? (
                <span className="text-xs text-red-500 font-medium">Out</span>
              ) : (
                <span className="text-xs text-gray-400">Stk: {product.stock}</span>
              )}
            </div>
          </motion.button>
        ))}

        {products.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400">
            <p className="text-sm">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}
