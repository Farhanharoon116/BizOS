import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartState {
  items: Record<number, CartItem>
  customerId: string | null
  customerName: string | null
  paymentMethod: 'cash' | 'card' | 'easypaisa' | 'jazzcash'
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clearCart: () => void
  setCustomer: (id: string, name: string) => void
  clearCustomer: () => void
  setPaymentMethod: (method: CartState['paymentMethod']) => void
}

export const useCartStore = create<CartState>((set) => ({
  items: {},
  customerId: null,
  customerName: null,
  paymentMethod: 'cash',

  addItem: (product) => set((state) => {
    const existing = state.items[product.id]
    const qty = existing ? existing.qty + 1 : 1
    return {
      items: {
        ...state.items,
        [product.id]: { ...product, qty, lineTotal: product.price * qty },
      },
    }
  }),

  removeItem: (id) => set((state) => {
    const items = { ...state.items }
    delete items[id]
    return { items }
  }),

  updateQty: (id, qty) => set((state) => {
    if (qty <= 0) {
      const items = { ...state.items }
      delete items[id]
      return { items }
    }
    const item = state.items[id]
    return {
      items: {
        ...state.items,
        [id]: { ...item, qty, lineTotal: item.price * qty },
      },
    }
  }),

  clearCart: () => set({ items: {}, customerId: null, customerName: null }),

  setCustomer: (id, name) => set({ customerId: id, customerName: name }),

  clearCustomer: () => set({ customerId: null, customerName: null }),

  setPaymentMethod: (method) => set({ paymentMethod: method }),
}))

export const useCartTotals = () => {
  const items = useCartStore((s) => s.items)
  const customerId = useCartStore((s) => s.customerId)
  const subtotal = Object.values(items).reduce((acc, item) => acc + item.price * item.qty, 0)
  const tax = subtotal * 0.17
  const discount = customerId ? subtotal * 0.05 : 0
  const total = subtotal + tax - discount
  return { subtotal, tax, discount, total }
}
