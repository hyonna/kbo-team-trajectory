export function TableSkeleton() {
  return (
    <div className="card-sporty animate-fade-in">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-48 animate-pulse"></div>
      <div className="space-y-3">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            ></div>
          ))}
        </div>
        {/* 테이블 행 */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, j) => (
              <div
                key={j}
                className="h-12 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="card-sporty h-[500px] animate-fade-in">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-64 animate-pulse"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-96 animate-pulse"></div>
      <div className="h-[400px] bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
    </div>
  )
}

export function FilterSkeleton() {
  return (
    <div className="card-sporty animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
            <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* 필터 */}
        <FilterSkeleton />

        {/* 차트 */}
        <ChartSkeleton />

        {/* 테이블 */}
        <TableSkeleton />
      </div>
    </div>
  )
}
