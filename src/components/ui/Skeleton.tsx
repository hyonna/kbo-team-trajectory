export function TableSkeleton() {
  return (
    <div className="rounded-xl bg-gray-900/80 text-gray-100 animate-fade-in p-4">
      <div className="h-8 bg-gray-800 rounded mb-4 w-48 animate-pulse"></div>
      <div className="space-y-3">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-800 rounded animate-pulse"
            ></div>
          ))}
        </div>
        {/* 테이블 행 */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="grid grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, j) => (
              <div
                key={j}
                className="h-12 bg-gray-800 rounded animate-pulse"
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
    <div className="rounded-xl bg-gray-900/80 h-[500px] animate-fade-in p-4 flex flex-col">
      <div className="h-8 bg-gray-800 rounded mb-2 w-64 animate-pulse"></div>
      <div className="h-4 bg-gray-800 rounded mb-6 w-96 animate-pulse"></div>
      <div className="flex-1 bg-gray-800 rounded animate-pulse"></div>
    </div>
  )
}

export function FilterSkeleton() {
  return (
    <div className="rounded-xl bg-gray-900/80 animate-fade-in p-4 space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-800 rounded w-24 animate-pulse"></div>
          <div className="h-10 bg-gray-800 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 md:p-8">
      <div className="mx-auto space-y-6">
        {/* 헤더 */}
        <div className="animate-fade-in">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-56 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-80 animate-pulse"></div>
        </div>

        {/* 대시보드 레이아웃: 좌측 사이드바 + 우측 차트/테이블 */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
          {/* 사이드바 스켈레톤 */}
          <aside className="w-full md:w-72 lg:w-80 shrink-0">
            <FilterSkeleton />
          </aside>

          {/* 메인 영역 스켈레톤 */}
          <section className="flex-1 space-y-6">
            <ChartSkeleton />
            <TableSkeleton />
          </section>
        </div>
      </div>
    </main>
  )
}
