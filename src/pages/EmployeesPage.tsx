import { motion } from 'framer-motion'
import { UserPlus, Clock, Calendar } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { formatPKR } from '../lib/format'
import type { Employee } from '../types'

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Usman Tariq',    role: 'Cashier',       phone: '0301-1234567', salary: 25000, attendance: 96, hireDate: '2022-01-15', status: 'on-shift',  avatarInitials: 'UT', avatarColor: 'bg-blue-100 text-blue-700' },
  { id: '2', name: 'Fatima Noor',    role: 'Floor Manager', phone: '0321-9876543', salary: 38000, attendance: 98, hireDate: '2021-06-01', status: 'on-shift',  avatarInitials: 'FN', avatarColor: 'bg-emerald-100 text-emerald-700' },
  { id: '3', name: 'Hassan Zafar',   role: 'Stockkeeper',   phone: '0332-5551234', salary: 22000, attendance: 88, hireDate: '2023-03-12', status: 'on-leave',  avatarInitials: 'HZ', avatarColor: 'bg-amber-100 text-amber-700' },
  { id: '4', name: 'Sara Baig',      role: 'Cashier',       phone: '0345-7778889', salary: 24000, attendance: 92, hireDate: '2022-09-20', status: 'on-shift',  avatarInitials: 'SB', avatarColor: 'bg-purple-100 text-purple-700' },
  { id: '5', name: 'Kamran Shah',    role: 'Guard',         phone: '0311-4443333', salary: 20000, attendance: 100, hireDate: '2020-11-05', status: 'on-shift', avatarInitials: 'KS', avatarColor: 'bg-pink-100 text-pink-700' },
  { id: '6', name: 'Nimra Khalid',   role: 'Cashier',       phone: '0322-8887776', salary: 24500, attendance: 85, hireDate: '2023-07-01', status: 'absent',    avatarInitials: 'NK', avatarColor: 'bg-teal-100 text-teal-700' },
]

const statusVariant: Record<Employee['status'], 'success' | 'warning' | 'destructive'> = {
  'on-shift': 'success',
  'on-leave': 'warning',
  'absent':   'destructive',
}

export function EmployeesPage() {
  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">{EMPLOYEES.length} staff members</p>
        </div>
        <Button size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {EMPLOYEES.map((emp, i) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <Avatar className="h-11 w-11">
                <AvatarFallback className={emp.avatarColor + ' text-sm font-semibold'}>{emp.avatarInitials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.role}</p>
                <p className="text-xs text-gray-400">{emp.phone}</p>
              </div>
              <Badge variant={statusVariant[emp.status]}>{emp.status.replace('-', ' ')}</Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><Clock className="w-3 h-3" />Attendance</p>
                <p className="font-bold text-gray-900 mt-0.5">{emp.attendance}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Salary</p>
                <p className="font-bold text-gray-900 mt-0.5 text-sm">{formatPKR(emp.salary)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1"><Calendar className="w-3 h-3" />Hire Date</p>
                <p className="font-bold text-gray-900 mt-0.5 text-xs">{emp.hireDate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
