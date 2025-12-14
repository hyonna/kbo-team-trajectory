import { ReactNode } from 'react'

interface ChartContainerProps {
  title: string
  description?: string
  children: ReactNode
}

export default function ChartContainer({
  title,
  description,
  children,
}: ChartContainerProps) {
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
