import { create } from 'zustand'
import type { CartItem } from '../types'

export interface CompletedSale {
  id: string
  receiptNumber: string
  items: CartItem[]
  subtotal: number
  tax: number
  discount: number
  total: number
  paymentMethod: string
  customerId: string | null
  customerName: string | null
  createdAt: Date
}

let saleCounter = 1001

interface SaleState {
  sales: CompletedSale[]
  recordSale: (sale: Omit<CompletedSale, 'id' | 'receiptNumber' | 'createdAt'>) => CompletedSale
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: [],

  recordSale: (data) => {
    const sale: CompletedSale = {
      ...data,
      id: `sale-${Date.now()}`,
      receiptNumber: `RCP-${saleCounter++}`,
      createdAt: new Date(),
    }
    set((state) => ({ sales: [sale, ...state.sales] }))
    return sale
  },
}))
