import { Bell, Search, ChevronDown } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel,
} from '../ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'

const MOCK_USER = {
  name: 'Ahmed Raza',
  role: 'Owner',
  initials: 'AR',
  business: 'Raza General Store',
}

export function Topbar() {
  const navigate = useNavigate()

  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center px-6 gap-4 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything…"
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 animate-pulse-dot" />
        </button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-brand-100 text-brand-600 text-xs font-semibold">
                  {MOCK_USER.initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900 leading-none">{MOCK_USER.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{MOCK_USER.business}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{MOCK_USER.role}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => navigate('/login')}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
