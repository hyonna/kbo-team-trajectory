interface LegendItem {
  label: string
  color: string
}

interface LegendChipsProps {
  items: LegendItem[]
  className?: string
}

export default function LegendChips({
  items,
  className = '',
}: LegendChipsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className={`flex flex-wrap gap-4 justify-center ${className}`}>
      {items.map(item => (
        <div
          key={item.label}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
