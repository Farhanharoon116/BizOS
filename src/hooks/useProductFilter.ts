import { useMemo } from 'react'
import { useProductStore } from '../store/productStore'
import { useUIStore } from '../store/uiStore'

export function useProductFilter() {
  const products = useProductStore((s) => s.products)
  const activeCategory = useUIStore((s) => s.activeCategory)
  const searchQuery = useUIStore((s) => s.searchQuery)

  return useMemo(() => {
    return products.filter((p) => {
      if (!p.isActive) return false
      const matchCat = activeCategory === 'All Products' || p.category === activeCategory
      const q = searchQuery.toLowerCase()
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [products, activeCategory, searchQuery])
}
