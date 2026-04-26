import { motion, AnimatePresence } from 'framer-motion'
import { useRestaurantStore } from '../../store/restaurantStore'
import { cn } from '../../lib/utils'
import type { TableStatus } from '../../types'
import { LayoutGrid, Users, CalendarCheck, Trash2, TrendingUp, Utensils, ClipboardList, AlertTriangle } from 'lucide-react'

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CFG: Record<
  TableStatus,
  {
    bar: string        // top color bar bg
    border: string     // border color class
    tint: string       // subtle bg tint
    icon: React.ElementType
    iconBg: string     // icon circle bg
    iconText: string   // icon color
    label: string
    labelColor: string
    timerColor: string
  }
> = {
  available: {
    bar:        'bg-green-500',
    border:     'border-green-200',
    tint:       'bg-white',
    icon:       LayoutGrid,
    iconBg:     'bg-green-100',
    iconText:   'text-green-600',
    label:      'Available',
    labelColor: 'text-green-600',
    timerColor: 'text-green-500',
  },
  occupied: {
    bar:        'bg-red-500',
    border:     'border-red-200',
    tint:       'bg-red-50/50',
    icon:       Users,
    iconBg:     'bg-red-100',
    iconText:   'text-red-600',
    label:      'Occupied',
    labelColor: 'text-red-600',
    timerColor: 'text-gray-500',
  },
  reserved: {
    bar:        'bg-amber-500',
    border:     'border-amber-200',
    tint:       'bg-amber-50/50',
    icon:       CalendarCheck,
    iconBg:     'bg-amber-100',
    iconText:   'text-amber-600',
    label:      'Reserved',
    labelColor: 'text-amber-600',
    timerColor: 'text-amber-500',
  },
  cleaning: {
    bar:        'bg-slate-400',
    border:     'border-slate-200',
    tint:       'bg-white',
    icon:       Trash2,
    iconBg:     'bg-slate-100',
    iconText:   'text-slate-500',
    label:      'Cleaning',
    labelColor: 'text-slate-500',
    timerColor: 'text-slate-400',
  },
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KPICardProps {
  label: string
  value: string
  sub?: string
  icon: React.ElementType
  accent: string   // Tailwind bg class for icon circle
  textAccent: string
}

function KPICard({ label, value, sub, icon: Icon, accent, textAccent }: KPICardProps) {
  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 flex items-center gap-3">
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', accent)}>
        <Icon className={cn('w-4 h-4', textAccent)} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 truncate">{label}</p>
        <p className="text-lg font-bold font-display text-gray-900 leading-tight">{value}</p>
        {sub && <p className="text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  )
}

// ─── Table Tile ───────────────────────────────────────────────────────────────
interface TableTileProps {
  id: string
  number: string
  status: TableStatus
  timer?: string
  isWarning?: boolean
  onCycle: (id: string) => void
}

function TableTile({ id, number, status, timer, isWarning, onCycle }: TableTileProps) {
  const cfg = STATUS_CFG[status]
  const Icon = cfg.icon

  return (
    <motion.button
      layout
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onCycle(id)}
      className={cn(
        'relative w-full rounded-xl border overflow-hidden text-center cursor-pointer transition-colors',
        cfg.tint,
        cfg.border,
      )}
      style={{ padding: '12px 8px' }}
    >
      {/* Colored top bar */}
      <div className={cn('absolute top-0 left-0 right-0 h-[2.5px]', cfg.bar)} />

      {/* Icon circle */}
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-1.5',
            cfg.iconBg,
          )}
        >
          <Icon className={cn('w-4 h-4', cfg.iconText)} />
        </motion.div>
      </AnimatePresence>

      {/* Table number */}
      <p className="text-sm font-bold text-gray-900">{number}</p>

      {/* Status label */}
      <p className={cn('text-[11px] font-semibold mt-0.5', cfg.labelColor)}>{cfg.label}</p>

      {/* Timer */}
      {timer && (
        <p
          className={cn(
            'text-[10px] mt-0.5',
            isWarning ? 'text-amber-500 font-semibold' : cfg.timerColor,
          )}
        >
          {timer}
        </p>
      )}

      {/* Warning pulse dot */}
      {isWarning && (
        <span className="absolute top-3 right-2.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse-dot" />
      )}
    </motion.button>
  )
}

// ─── Floor Area ───────────────────────────────────────────────────────────────
export function FloorArea() {
  const { tables, kots, cycleTable } = useRestaurantStore()

  const activeKOTs  = kots.length
  const delayedKOTs = kots.filter((k) => k.urgency === 'delayed').length
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4">
      {/* KPI row */}
      <div className="flex gap-3">
        <KPICard
          label="Today's Revenue"
          value="Rs 48,200"
          sub="+12% vs yesterday"
          icon={TrendingUp}
          accent="bg-emerald-100"
          textAccent="text-emerald-600"
        />
        <KPICard
          label="Covers"
          value={String(occupiedCount * 4)}
          sub={`${occupiedCount} tables active`}
          icon={Utensils}
          accent="bg-blue-100"
          textAccent="text-blue-600"
        />
        <KPICard
          label="Active KOTs"
          value={String(activeKOTs)}
          sub="kitchen orders"
          icon={ClipboardList}
          accent="bg-orange-100"
          textAccent="text-orange-600"
        />
        <KPICard
          label="Delayed"
          value={String(delayedKOTs)}
          sub="need attention"
          icon={AlertTriangle}
          accent={delayedKOTs > 0 ? 'bg-red-100' : 'bg-gray-100'}
          textAccent={delayedKOTs > 0 ? 'text-red-500' : 'text-gray-400'}
        />
      </div>

      {/* Floor label */}
      <div>
        <p className="text-sm font-semibold text-gray-700">
          Ground Floor —{' '}
          <span className="text-gray-500 font-normal">
            {tables.length} Tables · Click to cycle status
          </span>
        </p>
      </div>

      {/* Table grid – 5 columns */}
      <div className="grid grid-cols-5 gap-3">
        {tables.map((table) => (
          <TableTile
            key={table.id}
            id={table.id}
            number={table.number}
            status={table.status}
            timer={table.timer}
            isWarning={table.isWarning}
            onCycle={cycleTable}
          />
        ))}
      </div>
    </div>
  )
}

