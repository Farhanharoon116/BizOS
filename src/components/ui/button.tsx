import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:     'bg-brand-500 text-white hover:bg-brand-600',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline:     'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700',
  secondary:   'bg-gray-100 text-gray-700 hover:bg-gray-200',
  ghost:       'hover:bg-gray-100 text-gray-700',
  link:        'text-brand-500 underline-offset-4 hover:underline',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'h-10 px-4 py-2',
  sm:      'h-8 rounded-md px-3 text-xs',
  lg:      'h-11 rounded-md px-8',
  icon:    'h-10 w-10',
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export { Button }
