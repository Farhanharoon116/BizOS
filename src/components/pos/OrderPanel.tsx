import { Trash2, Plus, Minus, CreditCard, Banknote, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, useCartTotals } from '../../store/cartStore'
import { formatPKR } from '../../lib/format'
import { cn } from '../../lib/utils'
import { toast } from 'sonner'

const PAYMENT_METHODS = [
  { id: 'cash' as const,      label: 'Cash',      icon: Banknote },
  { id: 'card' as const,      label: 'Card',      icon: CreditCard },
  { id: 'easypaisa' as const, label: 'Easypaisa', icon: Smartphone },
  { id: 'jazzcash' as const,  label: 'JazzCash',  icon: Smartphone },
]

export function OrderPanel() {
  const { items, paymentMethod, removeItem, updateQty, clearCart, setPaymentMethod } = useCartStore()
  const { subtotal, tax, discount, total } = useCartTotals()
  const cartItems = Object.values(items)

  function handleCharge() {
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return
    }
    toast.success(`Sale of ${formatPKR(total)} processed via ${paymentMethod}`)
    clearCart()
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Current Order</h2>
        <p className="text-xs text-gray-400 mt-0.5">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Cart items */}
      <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
        <AnimatePresence initial={false}>
          {cartItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full py-16 text-gray-300"
            >
              <Banknote className="w-12 h-12 mb-2" />
              <p className="text-sm">Add products to start a sale</p>
            </motion.div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">{formatPKR(item.price)} each</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-sm font-bold text-gray-900 w-20 text-right">{formatPKR(item.lineTotal)}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 rounded hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Totals + Payment */}
      <div className="border-t border-gray-100 px-5 py-4 space-y-4">
        {/* Totals */}
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>{formatPKR(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>GST 17%</span>
            <span>{formatPKR(tax)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Loyalty discount (5%)</span>
              <span>-{formatPKR(discount)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
        </div>

        {/* Payment method */}
        <div className="grid grid-cols-4 gap-1.5">
          {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id)}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-lg border text-xs font-medium transition-colors',
                paymentMethod === id
                  ? 'border-brand-500 bg-brand-50 text-brand-600'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300',
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Charge button */}
        <button
          onClick={handleCharge}
          disabled={cartItems.length === 0}
          className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-colors"
        >
          Charge {cartItems.length > 0 ? formatPKR(total) : ''}
        </button>
      </div>
    </div>
  )
}
