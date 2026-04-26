import { create } from 'zustand'
import type { Customer } from '../types'

const INITIAL: Customer[] = [
  { id: '1', name: 'Ali Hassan',    phone: '0300-1234567', email: 'ali@example.com',   loyaltyPoints: 840,  totalSpent: 52400, visitCount: 34, tier: 'vip',     avatarInitials: 'AH' },
  { id: '2', name: 'Sana Mirza',    phone: '0321-9876543',                              loyaltyPoints: 320,  totalSpent: 21800, visitCount: 18, tier: 'regular', avatarInitials: 'SM' },
  { id: '3', name: 'Bilal Ahmed',   phone: '0333-5554321', email: 'bilal@example.com', loyaltyPoints: 120,  totalSpent: 8500,  visitCount: 7,  tier: 'regular', avatarInitials: 'BA' },
  { id: '4', name: 'Zara Khan',     phone: '0312-7778880',                              loyaltyPoints: 50,   totalSpent: 2900,  visitCount: 3,  tier: 'new',     avatarInitials: 'ZK' },
  { id: '5', name: 'Imran Qureshi', phone: '0345-3332221', email: 'imran@example.com', loyaltyPoints: 1200, totalSpent: 78000, visitCount: 58, tier: 'vip',     avatarInitials: 'IQ' },
  { id: '6', name: 'Nadia Hussain', phone: '0311-8889997',                              loyaltyPoints: 275,  totalSpent: 18600, visitCount: 14, tier: 'regular', avatarInitials: 'NH' },
]

let nextId = INITIAL.length + 1

interface CustomerState {
  customers: Customer[]
  addCustomer: (c: Omit<Customer, 'id' | 'loyaltyPoints' | 'totalSpent' | 'visitCount' | 'tier' | 'avatarInitials'>) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void
  addSale: (id: string, amount: number) => void
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function tier(totalSpent: number): Customer['tier'] {
  if (totalSpent >= 30000) return 'vip'
  if (totalSpent >= 5000) return 'regular'
  return 'new'
}

export const useCustomerStore = create<CustomerState>((set) => ({
  customers: INITIAL,

  addCustomer: (c) =>
    set((state) => ({
      customers: [
        ...state.customers,
        {
          ...c,
          id: String(nextId++),
          loyaltyPoints: 0,
          totalSpent: 0,
          visitCount: 0,
          tier: 'new',
          avatarInitials: initials(c.name),
        },
      ],
    })),

  updateCustomer: (id, updates) =>
    set((state) => ({
      customers: state.customers.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    })),

  addSale: (id, amount) =>
    set((state) => ({
      customers: state.customers.map((c) => {
        if (c.id !== id) return c
        const totalSpent = c.totalSpent + amount
        const loyaltyPoints = c.loyaltyPoints + Math.floor(amount / 100)
        const visitCount = c.visitCount + 1
        return { ...c, totalSpent, loyaltyPoints, visitCount, tier: tier(totalSpent) }
      }),
    })),
}))
