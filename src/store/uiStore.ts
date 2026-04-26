import { create } from 'zustand'

interface UIState {
  activeCategory: string
  searchQuery: string
  sidebarCollapsed: boolean
  setCategory: (cat: string) => void
  setSearch: (q: string) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>((set) => ({
  activeCategory: 'All Products',
  searchQuery: '',
  sidebarCollapsed: false,
  setCategory: (cat) => set({ activeCategory: cat }),
  setSearch: (q) => set({ searchQuery: q }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}))
