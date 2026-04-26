import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { motion } from 'framer-motion'
import type { KPIData } from '../../types'

const KPI_DATA: KPIData[] = [
  { label: 'Today\'s Revenue', value: 'Rs 47,280', delta: '+12.4%', deltaType: 'up', deltaLabel: 'vs yesterday', color: 'blue' },
  { label: 'Transactions',     value: '184',       delta: '+8.2%',  deltaType: 'up', deltaLabel: 'vs yesterday', color: 'green' },
  { label: 'Avg Basket Size',  value: 'Rs 257',    delta: '-3.1%',  deltaType: 'down', deltaLabel: 'vs yesterday', color: 'amber' },
  { label: 'Active Customers', value: '1,248',     delta: '+5.7%',  deltaType: 'up', deltaLabel: 'this month', color: 'purple' },
]

const colorMap: Record<KPIData['color'], { bg: string; text: string; value: string }> = {
  blue:   { bg: 'bg-blue-50',   text: 'text-blue-600',   value: 'text-blue-700' },
  green:  { bg: 'bg-emerald-50', text: 'text-emerald-600', value: 'text-emerald-700' },
  amber:  { bg: 'bg-amber-50',  text: 'text-amber-600',  value: 'text-amber-700' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', value: 'text-purple-700' },
}

function DeltaIcon({ type }: { type: KPIData['deltaType'] }) {
  if (type === 'up') return <TrendingUp className="w-3.5 h-3.5" />
  if (type === 'down') return <TrendingDown className="w-3.5 h-3.5" />
  return <Minus className="w-3.5 h-3.5" />
}

export function KPIGrid() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {KPI_DATA.map((kpi, i) => {
        const colors = colorMap[kpi.color]
        const deltaColor = kpi.deltaType === 'up' ? 'text-emerald-600' : kpi.deltaType === 'down' ? 'text-red-500' : 'text-gray-500'
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500 font-medium">{kpi.label}</p>
            <p className={`mt-2 text-2xl font-bold font-display ${colors.value}`}>{kpi.value}</p>
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${deltaColor}`}>
              <DeltaIcon type={kpi.deltaType} />
              <span>{kpi.delta}</span>
              <span className="text-gray-400 font-normal">{kpi.deltaLabel}</span>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
