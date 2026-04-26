import { create } from 'zustand'
import type { Employee } from '../types'

const INITIAL: Employee[] = [
  { id: '1', name: 'Usman Tariq',  role: 'Cashier',       phone: '0301-1234567', salary: 25000, attendance: 96,  hireDate: '2022-01-15', status: 'on-shift',  avatarInitials: 'UT', avatarColor: 'bg-blue-100 text-blue-700' },
  { id: '2', name: 'Fatima Noor',  role: 'Floor Manager', phone: '0321-9876543', salary: 38000, attendance: 98,  hireDate: '2021-06-01', status: 'on-shift',  avatarInitials: 'FN', avatarColor: 'bg-emerald-100 text-emerald-700' },
  { id: '3', name: 'Hassan Zafar', role: 'Stockkeeper',   phone: '0332-5551234', salary: 22000, attendance: 88,  hireDate: '2023-03-12', status: 'on-leave',  avatarInitials: 'HZ', avatarColor: 'bg-amber-100 text-amber-700' },
  { id: '4', name: 'Sara Baig',    role: 'Cashier',       phone: '0345-7778889', salary: 24000, attendance: 92,  hireDate: '2022-09-20', status: 'on-shift',  avatarInitials: 'SB', avatarColor: 'bg-purple-100 text-purple-700' },
  { id: '5', name: 'Kamran Shah',  role: 'Guard',         phone: '0311-4443333', salary: 20000, attendance: 100, hireDate: '2020-11-05', status: 'on-shift',  avatarInitials: 'KS', avatarColor: 'bg-pink-100 text-pink-700' },
  { id: '6', name: 'Nimra Khalid', role: 'Cashier',       phone: '0322-8887776', salary: 24500, attendance: 85,  hireDate: '2023-07-01', status: 'absent',    avatarInitials: 'NK', avatarColor: 'bg-teal-100 text-teal-700' },
]

const COLORS = [
  'bg-blue-100 text-blue-700', 'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700', 'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700', 'bg-teal-100 text-teal-700',
  'bg-red-100 text-red-700', 'bg-indigo-100 text-indigo-700',
]

let nextId = INITIAL.length + 1
let colorIdx = INITIAL.length

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

interface EmployeeState {
  employees: Employee[]
  addEmployee: (e: Omit<Employee, 'id' | 'avatarInitials' | 'avatarColor' | 'attendance'>) => void
  updateEmployee: (id: string, updates: Partial<Employee>) => void
  setStatus: (id: string, status: Employee['status']) => void
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: INITIAL,

  addEmployee: (e) =>
    set((state) => {
      const color = COLORS[colorIdx++ % COLORS.length]
      return {
        employees: [
          ...state.employees,
          { ...e, id: String(nextId++), avatarInitials: initials(e.name), avatarColor: color, attendance: 100 },
        ],
      }
    }),

  updateEmployee: (id, updates) =>
    set((state) => ({
      employees: state.employees.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),

  setStatus: (id, status) =>
    set((state) => ({
      employees: state.employees.map((e) => (e.id === id ? { ...e, status } : e)),
    })),
}))
