import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Wand2 } from 'lucide-react'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { CATEGORIES } from '../../constants'
import { useProductStore, generateSKU } from '../../store/productStore'
import type { Product } from '../../types'

const schema = z.object({
  name:         z.string().min(2, 'Name is required'),
  sku:          z.string().min(3, 'SKU is required'),
  category:     z.string().min(1, 'Category is required'),
  price:        z.coerce.number().positive('Must be positive'),
  costPrice:    z.coerce.number().positive('Must be positive'),
  stock:        z.coerce.number().int().min(0),
  reorderPoint: z.coerce.number().int().min(0),
  unit:         z.string().min(1, 'Unit is required'),
  taxRate:      z.coerce.number().min(0),
})

type FormData = z.infer<typeof schema>

interface Props {
  product: Product | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function EditProductModal({ product, open, onOpenChange }: Props) {
  const updateProduct = useProductStore((s) => s.updateProduct)

  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
  })

  const watchedName = watch('name')
  const watchedCategory = watch('category')

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price,
        costPrice: product.costPrice,
        stock: product.stock,
        reorderPoint: product.reorderPoint,
        unit: product.unit,
        taxRate: product.taxRate,
      })
    }
  }, [product, reset])

  function handleAutoSKU() {
    const name = watchedName || ''
    const cat  = watchedCategory || 'GEN'
    if (name.length < 2) {
      toast.error('Enter a product name first')
      return
    }
    setValue('sku', generateSKU(name, cat), { shouldValidate: true })
  }

  function onSubmit(data: FormData) {
    if (!product) return
    updateProduct(product.id, data)
    toast.success(`Product "${data.name}" updated`)
    onOpenChange(false)
  }

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="ename">Product Name</Label>
              <Input id="ename" {...register('name')} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="esku">SKU</Label>
              <div className="flex gap-2">
                <Input id="esku" {...register('sku')} />
                <Button type="button" variant="outline" size="icon" onClick={handleAutoSKU} title="Re-generate SKU">
                  <Wand2 className="w-4 h-4" />
                </Button>
              </div>
              {errors.sku && <p className="text-xs text-red-500">{errors.sku.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={watchedCategory} onValueChange={(v) => setValue('category', v, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.filter((c) => c !== 'All Products').map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eprice">Sale Price (Rs)</Label>
              <Input id="eprice" type="number" min="0" step="0.01" {...register('price')} />
              {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ecostPrice">Cost Price (Rs)</Label>
              <Input id="ecostPrice" type="number" min="0" step="0.01" {...register('costPrice')} />
              {errors.costPrice && <p className="text-xs text-red-500">{errors.costPrice.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="estock">Stock</Label>
              <Input id="estock" type="number" min="0" {...register('stock')} />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ereorderPoint">Reorder Point</Label>
              <Input id="ereorderPoint" type="number" min="0" {...register('reorderPoint')} />
              {errors.reorderPoint && <p className="text-xs text-red-500">{errors.reorderPoint.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Unit</Label>
              <Select value={watch('unit')} onValueChange={(v) => setValue('unit', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['pcs', 'kg', 'g', 'L', 'ml', 'box', 'dozen'].map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="etaxRate">Tax Rate (%)</Label>
              <Input id="etaxRate" type="number" min="0" max="100" step="0.1" {...register('taxRate')} />
              {errors.taxRate && <p className="text-xs text-red-500">{errors.taxRate.message}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
