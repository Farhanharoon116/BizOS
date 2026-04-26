import { useRestaurantStore } from '../store/restaurantStore'
import { ProductArea } from '../components/pos/ProductArea'
import { OrderPanel } from '../components/pos/OrderPanel'
import { Badge } from '../components/ui/badge'

export function RestaurantPOSPage() {
  const { tables } = useRestaurantStore()
  const occupied = tables.filter((t) => t.status === 'occupied')

  return (
    <div className="flex h-full">
      {/* Table selector strip */}
      <div className="w-36 border-r border-gray-100 bg-gray-50 flex flex-col">
        <div className="p-3 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Tables</p>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {occupied.map((t) => (
            <button
              key={t.id}
              className="w-full text-left px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-brand-400 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900">Table {t.number}</p>
              <Badge variant="warning" className="mt-0.5 text-[10px]">Occupied</Badge>
            </button>
          ))}
          {occupied.length === 0 && (
            <p className="text-xs text-gray-400 px-2 pt-2">No active tables</p>
          )}
        </div>
      </div>

      {/* Reuse POS layout */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <ProductArea />
        </div>
        <div className="w-80 border-l border-gray-100 overflow-auto">
          <OrderPanel />
        </div>
      </div>
    </div>
  )
}
