import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { formatPKR } from '../lib/format'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const MONTHLY_DATA = [
  { month: 'Aug', revenue: 820000, expenses: 610000 },
  { month: 'Sep', revenue: 940000, expenses: 680000 },
  { month: 'Oct', revenue: 870000, expenses: 640000 },
  { month: 'Nov', revenue: 1050000, expenses: 720000 },
  { month: 'Dec', revenue: 1230000, expenses: 810000 },
  { month: 'Jan', revenue: 980000, expenses: 690000 },
]

const ACCOUNTS = [
  { name: 'Cash on Hand',       balance: 82400,  type: 'asset',     delta: '+8.2%' },
  { name: 'Bank Account',       balance: 340000, type: 'asset',     delta: '+3.1%' },
  { name: 'Accounts Payable',   balance: 45000,  type: 'liability', delta: '-12.4%' },
  { name: 'Accounts Receivable',balance: 28000,  type: 'asset',     delta: '+5.7%' },
]

export function AccountingPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-display text-gray-900">Accounting</h1>
        <p className="text-sm text-gray-500">Financial overview</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Monthly Revenue', value: 980000, delta: '+4.2%', up: true },
          { label: 'Monthly Expenses', value: 690000, delta: '-2.1%', up: false },
          { label: 'Net Profit', value: 290000, delta: '+14.8%', up: true },
          { label: 'Profit Margin', value: 29.6, isPercent: true, delta: '+3.2%', up: true },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="mt-1.5 text-2xl font-bold font-display text-gray-900">
              {'isPercent' in item && item.isPercent ? `${item.value}%` : formatPKR(item.value as number)}
            </p>
            <div className={`flex items-center gap-1 mt-1.5 text-xs font-medium ${item.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {item.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {item.delta}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Revenue vs Expenses chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={MONTHLY_DATA} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={(v) => formatPKR(v as number)} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ACCOUNTS.map((acc) => (
              <div key={acc.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{acc.name}</p>
                  <p className="text-xs text-gray-400 capitalize">{acc.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{formatPKR(acc.balance)}</p>
                  <p className="text-xs text-emerald-600 flex items-center justify-end gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />{acc.delta}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
