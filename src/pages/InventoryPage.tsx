import { useState } from 'react'
import { Plus, AlertTriangle, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { PRODUCTS } from '../constants'
import { formatPKR } from '../lib/format'
import { AddProductModal } from '../components/products/AddProductModal'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '../components/ui/table'

export function InventoryPage() {
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = PRODUCTS.filter((p) =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  )

  function stockStatus(p: typeof PRODUCTS[number]) {
    if (p.stock === 0) return <Badge variant="destructive">Out of Stock</Badge>
    if (p.stock <= p.reorderPoint) return <Badge variant="warning">Low Stock</Badge>
    return <Badge variant="success">In Stock</Badge>
  }

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500">{PRODUCTS.length} products</p>
        </div>
        <Button onClick={() => setModalOpen(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Low stock alert */}
      {PRODUCTS.some((p) => p.stock <= p.reorderPoint) && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-sm">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            {PRODUCTS.filter((p) => p.stock <= p.reorderPoint && p.stock > 0).length} products are low on stock
            {PRODUCTS.filter((p) => p.stock === 0).length > 0 && ` · ${PRODUCTS.filter((p) => p.stock === 0).length} out of stock`}
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
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="font-mono text-xs text-gray-500">{p.sku}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{p.category}</Badge>
                </TableCell>
                <TableCell>{formatPKR(p.price)}</TableCell>
                <TableCell className="text-gray-500">{formatPKR(p.costPrice)}</TableCell>
                <TableCell className={p.stock === 0 ? 'text-red-500 font-bold' : p.stock <= p.reorderPoint ? 'text-amber-600 font-semibold' : ''}>
                  {p.stock} {p.unit}
                </TableCell>
                <TableCell>{stockStatus(p)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <AddProductModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
