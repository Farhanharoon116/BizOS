import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Sidebar } from '../components/shared/Sidebar'
import { Topbar } from '../components/shared/Topbar'

export function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  )
}
