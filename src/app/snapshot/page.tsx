import { Suspense } from 'react'
import YearSelector from '@/components/snapshot/YearSelector'
import MetricSelector from '@/components/snapshot/MetricSelector'
import SnapshotBarChartWithDelta from '@/components/charts/SnapshotBarChartWithDelta'
import { loadTeamSeasons, getYears } from '@/lib/dataset/loadTeamSeason'
import type { MetricKey } from '@/lib/chart/types'

interface SnapshotPageProps {
  searchParams: Promise<{
    year?: string
    metric?: string
  }>
}

interface SnapshotContentProps {
  searchParams: {
    year?: string
    metric?: string
  }
}

async function SnapshotContent({ searchParams }: SnapshotContentProps) {
  const params = searchParams

  // 데이터 로드
  const allData = loadTeamSeasons()
  const availableYears = getYears()

  // URL params 파싱
  const selectedYear = params.year
    ? Number(params.year)
    : availableYears[availableYears.length - 1]

  const metric: 'powerScore' | 'totalWar' =
    (params.metric as 'powerScore' | 'totalWar') || 'powerScore'

  // 전년도 계산
  const currentYearIndex = availableYears.indexOf(selectedYear)
  const previousYear =
    currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold gradient-text mb-4">
            연도별 스냅샷 비교
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            특정 연도의 팀별 성적을 비교하고 전년 대비 변화를 확인합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <YearSelector
            availableYears={availableYears}
            initialYear={selectedYear}
          />
          <MetricSelector initialMetric={metric} />
        </div>

        <SnapshotBarChartWithDelta
          rows={allData}
          year={selectedYear}
          metric={metric as MetricKey}
          previousYear={previousYear}
        />
      </div>
    </div>
  )
}

export default async function SnapshotPage({
  searchParams,
}: SnapshotPageProps) {
  const resolvedParams = await searchParams

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SnapshotContent searchParams={resolvedParams} />
    </Suspense>
  )
}
