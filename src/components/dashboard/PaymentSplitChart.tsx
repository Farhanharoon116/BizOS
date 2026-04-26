import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const DATA = [
  { name: 'Cash',       value: 52, color: '#2563EB' },
  { name: 'Card',       value: 28, color: '#10b981' },
  { name: 'Easypaisa',  value: 13, color: '#f59e0b' },
  { name: 'JazzCash',   value: 7,  color: '#8b5cf6' },
]

export function PaymentSplitChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Payment Split</CardTitle>
        <p className="text-sm text-gray-500">Today's breakdown</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie data={DATA} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                {DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => [`${val}%`, '']} contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 flex-1">
            {DATA.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-semibold text-gray-800">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
