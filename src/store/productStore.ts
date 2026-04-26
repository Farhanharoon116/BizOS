import { create } from 'zustand'
import { PRODUCTS } from '../constants'
import type { Product } from '../types'

let nextId = PRODUCTS.length + 1

export function generateSKU(name: string, category: string): string {
  const namePart = name
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .split(' ')
    .map((w) => w.slice(0, 3))
    .join('')
    .slice(0, 6)
  const catPart = category.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 3)
  const rand = Math.floor(100 + Math.random() * 900)
  return `${namePart}-${catPart}-${rand}`
}

interface ProductState {
  products: Product[]
  addProduct: (p: Omit<Product, 'id' | 'colorClass' | 'isActive'>) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void
  toggleActive: (id: number) => void
}

const COLOR_CYCLE: Product['colorClass'][] = ['c1', 'c2', 'c3', 'c4']

export const useProductStore = create<ProductState>((set) => ({
  products: PRODUCTS,

  addProduct: (p) =>
    set((state) => {
      const id = nextId++
      const colorClass = COLOR_CYCLE[(id - 1) % COLOR_CYCLE.length]
      return {
        products: [
          ...state.products,
          { ...p, id, colorClass, isActive: true },
        ],
      }
    }),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  toggleActive: (id) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p,
      ),
    })),
}))
