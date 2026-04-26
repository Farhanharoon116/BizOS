import { Outlet, NavLink } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Zap, LayoutGrid, ShoppingCart } from 'lucide-react'
import { Topbar } from '../components/shared/Topbar'

export function RestaurantLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Slim sidebar */}
      <aside className="w-14 bg-sidebar-bg flex flex-col items-center py-4 gap-4 border-r border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center mb-2">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {[
          { to: '/restaurant', icon: LayoutGrid, label: 'Floor' },
          { to: '/restaurant/pos', icon: ShoppingCart, label: 'POS' },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            title={label}
            className={({ isActive }) =>
              `w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'text-sidebar-text hover:bg-sidebar-hover'
              }`
            }
          >
            <Icon className="w-5 h-5" />
          </NavLink>
        ))}
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  )
}
