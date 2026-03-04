import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div className={cn('card', hover && 'hover:-translate-y-1 transition-transform duration-200', className)}>
      {children}
    </div>
  )
}
