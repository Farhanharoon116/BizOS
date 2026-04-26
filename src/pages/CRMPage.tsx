import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Star, Phone, ShoppingBag, Search } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { formatPKR } from '../lib/format'
import { useCustomerStore } from '../store/customerStore'
import { AddCustomerModal } from '../components/crm/AddCustomerModal'
import type { Customer } from '../types'

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
  const customers = useCustomerStore((s) => s.customers)
  const [addOpen, setAddOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = customers.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  )

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500">{customers.length} registered customers</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setAddOpen(true)}>
          <UserPlus className="w-4 h-4" />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone…"
          className="w-full h-9 pl-9 pr-3 rounded-lg bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, i) => {
          const tier = tierConfig[c.tier]
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i, 5) * 0.06 }}
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
                  {c.email && <p className="text-xs text-gray-400 truncate">{c.email}</p>}
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

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">
            No customers found
          </div>
        )}
      </div>

      <AddCustomerModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
