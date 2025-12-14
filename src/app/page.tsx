import RankTrajectoryChart from '@/components/charts/RankTrajectoryChart'
import SnapshotBarChart from '@/components/charts/SnapshotBarChart'
import TrajectoryLineChart from '@/components/charts/TrajectoryLineChart'
import teamSeasonData from '@/data/derived/team-season.json'
import { buildTrajectoryData } from '@/lib/chart/transform'
import type { TeamSeason } from '@/lib/chart/types'

export default function Home() {
  const rows = teamSeasonData as TeamSeason[]

  // 모든 팀 목록 추출
  const allTeams = Array.from(new Set(rows.map(r => r.team)))
  // 2025년 기준 10개 팀
  const currentTeams = [
    'KIA',
    'KT',
    'LG',
    'NC',
    'SSG',
    '두산',
    '롯데',
    '삼성',
    '키움',
    '한화',
  ]

  // 연도 범위
  const allYears = { from: 1982, to: 2025 }
  const recentYears = { from: 2010, to: 2025 }

  // RankTrajectoryChart용 데이터
  const rankDataAll = buildTrajectoryData(rows, allTeams, allYears, 'powerRank')
  const rankDataCurrent = buildTrajectoryData(
    rows,
    currentTeams,
    recentYears,
    'powerRank'
  )

  // TrajectoryLineChart용 데이터
  const totalWarData = buildTrajectoryData(
    rows,
    currentTeams,
    recentYears,
    'totalWar'
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-extrabold gradient-text mb-4">
            KBO Team Trajectory
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            KBO 팀들의 시즌별 성적 흐름을 시각화합니다
          </p>
        </div>

        <RankTrajectoryChart data={rankDataAll} maxRank={10} />

        <RankTrajectoryChart data={rankDataCurrent} maxRank={10} />

        <TrajectoryLineChart
          data={totalWarData}
          metric="totalWar"
          yDomain="auto"
        />

        <SnapshotBarChart
          rows={rows}
          year={2025}
          metric="powerScore"
          teams={currentTeams}
        />
      </div>
    </main>
  )
}
