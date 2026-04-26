import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'
import { Badge } from '../ui/badge'
import { formatPKR } from '../../lib/format'

const TRANSACTIONS = [
  { id: 'R-2401', customer: 'Walk-in',       items: 3, method: 'Cash',      total: 435,  status: 'paid' as const, time: '8:42 PM' },
  { id: 'R-2400', customer: 'Ali Hassan',    items: 7, method: 'Card',      total: 1820, status: 'paid' as const, time: '8:15 PM' },
  { id: 'R-2399', customer: 'Walk-in',       items: 2, method: 'Easypaisa', total: 275,  status: 'paid' as const, time: '7:58 PM' },
  { id: 'R-2398', customer: 'Sana Mirza',    items: 5, method: 'Cash',      total: 980,  status: 'paid' as const, time: '7:44 PM' },
  { id: 'R-2397', customer: 'Walk-in',       items: 1, method: 'Cash',      total: 95,   status: 'paid' as const, time: '7:30 PM' },
  { id: 'R-2396', customer: 'Bilal Ahmed',   items: 4, method: 'JazzCash',  total: 620,  status: 'refunded' as const, time: '7:12 PM' },
]

const methodColors: Record<string, 'default' | 'success' | 'warning' | 'secondary'> = {
  Cash:      'default',
  Card:      'success',
  Easypaisa: 'warning',
  JazzCash:  'secondary',
}

export function TransactionsTable() {
  return (
    <Card className="col-span-full">
      <CardHeader className="pb-2">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receipt</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs text-gray-500">{tx.id}</TableCell>
                <TableCell className="font-medium">{tx.customer}</TableCell>
                <TableCell className="text-gray-500">{tx.items}</TableCell>
                <TableCell>
                  <Badge variant={methodColors[tx.method] ?? 'secondary'}>{tx.method}</Badge>
                </TableCell>
                <TableCell className="font-semibold">{formatPKR(tx.total)}</TableCell>
                <TableCell>
                  <Badge variant={tx.status === 'paid' ? 'success' : 'destructive'}>
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-400 text-xs">{tx.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
