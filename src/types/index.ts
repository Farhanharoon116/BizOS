// Auth
export interface User {
  id: string
  phone: string
  name: string
  role: 'owner' | 'manager' | 'cashier' | 'employee'
  businessId: string
  branchId?: string
  avatarInitials: string
}

// Business
export interface Business {
  id: string
  name: string
  type: 'retail' | 'restaurant' | 'pharmacy' | 'salon' | 'workshop' | 'wholesale'
  city: string
  currency: 'PKR' | 'USD'
  taxId?: string
  logoUrl?: string
  plan: 'starter' | 'growth' | 'enterprise'
}

// Branch
export interface Branch {
  id: string
  businessId: string
  name: string
  address: string
  managerId?: string
}

// Product
export interface Product {
  id: number
  name: string
  nameUrdu?: string
  sku: string
  category: string
  price: number
  costPrice: number
  taxRate: number
  stock: number
  reorderPoint: number
  unit: string
  imageUrl?: string
  colorClass: 'c1' | 'c2' | 'c3' | 'c4'
  isActive: boolean
}

// Cart
export interface CartItem extends Product {
  qty: number
  lineTotal: number
}

// Sale
export interface Sale {
  id: string
  receiptNumber: string
  businessId: string
  branchId: string
  cashierId: string
  shiftId: string
  customerId?: string
  items: SaleItem[]
  subtotal: number
  taxAmount: number
  discount: number
  total: number
  paymentMethod: 'cash' | 'card' | 'easypaisa' | 'jazzcash' | 'credit'
  createdAt: Date
  status: 'paid' | 'pending' | 'refunded'
}

export interface SaleItem {
  productId: number
  name: string
  qty: number
  unitPrice: number
  taxRate: number
  discount: number
  total: number
}

// Employee
export interface Employee {
  id: string
  name: string
  role: string
  phone: string
  salary: number
  attendance: number
  hireDate: string
  status: 'on-shift' | 'on-leave' | 'absent'
  avatarInitials: string
  avatarColor: string
}

// Customer (CRM)
export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  loyaltyPoints: number
  totalSpent: number
  visitCount: number
  tier: 'new' | 'regular' | 'vip'
  avatarInitials: string
}

// Restaurant
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'

export interface RestaurantTable {
  id: string
  number: string
  status: TableStatus
  timer?: string
  isWarning?: boolean
}

export interface KOT {
  id: string
  kotNumber: string
  tableRef: string
  items: KOTItem[]
  timer: string
  urgency: 'normal' | 'warning' | 'delayed'
}

export interface KOTItem {
  qty: number
  name: string
}

// KPI Dashboard
export interface KPIData {
  label: string
  value: string
  delta: string
  deltaType: 'up' | 'down' | 'neutral'
  deltaLabel: string
  color: 'blue' | 'green' | 'amber' | 'purple'
}
