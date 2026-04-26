import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useCustomerStore } from '../../store/customerStore'

const schema = z.object({
  name:  z.string().min(2, 'Name required'),
  phone: z.string().min(10, 'Valid phone required'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function AddCustomerModal({ open, onOpenChange }: Props) {
  const addCustomer = useCustomerStore((s) => s.addCustomer)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
  })

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  function onSubmit(data: FormData) {
    addCustomer({ name: data.name, phone: data.phone, email: data.email || undefined })
    toast.success(`Customer "${data.name}" added`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Customer</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="cname">Full Name</Label>
            <Input id="cname" placeholder="e.g. Ahmed Khan" {...register('name')} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cphone">Phone Number</Label>
            <Input id="cphone" type="tel" placeholder="0300-1234567" {...register('phone')} />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cemail">Email (optional)</Label>
            <Input id="cemail" type="email" placeholder="example@email.com" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Customer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
