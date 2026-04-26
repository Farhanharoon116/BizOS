import { motion } from 'framer-motion'
import { UserPlus, Star, Phone, ShoppingBag } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { formatPKR } from '../lib/format'
import type { Customer } from '../types'

const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Ali Hassan',      phone: '0300-1234567', email: 'ali@example.com',     loyaltyPoints: 840,  totalSpent: 52400, visitCount: 34, tier: 'vip',     avatarInitials: 'AH' },
  { id: '2', name: 'Sana Mirza',      phone: '0321-9876543',                                loyaltyPoints: 320,  totalSpent: 21800, visitCount: 18, tier: 'regular', avatarInitials: 'SM' },
  { id: '3', name: 'Bilal Ahmed',     phone: '0333-5554321', email: 'bilal@example.com',   loyaltyPoints: 120,  totalSpent: 8500,  visitCount: 7,  tier: 'regular', avatarInitials: 'BA' },
  { id: '4', name: 'Zara Khan',       phone: '0312-7778880',                                loyaltyPoints: 50,   totalSpent: 2900,  visitCount: 3,  tier: 'new',     avatarInitials: 'ZK' },
  { id: '5', name: 'Imran Qureshi',   phone: '0345-3332221', email: 'imran@example.com',   loyaltyPoints: 1200, totalSpent: 78000, visitCount: 58, tier: 'vip',     avatarInitials: 'IQ' },
  { id: '6', name: 'Nadia Hussain',   phone: '0311-8889997',                                loyaltyPoints: 275,  totalSpent: 18600, visitCount: 14, tier: 'regular', avatarInitials: 'NH' },
]

const tierConfig: Record<Customer['tier'], { label: string; variant: 'default' | 'secondary' | 'warning'; color: string }> = {
  vip:     { label: 'VIP',     variant: 'default',   color: 'text-brand-600' },
  regular: { label: 'Regular', variant: 'secondary', color: 'text-gray-600' },
  new:     { label: 'New',     variant: 'warning',   color: 'text-amber-600' },
}

const AVATAR_COLORS = [
  'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700', 'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700', 'bg-teal-100 text-teal-700',
]

export function CRMPage() {
  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500">{CUSTOMERS.length} registered customers</p>
        </div>
        <Button size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {CUSTOMERS.map((c, i) => {
          const tier = tierConfig[c.tier]
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="h-11 w-11">
                  <AvatarFallback className={AVATAR_COLORS[i % AVATAR_COLORS.length] + ' text-sm font-semibold'}>
                    {c.avatarInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</p>
                </div>
                <Badge variant={tier.variant}>{tier.label}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-gray-100 pt-3">
                <div>
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><Star className="w-3 h-3" />Points</p>
                  <p className={`font-bold mt-0.5 ${tier.color}`}>{c.loyaltyPoints}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Spent</p>
                  <p className="font-bold text-gray-900 mt-0.5 text-sm">{formatPKR(c.totalSpent)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><ShoppingBag className="w-3 h-3" />Visits</p>
                  <p className="font-bold text-gray-900 mt-0.5">{c.visitCount}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
