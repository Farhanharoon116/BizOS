import { CalendarPlus } from 'lucide-react'
import { useRestaurantStore } from '../../store/restaurantStore'
import { toast } from 'sonner'

function formatBannerDate(): string {
  const now = new Date()
  return now.toLocaleString('en-PK', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function RestaurantBanner() {
  const tables = useRestaurantStore((s) => s.tables)

  const available = tables.filter((t) => t.status === 'available').length
  const occupied  = tables.filter((t) => t.status === 'occupied').length
  const reserved  = tables.filter((t) => t.status === 'reserved').length

  const STATUS_PILLS = [
    { label: 'Available', count: available, dot: '#22c55e' },
    { label: 'Occupied',  count: occupied,  dot: '#ef4444' },
    { label: 'Reserved',  count: reserved,  dot: '#f59e0b' },
  ]

  return (
    <div
      className="shrink-0 px-6 py-4 flex items-center justify-between gap-4"
      style={{
        background: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 100%)',
      }}
    >
      {/* Left: title + subtitle */}
      <div>
        <h1 className="text-white font-bold text-lg font-display leading-tight">
          Floor Plan — Spice Garden
        </h1>
        <p className="text-white/70 text-sm mt-0.5">
          {formatBannerDate()}
        </p>
      </div>

      {/* Right: status pills + button */}
      <div className="flex items-center gap-3 flex-wrap justify-end">
        {STATUS_PILLS.map(({ label, count, dot }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: dot }}
            />
            {label}: <span className="font-bold ml-0.5">{count}</span>
          </div>
        ))}

        <button
          onClick={() => toast.info('Reservation flow coming soon')}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors hover:bg-white/25"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        >
          <CalendarPlus className="w-4 h-4" />
          New Reservation
        </button>
      </div>
    </div>
  )
}
