import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const DATA = [
  { hour: '9am',  revenue: 3200 },
  { hour: '10am', revenue: 5800 },
  { hour: '11am', revenue: 4200 },
  { hour: '12pm', revenue: 7600 },
  { hour: '1pm',  revenue: 6400 },
  { hour: '2pm',  revenue: 5100 },
  { hour: '3pm',  revenue: 4800 },
  { hour: '4pm',  revenue: 6200 },
  { hour: '5pm',  revenue: 8900 },
  { hour: '6pm',  revenue: 7300 },
  { hour: '7pm',  revenue: 9800 },
  { hour: '8pm',  revenue: 6100 },
]

function formatY(value: number) {
  return `Rs ${(value / 1000).toFixed(0)}k`
}

export function RevenueChart() {
  return (
    <Card className="col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Revenue Today</CardTitle>
        <p className="text-sm text-gray-500">Hourly breakdown</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={DATA} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatY} tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={50} />
            <Tooltip
              formatter={(val) => [`Rs ${Number(val).toLocaleString()}`, 'Revenue']}
              contentStyle={{ border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
