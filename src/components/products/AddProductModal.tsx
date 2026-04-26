import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { CATEGORIES } from '../../constants'

const schema = z.object({
  name:         z.string().min(2, 'Name is required'),
  sku:          z.string().min(3, 'SKU is required'),
  category:     z.string().min(1, 'Category is required'),
  price:        z.coerce.number().positive('Must be positive'),
  costPrice:    z.coerce.number().positive('Must be positive'),
  stock:        z.coerce.number().int().min(0),
  reorderPoint: z.coerce.number().int().min(0),
  unit:         z.string().min(1, 'Unit is required'),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function AddProductModal({ open, onOpenChange }: Props) {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: { unit: 'pcs', stock: 0, reorderPoint: 5 },
  })

  function onSubmit(data: FormData) {
    console.log('New product:', data)
    toast.success(`Product "${data.name}" added successfully`)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="e.g. Dairy Milk 250ml" {...register('name')} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" placeholder="DML-250-NTL" {...register('sku')} />
              {errors.sku && <p className="text-xs text-red-500">{errors.sku.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select onValueChange={(v) => setValue('category', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
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
              <Label htmlFor="price">Sale Price (Rs)</Label>
              <Input id="price" type="number" placeholder="0" {...register('price')} />
              {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="costPrice">Cost Price (Rs)</Label>
              <Input id="costPrice" type="number" placeholder="0" {...register('costPrice')} />
              {errors.costPrice && <p className="text-xs text-red-500">{errors.costPrice.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="stock">Initial Stock</Label>
              <Input id="stock" type="number" placeholder="0" {...register('stock')} />
              {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reorderPoint">Reorder Point</Label>
              <Input id="reorderPoint" type="number" placeholder="5" {...register('reorderPoint')} />
              {errors.reorderPoint && <p className="text-xs text-red-500">{errors.reorderPoint.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Unit</Label>
              <Select defaultValue="pcs" onValueChange={(v) => setValue('unit', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['pcs', 'kg', 'g', 'L', 'ml', 'box', 'dozen'].map((u) => (
                    <SelectItem key={u} value={u}>{u}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
