import { Clock, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { KOT } from '../../types'

const KOTS: KOT[] = [
  { id: '1', kotNumber: 'KOT-041', tableRef: 'T-05', timer: '18 min', urgency: 'delayed', items: [{ qty: 2, name: 'Chicken Karahi' }, { qty: 1, name: 'Naan x4' }, { qty: 1, name: 'Raita' }] },
  { id: '2', kotNumber: 'KOT-042', tableRef: 'T-01', timer: '08 min', urgency: 'warning', items: [{ qty: 1, name: 'Beef Biryani' }, { qty: 2, name: 'Seekh Kebab' }] },
  { id: '3', kotNumber: 'KOT-043', tableRef: 'T-09', timer: '03 min', urgency: 'normal',  items: [{ qty: 3, name: 'Nihari' }, { qty: 6, name: 'Naan' }] },
  { id: '4', kotNumber: 'KOT-044', tableRef: 'T-12', timer: '01 min', urgency: 'normal',  items: [{ qty: 1, name: 'BBQ Platter' }, { qty: 2, name: 'Pepsi' }] },
]

const urgencyConfig = {
  normal:  { bg: 'bg-white',       border: 'border-gray-100', timerColor: 'text-gray-500', icon: Clock,          iconColor: 'text-gray-400' },
  warning: { bg: 'bg-amber-50',    border: 'border-amber-200', timerColor: 'text-amber-700', icon: AlertTriangle, iconColor: 'text-amber-500' },
  delayed: { bg: 'bg-red-50',      border: 'border-red-200',  timerColor: 'text-red-700',   icon: AlertTriangle, iconColor: 'text-red-500' },
}

export function KitchenPanel() {
  return (
    <div className="w-80 border-l border-gray-100 flex flex-col bg-gray-50">
      <div className="px-4 py-3 border-b border-gray-100 bg-white">
        <h2 className="font-semibold text-gray-900">Kitchen Display</h2>
        <p className="text-xs text-gray-400">{KOTS.length} active orders</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {KOTS.map((kot) => {
          const cfg = urgencyConfig[kot.urgency]
          const Icon = cfg.icon
          return (
            <div key={kot.id} className={cn('rounded-xl border p-3.5', cfg.bg, cfg.border)}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-gray-900 text-sm">{kot.kotNumber}</span>
                  <span className="ml-2 text-xs text-gray-500">{kot.tableRef}</span>
                </div>
                <div className={cn('flex items-center gap-1 text-xs font-semibold', cfg.timerColor)}>
                  <Icon className={cn('w-3.5 h-3.5', cfg.iconColor)} />
                  {kot.timer}
                </div>
              </div>
              <ul className="space-y-1">
                {kot.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-bold text-gray-900 w-5">{item.qty}×</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Mark Ready
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
