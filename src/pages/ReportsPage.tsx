import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { formatPKR } from '../lib/format'

const WEEKLY_SALES = [
  { day: 'Mon', sales: 38000, transactions: 142 },
  { day: 'Tue', sales: 42000, transactions: 158 },
  { day: 'Wed', sales: 35000, transactions: 131 },
  { day: 'Thu', sales: 51000, transactions: 192 },
  { day: 'Fri', sales: 68000, transactions: 247 },
  { day: 'Sat', sales: 72000, transactions: 281 },
  { day: 'Sun', sales: 55000, transactions: 204 },
]

const TOP_PRODUCTS = [
  { name: 'Dairy Milk 250ml',   revenue: 4320, units: 24 },
  { name: 'Head & Shoulders',   revenue: 5200, units: 8 },
  { name: 'Nestle Nido 400g',   revenue: 7500, units: 6 },
  { name: 'Olpers Milk 1L',     revenue: 3960, units: 18 },
  { name: 'Surf Excel 500g',    revenue: 4080, units: 12 },
]

export function ReportsPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-display text-gray-900">Reports</h1>
        <p className="text-sm text-gray-500">Weekly analytics overview</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Weekly Sales */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={WEEKLY_SALES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip formatter={(v) => formatPKR(v as number)} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                  <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} name="Sales" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions trend */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }}>
          <Card>
            <CardHeader>
              <CardTitle>Transaction Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={WEEKLY_SALES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                  <Legend />
                  <Line type="monotone" dataKey="transactions" stroke="#10b981" strokeWidth={2} dot={false} name="Transactions" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top products */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }} className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Products by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {TOP_PRODUCTS.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 w-5 text-right">{i + 1}.</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{p.name}</span>
                        <span className="text-sm font-bold text-gray-900">{formatPKR(p.revenue)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-500"
                          style={{ width: `${(p.revenue / TOP_PRODUCTS[0].revenue) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 w-16 text-right">{p.units} units</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
