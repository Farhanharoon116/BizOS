import { motion } from 'framer-motion'
import { useRestaurantStore } from '../../store/restaurantStore'
import { cn } from '../../lib/utils'
import type { TableStatus } from '../../types'
import { Clock, Users } from 'lucide-react'

const STATUS_CONFIG: Record<TableStatus, { label: string; bg: string; border: string; text: string }> = {
  available: { label: 'Available', bg: 'bg-emerald-50',  border: 'border-emerald-200', text: 'text-emerald-700' },
  occupied:  { label: 'Occupied',  bg: 'bg-blue-50',     border: 'border-blue-200',    text: 'text-blue-700' },
  reserved:  { label: 'Reserved',  bg: 'bg-amber-50',    border: 'border-amber-200',   text: 'text-amber-700' },
  cleaning:  { label: 'Cleaning',  bg: 'bg-gray-50',     border: 'border-gray-200',    text: 'text-gray-500' },
}

export function FloorArea() {
  const { tables, cycleTable } = useRestaurantStore()

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {tables.map((table, i) => {
          const cfg = STATUS_CONFIG[table.status]
          return (
            <motion.button
              key={table.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => cycleTable(table.id)}
              className={cn(
                'relative text-left p-4 rounded-xl border-2 transition-all hover:scale-[1.03] active:scale-[0.97]',
                cfg.bg, cfg.border,
                table.isWarning && 'ring-2 ring-red-400 ring-offset-1',
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{table.number}</span>
                <Users className={cn('w-4 h-4', cfg.text)} />
              </div>
              <span className={cn('text-xs font-semibold', cfg.text)}>{cfg.label}</span>
              {table.timer && (
                <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{table.timer}</span>
                </div>
              )}
              {table.isWarning && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-pulse-dot" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
