import { motion, AnimatePresence } from 'framer-motion'
import { Clock, AlertTriangle, ChefHat } from 'lucide-react'
import { cn } from '../../lib/utils'
import { useRestaurantStore } from '../../store/restaurantStore'
import { toast } from 'sonner'

const URGENCY_CFG = {
  normal:  {
    leftBorder: '#22c55e',    // green-500
    timerColor: 'text-green-400',
    icon: Clock,
    iconColor: 'text-green-400',
    badge: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'On Time' },
  },
  warning: {
    leftBorder: '#f59e0b',    // amber-500
    timerColor: 'text-amber-400',
    icon: AlertTriangle,
    iconColor: 'text-amber-400',
    badge: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Running Late' },
  },
  delayed: {
    leftBorder: '#ef4444',    // red-500
    timerColor: 'text-red-400',
    icon: AlertTriangle,
    iconColor: 'text-red-400',
    badge: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Delayed' },
  },
}

export function KitchenPanel() {
  const { kots, markReady } = useRestaurantStore()

  function handleMarkReady(id: string, tableRef: string) {
    toast.success(`KOT for ${tableRef} marked ready`)
    markReady(id)
  }

  return (
    <div
      className="w-[290px] shrink-0 flex flex-col overflow-hidden border-l"
      style={{ background: '#12100E', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 shrink-0 border-b flex items-center justify-between"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-orange-500" />
          <h2 className="font-semibold text-white text-sm">Kitchen Display</h2>
        </div>
        {kots.length > 0 && (
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500 text-white">
            {kots.length}
          </span>
        )}
      </div>

      {/* KOT list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence initial={false}>
          {kots.map((kot) => {
            const cfg = URGENCY_CFG[kot.urgency]
            const Icon = cfg.icon

            return (
              <motion.div
                key={kot.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: 30, transition: { duration: 0.25 } }}
                transition={{ duration: 0.2 }}
                className="rounded-xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: `3px solid ${cfg.leftBorder}`,
                }}
              >
                <div className="p-3">
                  {/* KOT header */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-white/40">{kot.kotNumber}</span>
                    <div className={cn('flex items-center gap-1 text-xs font-semibold', cfg.timerColor)}>
                      <Icon className={cn('w-3 h-3', cfg.iconColor)} />
                      {kot.timer}
                    </div>
                  </div>

                  {/* Table name */}
                  <p className="text-base font-bold text-white leading-tight mb-0.5">{kot.tableRef}</p>

                  {/* Urgency badge */}
                  <span
                    className={cn(
                      'inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-2',
                      cfg.badge.bg,
                      cfg.badge.text,
                    )}
                  >
                    {cfg.badge.label}
                  </span>

                  {/* Items */}
                  <ul className="space-y-0.5 mb-3">
                    {kot.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-white/60 w-5 shrink-0">{item.qty}×</span>
                        <span className="text-white/50">{item.name}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Actions */}
                  <button
                    onClick={() => handleMarkReady(kot.id, kot.tableRef)}
                    className="w-full py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors mb-1.5"
                  >
                    Mark Ready
                  </button>
                  <button
                    onClick={() => {
                      toast.error(`KOT ${kot.kotNumber} voided`)
                      markReady(kot.id)
                    }}
                    className="w-full py-1.5 rounded-lg border text-xs font-medium text-white/40 hover:text-red-400 hover:border-red-500/40 transition-colors"
                    style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  >
                    Void
                  </button>
                </div>
              </motion.div>
            )
          })}

          {kots.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-white/20"
            >
              <ChefHat className="w-10 h-10 mb-2" />
              <p className="text-sm">All orders ready</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

