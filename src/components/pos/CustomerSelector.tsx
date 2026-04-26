import { useState, useRef, useEffect } from 'react'
import { Search, UserCheck, X } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useCustomerStore } from '../../store/customerStore'

export function CustomerSelector() {
  const { customerId, customerName, setCustomer, clearCustomer } = useCartStore()
  const customers = useCustomerStore((s) => s.customers)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = customers.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.phone.includes(query),
  )

  if (customerId) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-50 border border-brand-200">
        <UserCheck className="w-4 h-4 text-brand-500 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-brand-700 truncate">{customerName}</p>
          <p className="text-xs text-brand-500">Loyalty discount applied</p>
        </div>
        <button
          onClick={clearCustomer}
          className="p-0.5 rounded hover:bg-brand-100 text-brand-400 hover:text-brand-600 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search customer…"
          className="w-full h-9 pl-8 pr-3 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
        />
      </div>

      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-4">No customers found</p>
          ) : (
            filtered.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCustomer(c.id, c.name)
                  setQuery('')
                  setOpen(false)
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                <p className="text-sm font-medium text-gray-900">{c.name}</p>
                <p className="text-xs text-gray-400">{c.phone} · {c.loyaltyPoints} pts · {c.tier}</p>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
