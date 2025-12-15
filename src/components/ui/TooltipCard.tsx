import { ReactNode } from 'react'

interface TooltipCardProps {
  title: string
  children: ReactNode
  className?: string
}

export default function TooltipCard({
  title,
  children,
  className = '',
}: TooltipCardProps) {
  return (
    <div
      className={`bg-white dark:bg-gray-900 p-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl z-[9999] relative ${className}`}
      style={{ zIndex: 9999 }}
    >
      <p className="font-bold text-gray-900 dark:text-gray-100 mb-3 gradient-text">
        {title}
      </p>
      <div className="space-y-1.5 text-sm">{children}</div>
    </div>
  )
}

interface TooltipRowProps {
  label: string
  value: string | number
  className?: string
}

export function TooltipRow({ label, value, className = '' }: TooltipRowProps) {
  return (
    <p className={`text-gray-700 dark:text-gray-300 ${className}`}>
      <span className="font-semibold">{label}:</span>{' '}
      <span className="font-medium">{value}</span>
    </p>
  )
}
