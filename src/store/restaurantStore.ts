import { create } from 'zustand'
import type { RestaurantTable, TableStatus } from '../types'

interface RestaurantState {
  tables: RestaurantTable[]
  cycleTable: (id: string) => void
}

const STATUS_CYCLE: TableStatus[] = ['available', 'occupied', 'reserved', 'cleaning']

const INITIAL_TABLES: RestaurantTable[] = [
  { id: '1',  number: 'T-01', status: 'occupied',  timer: '45 min' },
  { id: '2',  number: 'T-02', status: 'occupied',  timer: '22 min' },
  { id: '3',  number: 'T-03', status: 'available' },
  { id: '4',  number: 'T-04', status: 'reserved',  timer: '8:00 PM' },
  { id: '5',  number: 'T-05', status: 'occupied',  timer: '68 min', isWarning: true },
  { id: '6',  number: 'T-06', status: 'available' },
  { id: '7',  number: 'T-07', status: 'occupied',  timer: '15 min' },
  { id: '8',  number: 'T-08', status: 'cleaning',  timer: '~5 min' },
  { id: '9',  number: 'T-09', status: 'occupied',  timer: '32 min' },
  { id: '10', number: 'T-10', status: 'available' },
  { id: '11', number: 'T-11', status: 'reserved',  timer: '9:00 PM' },
  { id: '12', number: 'T-12', status: 'occupied',  timer: '10 min' },
  { id: '13', number: 'T-13', status: 'available' },
  { id: '14', number: 'T-14', status: 'occupied',  timer: '55 min', isWarning: true },
]

export const useRestaurantStore = create<RestaurantState>((set) => ({
  tables: INITIAL_TABLES,
  cycleTable: (id) => set((state) => ({
    tables: state.tables.map((t) => {
      if (t.id !== id) return t
      const idx = STATUS_CYCLE.indexOf(t.status)
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length]
      return {
        ...t,
        status: next,
        timer: next === 'occupied' ? '0 min' : next === 'reserved' ? 'TBD' : undefined,
        isWarning: false,
      }
    }),
  })),
}))
