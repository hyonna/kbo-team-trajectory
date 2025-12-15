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

  return (
    <div className="text-xs bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm px-3 py-2 min-w-[180px]">
      <div className="grid grid-cols-3 gap-2 text-[11px] text-gray-500 dark:text-gray-400 mb-1">
        <span>현재</span>
        <span>전년</span>
        <span>Δ</span>
      </div>
      <div className="grid grid-cols-3 gap-2 font-semibold text-gray-900 dark:text-gray-100">
        <span>{formatValue(current)}</span>
        <span>{formatValue(previous)}</span>
        <span
          className={`inline-flex items-center gap-1 ${
            delta === 0
              ? 'text-gray-600 dark:text-gray-300'
              : isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
          }`}
        >
          {delta === 0 ? '±0' : isPositive ? '▲' : '▼'} {formatValue(Math.abs(delta))}
        </span>
      </div>
    </div>
  )
}
