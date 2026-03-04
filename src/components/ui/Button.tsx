import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  variant?: 'primary' | 'secondary' | 'red' | 'white'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  external?: boolean
}

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  red: 'btn-red',
  white: 'bg-white text-[#1e3a5f] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg',
}

const sizes = {
  sm: '!py-2 !px-4 text-sm',
  md: '',
  lg: '!py-4 !px-8 text-lg',
}

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  onClick,
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = cn(variants[variant], sizes[size], className)

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cn(classes, 'inline-block text-center')}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cn(classes, 'inline-block text-center')}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(classes, disabled && 'opacity-50 cursor-not-allowed')}>
      {children}
    </button>
  )
}
