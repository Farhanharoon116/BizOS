import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ShoppingCart, Package, Users, UserCircle,
  BookOpen, BarChart2, Settings, ChefHat, PanelLeftClose, PanelLeft,
  Zap,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useUIStore } from '../../store/uiStore'

const NAV_ITEMS = [
  { label: 'Dashboard',  icon: LayoutDashboard, to: '/dashboard' },
  { label: 'POS',        icon: ShoppingCart,    to: '/pos' },
  { label: 'Inventory',  icon: Package,         to: '/inventory' },
  { label: 'Employees',  icon: Users,           to: '/employees' },
  { label: 'CRM',        icon: UserCircle,      to: '/crm' },
  { label: 'Accounting', icon: BookOpen,        to: '/accounting' },
  { label: 'Reports',    icon: BarChart2,       to: '/reports' },
  { label: 'Restaurant', icon: ChefHat,         to: '/restaurant' },
  { label: 'Settings',   icon: Settings,        to: '/settings' },
]

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-sidebar-bg border-r border-sidebar-border transition-all duration-200 shrink-0',
        sidebarCollapsed ? 'w-16' : 'w-56',
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-sidebar-border shrink-0', sidebarCollapsed ? 'justify-center' : 'gap-3')}>
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </div>
        {!sidebarCollapsed && (
          <span className="text-white font-display font-bold text-lg tracking-tight">BizOS</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm transition-colors',
                sidebarCollapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-sidebar-active text-brand-400 font-medium'
                  : 'text-sidebar-text hover:bg-sidebar-hover hover:text-white',
              )
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full p-2 rounded-lg text-sidebar-text hover:bg-sidebar-hover hover:text-white transition-colors"
        >
          {sidebarCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          {!sidebarCollapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
