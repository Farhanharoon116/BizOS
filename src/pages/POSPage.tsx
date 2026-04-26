import { ProductArea } from '../components/pos/ProductArea'
import { OrderPanel } from '../components/pos/OrderPanel'

export function POSPage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: product catalog */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ProductArea />
      </div>

      {/* Right: order panel */}
      <div className="w-80 xl:w-96 shrink-0 flex flex-col overflow-hidden">
        <OrderPanel />
      </div>
    </div>
  )
}
