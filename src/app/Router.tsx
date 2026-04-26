import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './AppLayout'
import { RestaurantLayout } from './RestaurantLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { POSPage } from '../pages/POSPage'
import { InventoryPage } from '../pages/InventoryPage'
import { EmployeesPage } from '../pages/EmployeesPage'
import { CRMPage } from '../pages/CRMPage'
import { AccountingPage } from '../pages/AccountingPage'
import { ReportsPage } from '../pages/ReportsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { LoginPage } from '../pages/LoginPage'
import { SetupPage } from '../pages/SetupPage'
import { RestaurantFloorPage } from '../pages/RestaurantFloorPage'
import { RestaurantPOSPage } from '../pages/RestaurantPOSPage'

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setup" element={<SetupPage />} />

      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="pos" element={<POSPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="crm" element={<CRMPage />} />
        <Route path="accounting" element={<AccountingPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="restaurant" element={<RestaurantLayout />}>
        <Route index element={<RestaurantFloorPage />} />
        <Route path="pos" element={<RestaurantPOSPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
