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
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-gray-700">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
