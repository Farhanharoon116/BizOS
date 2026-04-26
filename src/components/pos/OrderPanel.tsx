import { useState } from 'react'
import { Trash2, Plus, Minus, CreditCard, Banknote, Smartphone, Pause, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, useCartTotals } from '../../store/cartStore'
import { useSaleStore } from '../../store/saleStore'
import { useCustomerStore } from '../../store/customerStore'
import { formatPKR } from '../../lib/format'
import { cn } from '../../lib/utils'
import { toast } from 'sonner'
import { CustomerSelector } from './CustomerSelector'
import { ReceiptModal } from './ReceiptModal'
import type { CompletedSale } from '../../store/saleStore'

const PAYMENT_METHODS = [
  { id: 'cash' as const,      label: 'Cash',      icon: Banknote },
  { id: 'card' as const,      label: 'Card',      icon: CreditCard },
  { id: 'easypaisa' as const, label: 'Easypaisa', icon: Smartphone },
  { id: 'jazzcash' as const,  label: 'JazzCash',  icon: Smartphone },
]

export function OrderPanel() {
  const { items, paymentMethod, customerId, customerName, removeItem, updateQty, clearCart, setPaymentMethod } = useCartStore()
  const { subtotal, tax, discount, total } = useCartTotals()
  const recordSale = useSaleStore((s) => s.recordSale)
  const addSale = useCustomerStore((s) => s.addSale)
  const cartItems = Object.values(items)

  const [manualDiscount, setManualDiscount] = useState('')
  const [receipt, setReceipt] = useState<CompletedSale | null>(null)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [held, setHeld] = useState<typeof items | null>(null)

  const extraDiscount = parseFloat(manualDiscount) || 0
  const finalTotal = Math.max(0, total - extraDiscount)
  const totalDiscount = discount + extraDiscount

  function handleCharge() {
    if (cartItems.length === 0) {
      toast.error('Cart is empty')
      return
    }
    const sale = recordSale({
      items: cartItems,
      subtotal,
      tax,
      discount: totalDiscount,
      total: finalTotal,
      paymentMethod,
      customerId,
      customerName,
    })
    if (customerId) addSale(customerId, finalTotal)
    toast.success(`Sale of ${formatPKR(finalTotal)} processed via ${paymentMethod}`)
    setManualDiscount('')
    clearCart()
    setReceipt(sale)
    setReceiptOpen(true)
  }

  function handleHold() {
    if (cartItems.length === 0) return
    setHeld(items)
    clearCart()
    setManualDiscount('')
    toast.info('Order held')
  }

  function handleRecall() {
    if (!held) return
    // Restore held items
    Object.values(held).forEach((item) => {
      useCartStore.setState((s) => ({
        items: { ...s.items, [item.id]: item },
      }))
    })
    setHeld(null)
    toast.info('Held order recalled')
  }

  return (
    <div className="flex flex-col h-full bg-white border-l border-gray-100">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-900">Current Order</h2>
          <div className="flex gap-1">
            {held && (
              <button
                onClick={handleRecall}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Recall
              </button>
            )}
            <button
              onClick={handleHold}
              disabled={cartItems.length === 0}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Pause className="w-3 h-3" /> Hold
            </button>
          </div>
        </div>
        <CustomerSelector />
        <p className="text-xs text-gray-400 mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
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
      <div className="border-t border-gray-100 px-5 py-4 space-y-3">
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

          {/* Manual discount input */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 shrink-0">Extra discount (Rs)</span>
            <input
              type="number"
              min="0"
              value={manualDiscount}
              onChange={(e) => setManualDiscount(e.target.value)}
              placeholder="0"
              className="w-24 h-7 px-2 rounded border border-gray-200 text-sm text-right ml-auto focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
          {extraDiscount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Manual discount</span>
              <span>-{formatPKR(extraDiscount)}</span>
            </div>
          )}

          <div className="flex justify-between font-bold text-gray-900 text-base pt-1 border-t border-gray-100">
            <span>Total</span>
            <span>{formatPKR(finalTotal)}</span>
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
          Charge {cartItems.length > 0 ? formatPKR(finalTotal) : ''}
        </button>
      </div>

      <ReceiptModal sale={receipt} open={receiptOpen} onOpenChange={setReceiptOpen} />
    </div>
  )
}
