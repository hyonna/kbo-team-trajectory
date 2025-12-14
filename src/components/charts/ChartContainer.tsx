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
    <div className="card-sporty animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </div>
  )
}
