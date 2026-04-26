import { FloorArea } from '../components/restaurant/FloorArea'
import { KitchenPanel } from '../components/restaurant/KitchenPanel'
import { RestaurantBanner } from '../components/restaurant/RestaurantBanner'

export function RestaurantFloorPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* 1. Top banner */}
      <RestaurantBanner />

      {/* 2. Main body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Floor plan area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <FloorArea />
        </div>

        {/* Kitchen panel */}
        <KitchenPanel />
      </div>
    </div>
  )
}
