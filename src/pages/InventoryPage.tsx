import { useState } from 'react'
import { Plus, AlertTriangle, Search, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatPKR } from '../lib/format'
import { AddProductModal } from '../components/products/AddProductModal'
import { EditProductModal } from '../components/products/EditProductModal'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '../components/ui/table'
import { useProductStore } from '../store/productStore'
import { toast } from 'sonner'
import type { Product } from '../types'

export function InventoryPage() {
  const { products, deleteProduct, toggleActive } = useProductStore()
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const filtered = products.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  )

  function stockStatus(p: Product) {
    if (!p.isActive) return <Badge variant="secondary">Inactive</Badge>
    if (p.stock === 0) return <Badge variant="destructive">Out of Stock</Badge>
    if (p.stock <= p.reorderPoint) return <Badge variant="warning">Low Stock</Badge>
    return <Badge variant="success">In Stock</Badge>
  }

  function handleDelete(p: Product) {
    if (window.confirm(`Delete "${p.name}"? This cannot be undone.`)) {
      deleteProduct(p.id)
      toast.success(`"${p.name}" deleted`)
    }
  }

  const lowStock = products.filter((p) => p.isActive && p.stock > 0 && p.stock <= p.reorderPoint).length
  const outOfStock = products.filter((p) => p.isActive && p.stock === 0).length

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">{products.length} products</p>
        </div>
        <Button onClick={() => setAddOpen(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Low stock alert */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {lowStock > 0 && `${lowStock} product${lowStock > 1 ? 's' : ''} low on stock`}
            {lowStock > 0 && outOfStock > 0 && ' · '}
            {outOfStock > 0 && `${outOfStock} out of stock`}
          </span>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          className="w-full h-9 pl-9 pr-3 rounded-lg bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Margin</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => {
              const margin = p.price > 0 ? ((p.price - p.costPrice) / p.price) * 100 : 0
              return (
                <TableRow key={p.id} className={!p.isActive ? 'opacity-50' : ''}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="font-mono text-xs text-gray-500">{p.sku}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.category}</Badge>
                  </TableCell>
                  <TableCell>{formatPKR(p.price)}</TableCell>
                  <TableCell className="text-gray-500">{formatPKR(p.costPrice)}</TableCell>
                  <TableCell className={margin >= 20 ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>
                    {margin.toFixed(1)}%
                  </TableCell>
                  <TableCell className={p.stock === 0 ? 'text-red-500 font-bold' : p.stock <= p.reorderPoint ? 'text-amber-600 font-semibold' : ''}>
                    {p.stock} {p.unit}
                  </TableCell>
                  <TableCell>{stockStatus(p)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { toggleActive(p.id); toast.success(`"${p.name}" ${p.isActive ? 'deactivated' : 'activated'}`) }}
                        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                        title={p.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {p.isActive ? <ToggleRight className="w-4 h-4 text-emerald-500" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setEditProduct(p)}
                        className="p-1.5 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit product"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-10 text-gray-400 text-sm">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>

      <AddProductModal open={addOpen} onOpenChange={setAddOpen} />
      <EditProductModal product={editProduct} open={!!editProduct} onOpenChange={(v) => { if (!v) setEditProduct(null) }} />
    </div>
  )
}
