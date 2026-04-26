import { useMemo } from 'react'
import { PRODUCTS } from '../constants'
import { useUIStore } from '../store/uiStore'

export function useProductFilter() {
  const activeCategory = useUIStore((s) => s.activeCategory)
  const searchQuery = useUIStore((s) => s.searchQuery)

  return useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === 'All Products' || p.category === activeCategory
      const q = searchQuery.toLowerCase()
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [activeCategory, searchQuery])
}
