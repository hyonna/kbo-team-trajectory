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
      className={`bg-white p-3 border border-gray-300 rounded-lg shadow-lg ${className}`}
    >
      <p className="font-semibold text-gray-900 mb-2">{title}</p>
      <div className="space-y-1 text-sm">{children}</div>
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
    <p className={`text-gray-700 ${className}`}>
      <span className="font-medium">{label}:</span> {value}
    </p>
  )
}
