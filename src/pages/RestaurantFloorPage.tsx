import { FloorArea } from '../components/restaurant/FloorArea'
import { KitchenPanel } from '../components/restaurant/KitchenPanel'

export function RestaurantFloorPage() {
  return (
    <div className="flex h-full gap-0">
      <div className="flex-1 overflow-auto">
        <FloorArea />
      </div>
      <div className="w-80 border-l border-gray-100 overflow-auto bg-white">
        <KitchenPanel />
      </div>
    </div>
  )
}
