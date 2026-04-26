import { KPIGrid } from '../components/dashboard/KPIGrid'
import { RevenueChart } from '../components/dashboard/RevenueChart'
import { PaymentSplitChart } from '../components/dashboard/PaymentSplitChart'
import { TransactionsTable } from '../components/dashboard/TransactionsTable'

export function DashboardPage() {
  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-display text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-0.5">Raza General Store — Main Branch</p>
      </div>
      <KPIGrid />
      <div className="grid grid-cols-3 gap-6">
        <RevenueChart />
        <PaymentSplitChart />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <TransactionsTable />
      </div>
    </div>
  )
}
