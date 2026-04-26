# BizOS — GitHub Copilot Master Build Prompt
## Complete React Prototype Instructions

---

> **How to use this:** Open GitHub Copilot Chat (or Copilot Edits), paste the relevant section below, and Copilot will scaffold exactly what you need. Start with Section 1 and work through each section in order.

---

## SECTION 1 — Project Scaffold & Tech Stack

```
You are helping me build BizOS — a professional enterprise-grade Business Operating System SaaS for Pakistani businesses. It includes POS, Inventory, HR, CRM, Accounting, and a separate Restaurant mode.

Scaffold a new project with this exact tech stack:

FRAMEWORK: React 18 + Vite (TypeScript)
STYLING: Tailwind CSS v3 with a custom design system (I will provide the config)
UI COMPONENTS: shadcn/ui — install and configure it
ROUTING: React Router v6 with nested layouts
STATE MANAGEMENT: Zustand (for cart, auth, UI state)
SERVER STATE: TanStack Query v5 (for all API calls)
FORMS: React Hook Form + Zod (for all form validation)
ICONS: Lucide React (only — no emoji icons anywhere)
CHARTS: Recharts
ANIMATIONS: Framer Motion (for page transitions and micro-interactions)
FONTS: Inter (body) + Plus Jakarta Sans (headings/display) — load from Google Fonts
DATE HANDLING: date-fns
NOTIFICATIONS: sonner (toast notifications)

Commands to run:
  npm create vite@latest bizos -- --template react-ts
  cd bizos
  npm install react-router-dom zustand @tanstack/react-query react-hook-form zod @hookform/resolvers recharts framer-motion lucide-react date-fns sonner clsx tailwind-merge
  npx shadcn-ui@latest init

For shadcn/ui init, select:
  - Style: Default
  - Base color: Slate
  - CSS variables: Yes

Then install these shadcn components:
  npx shadcn-ui@latest add button input label select badge card table dialog sheet dropdown-menu avatar separator skeleton tooltip command popover

Project folder structure to create:
  src/
    app/               ← Route layouts
    components/
      ui/              ← shadcn auto-generated components
      shared/          ← Reusable app components (Sidebar, Topbar, etc.)
      dashboard/       ← Dashboard-specific components
      pos/             ← POS-specific components
      restaurant/      ← Restaurant mode components
      products/        ← Product management components
    hooks/             ← Custom React hooks
    lib/               ← Utilities, cn helper, validators
    pages/             ← Route page components
    store/             ← Zustand stores
    types/             ← TypeScript interfaces
    constants/         ← App-wide constants
    styles/            ← Global CSS + Tailwind base

Create all folders and an index.ts barrel export in each.
```

---

## SECTION 2 — Design System & Tailwind Config

```
Update tailwind.config.ts with this exact design system for BizOS:

import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          400: '#60A5FA',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        sidebar: {
          bg:     '#0D1117',
          border: 'rgba(255,255,255,0.06)',
          hover:  'rgba(255,255,255,0.05)',
          active: 'rgba(37,99,235,0.20)',
          text:   'rgba(255,255,255,0.55)',
        },
      },
      borderRadius: {
        sm:  '6px',
        md:  '8px',
        lg:  '12px',
        xl:  '16px',
        '2xl': '20px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0,0,0,0.05)',
        sm: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 20px 40px rgba(0,0,0,0.14)',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(12px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-dot':      'pulse-dot 2s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.2s ease-out',
        'fade-up':        'fade-up 0.25s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config

Also create src/lib/utils.ts:
  import { type ClassValue, clsx } from 'clsx'
  import { twMerge } from 'tailwind-merge'
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

Also add to src/index.css at the top:
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
```

---

## SECTION 3 — TypeScript Types

```
Create src/types/index.ts with all these TypeScript interfaces for BizOS:

// Auth
export interface User {
  id: string
  phone: string
  name: string
  role: 'owner' | 'manager' | 'cashier' | 'employee'
  businessId: string
  branchId?: string
  avatarInitials: string
}

// Business
export interface Business {
  id: string
  name: string
  type: 'retail' | 'restaurant' | 'pharmacy' | 'salon' | 'workshop' | 'wholesale'
  city: string
  currency: 'PKR' | 'USD'
  taxId?: string   // NTN number
  logoUrl?: string
  plan: 'starter' | 'growth' | 'enterprise'
}

// Branch
export interface Branch {
  id: string
  businessId: string
  name: string
  address: string
  managerId?: string
}

// Product
export interface Product {
  id: number
  name: string
  nameUrdu?: string
  sku: string
  category: string
  price: number
  costPrice: number
  taxRate: number        // GST percentage, default 17
  stock: number
  reorderPoint: number
  unit: string
  imageUrl?: string
  colorClass: 'c1' | 'c2' | 'c3' | 'c4'  // for placeholder color
  isActive: boolean
}

// Cart
export interface CartItem extends Product {
  qty: number
  lineTotal: number
}

// Sale
export interface Sale {
  id: string
  receiptNumber: string
  businessId: string
  branchId: string
  cashierId: string
  shiftId: string
  customerId?: string
  items: SaleItem[]
  subtotal: number
  taxAmount: number
  discount: number
  total: number
  paymentMethod: 'cash' | 'card' | 'easypaisa' | 'jazzcash' | 'credit'
  createdAt: Date
  status: 'paid' | 'pending' | 'refunded'
}

export interface SaleItem {
  productId: number
  name: string
  qty: number
  unitPrice: number
  taxRate: number
  discount: number
  total: number
}

// Employee
export interface Employee {
  id: string
  name: string
  role: string
  phone: string
  salary: number
  attendance: number   // percentage
  hireDate: string
  status: 'on-shift' | 'on-leave' | 'absent'
  avatarInitials: string
  avatarColor: string
}

// Customer (CRM)
export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  loyaltyPoints: number
  totalSpent: number
  visitCount: number
  tier: 'new' | 'regular' | 'vip'
  avatarInitials: string
}

// Restaurant
export type TableStatus = 'available' | 'occupied' | 'reserved' | 'cleaning'
export interface RestaurantTable {
  id: string
  number: string
  status: TableStatus
  timer?: string
  isWarning?: boolean
}
export interface KOT {
  id: string
  kotNumber: string
  tableRef: string
  items: KOTItem[]
  timer: string
  urgency: 'normal' | 'warning' | 'delayed'
}
export interface KOTItem {
  qty: number
  name: string
}

// KPI Dashboard
export interface KPIData {
  label: string
  value: string
  delta: string
  deltaType: 'up' | 'down' | 'neutral'
  deltaLabel: string
  color: 'blue' | 'green' | 'amber' | 'purple'
}
```

---

## SECTION 4 — Zustand Stores

```
Create these Zustand stores in src/store/:

--- FILE: src/store/cartStore.ts ---
import { create } from 'zustand'
import type { CartItem, Product } from '../types'

interface CartState {
  items: Record<number, CartItem>
  customerId: string | null
  customerName: string | null
  paymentMethod: 'cash' | 'card' | 'easypaisa' | 'jazzcash'
  addItem: (product: Product) => void
  removeItem: (id: number) => void
  clearCart: () => void
  setCustomer: (id: string, name: string) => void
  clearCustomer: () => void
  setPaymentMethod: (method: CartState['paymentMethod']) => void
  get subtotal(): number
  get tax(): number
  get discount(): number
  get total(): number
}

Create the store implementing all methods. Calculate subtotal as sum of (price * qty) for all items. Tax is subtotal * 0.17. Discount is 5% of subtotal only when customerId is set. Total is subtotal + tax - discount.

--- FILE: src/store/uiStore.ts ---
import { create } from 'zustand'

interface UIState {
  activeCategory: string
  searchQuery: string
  sidebarCollapsed: boolean
  setCategory: (cat: string) => void
  setSearch: (q: string) => void
  toggleSidebar: () => void
}

Create this store with all methods.

--- FILE: src/store/restaurantStore.ts ---
import { create } from 'zustand'
import type { RestaurantTable, TableStatus } from '../types'

interface RestaurantState {
  tables: RestaurantTable[]
  cycleTable: (id: string) => void
}

Initialize with 14 tables (T-01 through T-14) with mixed statuses. cycleTable cycles: available → occupied → reserved → cleaning → available. Export the store.
```

---

## SECTION 5 — App Layout & Routing

```
Create the routing and layout system for BizOS in src/app/:

--- FILE: src/app/Router.tsx ---
Use React Router v6 createBrowserRouter. Define these routes:

/ → redirect to /login
/login → LoginPage (no layout)
/setup → SetupPage (no layout, only shown on first login)
/dashboard → AppLayout (protected) → DashboardPage
/dashboard/pos → AppLayout → POSPage
/dashboard/inventory → AppLayout → InventoryPage
/dashboard/employees → AppLayout → EmployeesPage
/dashboard/crm → AppLayout → CRMPage
/dashboard/accounting → AppLayout → AccountingPage
/dashboard/reports → AppLayout → ReportsPage
/dashboard/settings → AppLayout → SettingsPage
/restaurant → RestaurantLayout → RestaurantFloorPage
/restaurant/pos → RestaurantLayout → RestaurantPOSPage

--- FILE: src/app/AppLayout.tsx ---
Create a layout component with:
  - A persistent Sidebar (240px wide, collapsible to 64px with icon-only mode)
  - A Topbar (56px height)
  - A main content area with overflow-y-auto
  - Wrap the content in a Framer Motion AnimatePresence with a simple fade-up transition between pages (use key={location.pathname})
  - The layout background is bg-slate-100

--- FILE: src/app/RestaurantLayout.tsx ---
Same as AppLayout but the sidebar uses a warm dark brown color scheme (bg-[#0E0900]) instead of the standard dark sidebar, and includes restaurant-specific nav items.
```

---

## SECTION 6 — Sidebar Component

```
Create src/components/shared/Sidebar.tsx — this is the most important component, make it pixel-perfect:

DESIGN REQUIREMENTS:
- Background: bg-[#0D1117] (very dark, near black)
- Width: 240px expanded, 64px collapsed
- Top section: Logo row + Business card
- Body: Scrollable nav links grouped by section labels
- Bottom: User profile row
- Right border: 1px solid rgba(255,255,255,0.06)
- Active link: bg-[rgba(37,99,235,0.20)] text-white, with a 2.5px left border-brand-400 indicator
- Inactive link: text-white/55, hover bg-[rgba(255,255,255,0.05)] text-white/85
- All icons: Lucide React, 16px, color inherited from text
- Active icon: text-brand-400

NAV STRUCTURE (implement exactly):
Section "Overview":
  - LayoutDashboard icon → "Dashboard" → /dashboard
  - ShoppingCart icon → "Point of Sale" → /dashboard/pos
  - Package icon → "Inventory" → /dashboard/inventory (badge: amber, shows low stock count)

Section "People":
  - Users icon → "Employees" → /dashboard/employees (badge: red, shows pending actions)
  - UserCircle icon → "CRM" → /dashboard/crm
  - Calendar icon → "Shifts" → /dashboard/shifts

Section "Finance":
  - DollarSign icon → "Accounting" → /dashboard/accounting
  - BarChart3 icon → "Reports" → /dashboard/reports
  - Truck icon → "Procurement" → /dashboard/procurement

Section "System":
  - Settings icon → "Settings" → /dashboard/settings
  - QrCode icon → "QR Access" → /dashboard/qr

BUSINESS CARD (top, below logo):
  - bg-white/5, border border-white/5, rounded-lg, padding 10px 12px
  - Shows business name (font-semibold text-white text-[12.5px])
  - Shows "Main Branch · Karachi" with a green status dot (6px circle)
  - Clicking it opens a branch switcher dropdown (use shadcn Popover)

USER FOOTER:
  - Shows avatar (gradient circle with initials), name, role
  - Clicking opens a dropdown: Profile, Switch Business, Sign Out

Use useLocation from react-router-dom to determine active link. Use Framer Motion for smooth expand/collapse transition of the sidebar width.
```

---

## SECTION 7 — Topbar Component

```
Create src/components/shared/Topbar.tsx:

Props: { title: string, actions?: React.ReactNode }

DESIGN:
- Height: 56px
- Background: white
- Bottom border: 1px solid border-slate-200
- Left: Page title in Plus Jakarta Sans, font-bold, text-[15px], text-slate-900
- Center: Search bar (flex-shrink-0, w-[260px])
  - bg-slate-50, border border-slate-200, rounded-lg, padding 7px 12px
  - Search icon (Lucide Search, 14px, text-slate-400) on the left
  - input with placeholder "Search transactions, products, staff…"
  - On focus: border-brand-400 + ring-3 ring-brand-500/10
- Right: Icon buttons then optional actions slot
  - Bell button with red notification dot (Lucide Bell icon)
  - Settings button (Lucide Settings icon)
  - Both: w-[34px] h-[34px], rounded-lg, border border-slate-200, bg-white

When actions prop is passed (like an "Add Product" button), render it after the icon buttons.
```

---

## SECTION 8 — Dashboard Page

```
Create src/pages/DashboardPage.tsx — the main dashboard:

Import and use these sub-components you will also create:

1. KPIGrid — src/components/dashboard/KPIGrid.tsx
   - 4-column grid of KPI cards
   - Each card: white bg, border border-slate-200, rounded-xl, shadow-sm
   - A 2.5px top border in the card's color (blue/green/amber/purple)
   - Label: uppercase, text-[11px], font-semibold, text-slate-500
   - Icon: 34px square, rounded-md, colored background matching the top border
   - Value: font-display, text-[24px], font-bold, text-slate-900
   - Delta row: colored up/down arrow + percentage + "vs yesterday" in slate-400

   Use this static data:
     { label: "Today's Revenue", value: "Rs 42,850", delta: "↑ 12.4%", deltaType: "up", deltaLabel: "vs yesterday", color: "blue" }
     { label: "Transactions", value: "87", delta: "↑ 5", deltaType: "up", deltaLabel: "more than yesterday", color: "green" }
     { label: "Low Stock Items", value: "6", delta: "Needs restock", deltaType: "down", deltaLabel: "", color: "amber" }
     { label: "Staff On Shift", value: "5 / 8", delta: "", deltaType: "neutral", deltaLabel: "Active right now", color: "purple" }

2. RevenueChart — src/components/dashboard/RevenueChart.tsx
   - Uses Recharts BarChart, responsive, height 180
   - Bars: fill brand-100 normally, fill brand-500 for the highest (Saturday)
   - Custom tooltip: dark bg-slate-900, white text, shows "Rs X,XXX · Day"
   - Data: Mon 6400, Tue 7200, Wed 5100, Thu 8800, Fri 7050, Sat 9200, Sun 4100 (all in PKR)
   - X-axis: 3-letter day names, no y-axis line, no grid lines
   - Top right: a "7 days" period selector button

3. PaymentSplitChart — src/components/dashboard/PaymentSplitChart.tsx
   - Recharts PieChart (donut), inner radius 55, outer radius 75, height 130
   - Cash 60% brand-500, Easypaisa 25% green-500, JazzCash 15% amber-500
   - Custom legend list next to the chart: dot + name + percentage
   - Center label: "60%" + "Cash" in two lines (use a custom label)

4. TransactionsTable — src/components/dashboard/TransactionsTable.tsx
   - Uses shadcn Table component
   - Columns: Receipt #, Customer (with sub-line for tier), Items, Amount, Payment, Cashier, Time, Status
   - Status badges: "Paid" = green, "Pending" = amber, "Refunded" = red
   - Receipt numbers are bold, amounts are bold
   - Hover row: bg-blue-50/30
   - Header: "Recent Transactions" + count badge + "View all →" link button
   - 5 rows of static data from the BizOS context (INV-00892 through INV-00888)

Layout of DashboardPage:
  <Topbar title="Dashboard" />
  <div className="p-6 space-y-5">
    <KPIGrid />
    <div className="grid grid-cols-[1fr_300px] gap-4">
      <RevenueChart />
      <PaymentSplitChart />
    </div>
    <TransactionsTable />
  </div>
```

---

## SECTION 9 — POS Screen

```
Create src/pages/POSPage.tsx — the Point of Sale screen. This is the most critical screen.

Layout: Two-column — left products area, right order panel. No page padding, full height.

--- LEFT SIDE: ProductArea ---
Create src/components/pos/ProductArea.tsx:
  Background: bg-slate-100
  Padding: 16px, gap 12px between elements, overflow-y-auto, flex-1

  1. SearchBar:
     - White bg, border, rounded-xl, shadow-xs
     - Search icon + input "Search by name, SKU, or scan barcode…"
     - Right side: "Scan" button — bg-brand-50, text-brand-600, border border-brand-100, rounded-md, with QrCode icon from Lucide

  2. CategoryPills (horizontal scroll, hide scrollbar):
     - Pills: "All Products", "Beverages", "Dairy", "Snacks", "Household", "Personal Care", "Grocery"
     - Inactive: white bg, border-slate-200, text-slate-500, rounded-full
     - Active: bg-brand-500, text-white, border-brand-500
     - Smooth color transition on click

  3. ProductGrid (grid, 4 columns, gap 9px):
     Read from cartStore and uiStore (filtered by category + search).
     Each ProductCard:
       - White bg, border-1.5 border-slate-200, rounded-xl, padding 11px
       - Hover: border-brand-400, shadow-md, translateY(-1px) — use Framer Motion whileHover
       - Sold-out state: opacity-50, cursor-not-allowed
       - Product image area: aspect-square, rounded-lg, colored bg (c1=brand-50, c2=green-50, c3=amber-50, c4=purple-50), contains a Package icon from Lucide
       - Product name: 12.5px, font-semibold
       - SKU: 10px, monospace, text-slate-400
       - Bottom row: price (font-display, text-brand-600, bold) + stock count (low = amber, out = red)
       - On hover: show a "+" circle button (absolute top-right, bg-brand-500, white) — Framer Motion opacity transition
       - On click: call cartStore.addItem(product)

Use this product data (12 products):
  Dairy Milk 250ml, SKU: DML-250-NTL, cat: Dairy, price: 180, stock: 24
  Head & Shoulders 400ml, SKU: HS-400-PNG, cat: Personal Care, price: 650, stock: 8
  Peek Freans Sooper, SKU: PFS-PKT-EBM, cat: Snacks, price: 95, stock: 48
  Nestle Nido 400g, SKU: NND-400-NTL, cat: Dairy, price: 1250, stock: 4
  Safeguard Soap 120g, SKU: SGS-120-PNG, cat: Personal Care, price: 85, stock: 0
  Nescafe 3in1 Sachet, SKU: NCF-3IN1-NTL, cat: Beverages, price: 45, stock: 60
  Sunsilk Shampoo 200ml, SKU: SSL-200-UNL, cat: Personal Care, price: 280, stock: 15
  Lipton Yellow Label, SKU: LPT-YL-UNL, cat: Beverages, price: 420, stock: 22
  LU Prince Biscuits, SKU: LU-PRN-LU, cat: Snacks, price: 55, stock: 36
  Olpers Milk 1L, SKU: OLP-1L-EFL, cat: Dairy, price: 220, stock: 18
  Surf Excel 500g, SKU: SFX-500-UNL, cat: Household, price: 340, stock: 12
  Tapal Danedar 500g, SKU: TPL-DN-TPL, cat: Beverages, price: 380, stock: 9

--- RIGHT SIDE: OrderPanel ---
Create src/components/pos/OrderPanel.tsx (w-[310px] flex-shrink-0):
  Background: white, left border slate-200

  1. Header row: "Current Order" title + Hold button (Pause icon) + Clear button (Trash2 icon, red on hover)

  2. Customer row:
     - If no customer: dashed border row "Add customer (optional)" with UserPlus icon, click to add
     - If customer added: green-50 bg row with avatar, name "Ali Hassan", "1,240 loyalty pts · 5% discount", X button to remove
     - Toggle between these two states on click

  3. Cart items list (flex-1, overflow-y-auto):
     - Empty state: Package icon centered, "Cart is empty. Click a product or scan a barcode to start."
     - Each item: bg-slate-50, rounded-lg, border border-slate-100
       - Icon area (brand-50 bg, Package icon)
       - Name + "Rs X × qty"
       - Qty controls: minus button, qty number, plus button (all circular, border, hover brand color)
     - Use Framer Motion AnimatePresence for smooth add/remove animations (layout transition)

  4. Summary section (border-top, padding 12px 14px):
     - Subtotal row, GST (17%) row, Discount row (green when > 0)
     - Dashed separator
     - Total row: font-display, 17px, bold
     - Payment method grid (4 buttons: Cash/Card/Easypaisa/JazzCash)
       Each button: icon + label, border, active = border-brand-500 bg-brand-50 text-brand-600
     - Charge button: full width, gradient bg-gradient-to-br from-brand-500 to-indigo-600, rounded-xl, 13px, font-bold, shadow, hover opacity + translateY, shows "Charge Rs X,XXX"
     - On charge: if cart empty do nothing; else show success state (green bg, checkmark icon, "Rs X — Paid!") for 2.2s, then reset

  Connect everything to cartStore using useCartStore() hook.
```

---

## SECTION 10 — Add Product Modal

```
Create src/components/products/AddProductModal.tsx using shadcn Dialog:

Trigger: "Add Product" button in the Topbar actions slot on Inventory page, and also available from POS.

Dialog size: max-w-[580px], no close on outside click during form editing.

Use React Hook Form + Zod for all validation. Schema:
  name_en: string, min 2 chars, required
  name_ur: string, optional
  category: enum of categories, required
  unit: enum, required
  sku: string, min 5 chars, required
  cost_price: number, positive, required
  sell_price: number, positive, must be >= cost_price
  opening_stock: number, min 0
  low_stock_alert: number, min 1
  reorder_qty: number, min 1
  gst_rate: enum ['0', '5', '17'], default '17'
  shelf_location: string, optional

SECTIONS inside the Dialog:

1. Product Image section:
   Upload zone: dashed border-2, rounded-xl, centered content, Image icon (Lucide, brand color), "Click or drag & drop", "PNG/JPG up to 5MB". On hover: border-brand-400 bg-brand-50 transition.

2. Basic Information section:
   - English name + Urdu name (side by side, Urdu input has text-right dir=rtl)
   - Category dropdown (shadcn Select) + Unit dropdown

3. SKU & Barcode section:
   - SKU input (font-mono) + Auto-Generate button + Barcode scan button
   - Auto-Generate logic: take first 4 chars of category code + first 4 chars of product name (uppercase, alphanumeric only) + 4 random chars = "DAIRY-DML-X4K2" format
   - After generation: animate the input with a green border flash (CSS transition), show a green badge "DAIRY-DML-X4K2 — generated ✓"
   - Help text: "Auto-generate creates a unique code from name + category."

4. Pricing section:
   - Cost Price + Selling Price (side by side)
   - Live margin calculator: as user types both prices, show animated box below:
     Green if margin > 0: "Margin: 22.2% · Profit per unit: Rs 140"
     Red if sell < cost: "Warning: Selling below cost price!"
   - GST Rate dropdown

5. Inventory section:
   - Opening Stock + Low Stock Alert (side by side)
   - Reorder Qty + Shelf Location (side by side)

Footer: Cancel (ghost) + Save Product (brand blue, with checkmark icon)
On save: validate form → show loading spinner on button for 800ms → show success state → close dialog → show sonner toast "Product saved successfully"
```

---

## SECTION 11 — Restaurant Mode

```
Create the complete Restaurant dashboard at src/pages/RestaurantFloorPage.tsx.

This uses a SEPARATE layout (RestaurantLayout.tsx) with a warm dark sidebar (bg-[#0E0900]) and orange accent color instead of blue.

The page has 3 sections stacked vertically inside a flex layout:

1. RestaurantBanner (top bar, gradient from #7C2D12 to #C2410C):
   - Left: "Floor Plan — Spice Garden" title + "Thursday, 26 April · 7:30 PM" subtitle
   - Right: 3 status pills (Available: N, Occupied: N, Reserved: N — dynamically counted from table data)
   - "New Reservation" button (white/15 bg)
   - All text white

2. Main body: flex row with FloorArea (flex-1) and KitchenPanel (w-[290px])

--- FloorArea ---
  Top: 4 KPI cards in a row (Revenue, Covers, Active KOTs, Delayed) — use Recharts or plain divs
  Below: "Ground Floor — 14 Tables · Click to cycle status" label
  Table grid (5 columns):
    Each TableTile: white bg, rounded-xl, padding 12px 8px, text-center, cursor-pointer
    Top colored bar (2.5px): green=available, red=occupied, amber=reserved, gray=cleaning
    Colored top border: green-200=available, red-200=occupied, amber-200=reserved, slate-200=cleaning
    Slightly tinted background for occupied and reserved
    Center: icon circle (colored bg) with matching Lucide icon, table number, status text, timer
    On hover: translateY(-2px) shadow-md — use Framer Motion whileHover
    On click: cycle status (available → occupied → reserved → cleaning → available)
      also update timer text accordingly
    Use Framer Motion AnimatePresence to animate status change with a short scale pop

  Icons to use by status:
    available: Monitor icon (or Table — use LayoutGrid)
    occupied: Users icon
    reserved: CalendarCheck icon
    cleaning: Trash2 icon

  Initial table data (14 tables):
    T-01 occupied 45min, T-02 occupied 22min, T-03 available
    T-04 reserved 8:00PM, T-05 occupied 68min (isWarning=true), T-06 available
    T-07 occupied 15min, T-08 cleaning ~5min, T-09 occupied 32min
    T-10 available, T-11 reserved 9:00PM, T-12 occupied 10min
    T-13 available, T-14 occupied 55min (isWarning=true)
    Warning tables show amber timer text

--- KitchenPanel ---
  Background: bg-[#12100E] (very dark warm)
  Header: "Kitchen Display" + orange count badge
  Scrollable list of KOT cards:
    Each KOT: bg-white/4, border border-white/6, rounded-xl, left border 3px colored
      normal = green left border, warning = amber, delayed = red
    Inside: KOT number (muted), timer (colored), table name (white bold, large), item list (muted), action buttons
    "Mark Ready" button: bg-green-500, white text, full width
    "Void" button: transparent, muted text, border — red on hover
    On "Mark Ready" click: animate card sliding out to the right (Framer Motion x: 30, opacity: 0) then remove from DOM
    4 initial KOTs: #247 Table-01 ok, #248 Table-05 delayed, #249 Table-02 warning, #250 Takeaway ok

Connect FloorArea to restaurantStore (Zustand).
```

---

## SECTION 12 — Login & Onboarding

```
Create src/pages/LoginPage.tsx:

Full-screen dark background with radial gradients:
  background: radial-gradient(ellipse 800px 600px at 30% 60%, rgba(37,99,235,0.14), transparent 70%),
              radial-gradient(ellipse 500px 400px at 80% 20%, rgba(124,58,237,0.09), transparent 70%),
              #080E1A

Subtle grid overlay (CSS background-image with 48px grid lines at 2.5% opacity).

Two-column layout (flex, gap-20, centered):

LEFT: Brand + Features
  - Logo (gradient mark + "BizOS" in Plus Jakarta Sans)
  - Headline: "The complete operating system for your business."
  - Subtext about Pakistan-first features
  - Feature list (5 items with Lucide CheckCircle2 icon in brand-400):
    FBR & GST compliant invoicing
    Works fully offline — power cuts, no problem
    WhatsApp receipts sent instantly
    Easypaisa & JazzCash built in
    Separate dashboards for restaurants

RIGHT: Login Card (glassmorphism — bg-white/[0.055], backdrop-blur-xl, border border-white/[0.09], rounded-2xl, w-[390px])
  - Title "Welcome back" (Plus Jakarta Sans, white)
  - Tabs: "Phone (OTP)" | "Email" — pill tabs, active = brand-500

  Phone OTP Flow:
    - Phone input (dark glass style)
    - OTP: 6 separate input boxes (auto-advance on fill, auto-backspace on delete)
      filled boxes = brand-500 border, current = brand-400 + ring, empty = white/10 bg
    - "Resend in Xs" countdown hint
    - "Verify & Sign In" button (gradient brand-500 to indigo-600)

  QR Login tile below divider:
    - Shows a decorative QR SVG
    - "Scan with BizOS Mobile App · Instant login — no OTP required"

  On successful login: navigate to /setup if first login, else /dashboard

---

Create src/pages/SetupPage.tsx (Onboarding Wizard):

Left panel (270px dark): logo + 5-step progress list
  Step states: done (green checkmark), current (brand-500 + glow ring), pending (white/7 bg)
  Connecting line between steps

Right panel (flex-1): current step content
  Progress bar (3px, gradient, animated width)
  Step 2 content (Business Info):
    - Business name + Owner name inputs (2-col grid)
    - "Select Business Type" — 3×2 grid of type cards
      Each: border-1.5, rounded-xl, centered icon in rounded-xl bg, name, description
      Selected: border-brand-500, bg-brand-50, checkmark badge top-right
      Types with Lucide icons: Retail (ShoppingBag), Restaurant (UtensilsCrossed), Pharmacy (Pill), Salon (Scissors), Workshop (Wrench), Wholesale (Package2)
    - City dropdown + Currency dropdown
  Footer: "Step 2 of 5" + Back button + Continue button
```

---

## SECTION 13 — Polish, Animations & Final Details

```
Add these finishing touches to the BizOS prototype:

1. PAGE TRANSITIONS:
   In AppLayout, wrap the <Outlet/> with Framer Motion AnimatePresence + motion.div:
     initial: { opacity: 0, y: 8 }
     animate: { opacity: 1, y: 0 }
     exit:    { opacity: 0, y: -4 }
     transition: { duration: 0.2, ease: 'easeOut' }
   Use key={location.pathname}

2. TOAST NOTIFICATIONS via sonner:
   Add <Toaster richColors position="bottom-right" /> in main App
   Use toast.success(), toast.error() for all user actions

3. LOADING STATES:
   Use Skeleton components (shadcn) for all data-loading states
   Wrap async content in Suspense boundaries

4. EMPTY STATES:
   POS cart empty: Package icon (40px, slate-300) + "Cart is empty" + hint text
   Products no-results: SearchX icon + "No products found for '{query}'" + "Clear search"

5. RESPONSIVE TOPBAR:
   On narrower screens (<1100px): collapse search bar to an icon button that expands it

6. SIDEBAR ACTIVE STATE:
   Use NavLink from react-router-dom — pass className as function to get isActive
   Apply active styles only when the pathname exactly matches (use end prop for dashboard)

7. NUMBER FORMATTING:
   Create src/lib/format.ts with:
     formatPKR(amount: number): string — "Rs 42,850" (always use toLocaleString with Pakistani format)
     formatPercent(n: number): string
     formatDate(d: Date): string — "26 Apr 2026, 2:34 PM"

8. CUSTOM HOOKS:
   src/hooks/useCartTotal.ts — returns { subtotal, tax, discount, total } from cartStore
   src/hooks/useProductFilter.ts — returns filtered products given category + search query

9. ACCESSIBILITY:
   All buttons have aria-label
   All form inputs have htmlFor/id pairs
   Keyboard navigation works (Tab, Enter, Escape for modals)
   Focus rings visible (use focus-visible:ring-2 focus-visible:ring-brand-500)

10. SMALL DETAILS THAT MATTER:
    - Pulse animation on the "Shift Open" green dot in POS topbar
    - Table tiles in restaurant mode have a subtle scale pop on status change (Framer Motion layout)
    - KOT "Mark Ready" slides out to the right with opacity 0 (AnimatePresence + motion.div)
    - Auto-generate SKU button has a lightning bolt icon and flashes green border on the input
    - Margin calculator box in Add Product animates in with fade-up
    - The charge button turns green with a checkmark for 2.2 seconds after successful payment
    - Bar chart bars have a hover tooltip showing "Rs X,XXX · Day"
    - All modals use shadcn Dialog with proper focus trapping
```

---

## QUICK START ORDER

Copy and paste sections **in this order** into GitHub Copilot Chat:

1. Section 1 → scaffold the project
2. Section 2 → configure Tailwind
3. Section 3 → create all types
4. Section 4 → create Zustand stores
5. Section 5 → set up routing and layouts
6. Section 6 → build the Sidebar
7. Section 7 → build the Topbar
8. Section 8 → build the Dashboard
9. Section 9 → build the POS screen (most complex — take your time here)
10. Section 10 → build the Add Product modal
11. Section 11 → build the Restaurant mode
12. Section 12 → build Login and Onboarding
13. Section 13 → add all polish and animations

---

## IMPORTANT NOTES FOR COPILOT

- **Never use emoji as icons.** Always use Lucide React icons.
- **Always use TypeScript.** No `any` types — use the interfaces from Section 3.
- **Always use Tailwind classes.** No inline styles unless absolutely necessary for dynamic values.
- **Use `cn()` from lib/utils** for all conditional class merging.
- **Use shadcn components** as the base for all dialogs, selects, tables, and buttons.
- **Connect POS cart to Zustand** — cartStore is the single source of truth for the cart.
- **Framer Motion** should be used for: page transitions, product card hover, modal entrance, cart item add/remove, table tile status change, KOT dismissal.
- **All PKR amounts** must be formatted with `formatPKR()` — never raw numbers in the UI.
- The design system accent is `brand-500 = #2563EB`. Do not use blue-500 from Tailwind defaults — always use `brand-500`.
- The sidebar is always `bg-[#0D1117]` — this is a custom hex, not a Tailwind preset.

---

*BizOS — Built for Pakistan · v1.0 Prototype*
