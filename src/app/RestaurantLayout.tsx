import { Outlet, NavLink } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Zap, LayoutGrid, ShoppingCart } from 'lucide-react'

const NAV = [
  { to: '/restaurant', icon: LayoutGrid, label: 'Floor' },
  { to: '/restaurant/pos', icon: ShoppingCart, label: 'POS' },
]

export function RestaurantLayout() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#0E0900' }}>
      {/* Warm dark slim sidebar */}
      <aside
        className="w-14 flex flex-col items-center py-4 gap-4 border-r shrink-0"
        style={{ background: '#0E0900', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 shrink-0"
          style={{ background: '#EA580C' }}
        >
          <Zap className="w-4 h-4 text-white" />
        </div>

        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            title={label}
            className={({ isActive }) =>
              `w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive ? { background: 'rgba(234,88,12,0.30)' } : {}
            }
          >
            <Icon className="w-5 h-5" />
          </NavLink>
        ))}
      </aside>

      {/* Main content — no Topbar; RestaurantBanner handles the header */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  )
}
