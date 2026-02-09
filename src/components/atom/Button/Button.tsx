import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
}

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-2.5 text-lg',
}

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50'

export const Button = ({
  children,
  className = '',
  size = 'md',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) => {
  const classes = [
    baseClasses,
    sizeClassMap[size],
    variantClassMap[variant],
    className,
  ]
    .filter((value) => value.length > 0)
    .join(' ')

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
