import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Clock, Calendar } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { formatPKR } from '../lib/format'
import { useEmployeeStore } from '../store/employeeStore'
import { AddEmployeeModal } from '../components/employees/AddEmployeeModal'
import type { Employee } from '../types'

const statusVariant: Record<Employee['status'], 'success' | 'warning' | 'destructive'> = {
  'on-shift': 'success',
  'on-leave': 'warning',
  'absent':   'destructive',
}

export function EmployeesPage() {
  const employees = useEmployeeStore((s) => s.employees)
  const setStatus = useEmployeeStore((s) => s.setStatus)
  const [addOpen, setAddOpen] = useState(false)

  return (
    <div className="p-6 space-y-5 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-display text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">{employees.length} staff members</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setAddOpen(true)}>
          <UserPlus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {employees.map((emp, i) => (
          <motion.div
            key={emp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i, 5) * 0.06 }}
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
              {/* Status dropdown */}
              <select
                value={emp.status}
                onChange={(e) => setStatus(emp.id, e.target.value as Employee['status'])}
                className="text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-500 bg-white"
              >
                <option value="on-shift">On Shift</option>
                <option value="on-leave">On Leave</option>
                <option value="absent">Absent</option>
              </select>
            </div>

            <div className="mb-3">
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

      <AddEmployeeModal open={addOpen} onOpenChange={setAddOpen} />
    </div>
  )
}
