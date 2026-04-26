import { useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select'
import { useEmployeeStore } from '../../store/employeeStore'

const ROLES = ['Cashier', 'Floor Manager', 'Stockkeeper', 'Guard', 'Cleaner', 'Supervisor', 'Accountant', 'Driver']

const schema = z.object({
  name:     z.string().min(2, 'Name required'),
  role:     z.string().min(1, 'Role required'),
  phone:    z.string().min(10, 'Valid phone required'),
  salary:   z.coerce.number().positive('Salary must be positive'),
  hireDate: z.string().min(1, 'Hire date required'),
  status:   z.enum(['on-shift', 'on-leave', 'absent']),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function AddEmployeeModal({ open, onOpenChange }: Props) {
  const addEmployee = useEmployeeStore((s) => s.addEmployee)
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: { status: 'on-shift', hireDate: new Date().toISOString().slice(0, 10) },
  })

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  function onSubmit(data: FormData) {
    addEmployee(data)
    toast.success(`Employee "${data.name}" added`)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="ename">Full Name</Label>
              <Input id="ename" placeholder="e.g. Ahmed Khan" {...register('name')} />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Role</Label>
              <Select onValueChange={(v) => setValue('role', v, { shouldValidate: true })}>
                <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select defaultValue="on-shift" onValueChange={(v) => setValue('status', v as FormData['status'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-shift">On Shift</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="ephone">Phone</Label>
              <Input id="ephone" type="tel" placeholder="0300-1234567" {...register('phone')} />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="esalary">Monthly Salary (Rs)</Label>
              <Input id="esalary" type="number" min="0" placeholder="25000" {...register('salary')} />
              {errors.salary && <p className="text-xs text-red-500">{errors.salary.message}</p>}
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="ehireDate">Hire Date</Label>
              <Input id="ehireDate" type="date" {...register('hireDate')} />
              {errors.hireDate && <p className="text-xs text-red-500">{errors.hireDate.message}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Employee
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
