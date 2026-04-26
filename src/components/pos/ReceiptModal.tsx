import { useRef } from 'react'
import { Printer, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { formatPKR } from '../../lib/format'
import type { CompletedSale } from '../../store/saleStore'

interface Props {
  sale: CompletedSale | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function ReceiptModal({ sale, open, onOpenChange }: Props) {
  const printRef = useRef<HTMLDivElement>(null)

  function handlePrint() {
    if (!printRef.current) return
    const content = printRef.current.innerHTML
    const w = window.open('', '_blank', 'width=400,height=600')
    if (!w) return
    w.document.write(`
      <html><head><title>Receipt ${sale?.receiptNumber}</title>
      <style>
        body { font-family: monospace; font-size: 13px; padding: 20px; max-width: 320px; margin: 0 auto; }
        h2 { text-align: center; font-size: 16px; margin-bottom: 4px; }
        .center { text-align: center; }
        .row { display: flex; justify-content: space-between; margin: 4px 0; }
        .divider { border-top: 1px dashed #000; margin: 8px 0; }
        .bold { font-weight: bold; }
        .total { font-size: 15px; }
      </style></head>
      <body>${content}</body></html>
    `)
    w.document.close()
    w.focus()
    w.print()
    w.close()
  }

  if (!sale) return null

  const now = new Date(sale.createdAt)
  const dateStr = now.toLocaleString('en-PK', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Receipt
          </DialogTitle>
        </DialogHeader>

        {/* Receipt content */}
        <div ref={printRef} className="font-mono text-xs space-y-1">
          <h2 className="text-center font-bold text-base">Raza General Store</h2>
          <p className="text-center text-gray-500">Main Branch · Lahore</p>
          <div className="border-t border-dashed border-gray-300 my-2" />

          <div className="flex justify-between text-gray-500">
            <span>Receipt:</span>
            <span className="font-bold text-gray-900">{sale.receiptNumber}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Date:</span>
            <span>{dateStr}</span>
          </div>
          {sale.customerName && (
            <div className="flex justify-between text-gray-500">
              <span>Customer:</span>
              <span>{sale.customerName}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-500">
            <span>Payment:</span>
            <span className="capitalize">{sale.paymentMethod}</span>
          </div>

          <div className="border-t border-dashed border-gray-300 my-2" />

          {/* Items */}
          <div className="space-y-1">
            {sale.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="truncate max-w-[180px]">{item.name}</span>
                <span className="shrink-0 ml-2">{item.qty} × {formatPKR(item.price)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-gray-300 my-2" />

          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>{formatPKR(sale.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>GST</span>
            <span>{formatPKR(sale.tax)}</span>
          </div>
          {sale.discount > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span>-{formatPKR(sale.discount)}</span>
            </div>
          )}

          <div className="border-t border-dashed border-gray-300 my-2" />

          <div className="flex justify-between font-bold text-base">
            <span>TOTAL</span>
            <span>{formatPKR(sale.total)}</span>
          </div>

          <div className="border-t border-dashed border-gray-300 my-2" />
          <p className="text-center text-gray-400">Thank you for shopping!</p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 gap-2" onClick={() => onOpenChange(false)}>
            <X className="w-4 h-4" /> Close
          </Button>
          <Button className="flex-1 gap-2" onClick={handlePrint}>
            <Printer className="w-4 h-4" /> Print
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
