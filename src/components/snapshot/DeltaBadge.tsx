'use client'

interface DeltaBadgeProps {
  current: number
  previous: number | null
  formatValue?: (value: number) => string
}

export default function DeltaBadge({
  current,
  previous,
  formatValue = value => value.toFixed(2),
}: DeltaBadgeProps) {
  if (previous === null) {
    return null
  }

  const delta = current - previous
  const isPositive = delta > 0

  if (delta === 0) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
        ±0
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isPositive ? '↑' : '↓'} {formatValue(Math.abs(delta))}
    </span>
  )
}
