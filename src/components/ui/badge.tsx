import * as React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:     'bg-brand-500 text-white',
  secondary:   'bg-gray-100 text-gray-700',
  destructive: 'bg-red-100 text-red-700',
  outline:     'border border-gray-200 text-gray-700',
  success:     'bg-emerald-100 text-emerald-700',
  warning:     'bg-amber-100 text-amber-700',
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', variantClasses[variant], className)}
      {...props}
    />
  )
}

export { Badge }
