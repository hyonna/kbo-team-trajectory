import type { TeamSeason, MetricKey } from './types'

/**
 * TeamSeason 행에서 지정된 메트릭 값을 추출하는 selector 함수 (경로 기반)
 */
export function getMetric(row: TeamSeason, key: MetricKey): number {
  switch (key) {
    case 'powerRank':
      return row.powerRank
    case 'powerScore':
      return row.powerScore
    case 'totalWar':
      return row.totalWar
    case 'batting.ops':
      return row.batting.ops
    case 'batting.war':
      return row.batting.battingWar // 실제 필드명 매핑
    case 'batting.wrcPlus':
      return row.batting.wrcPlus
    case 'pitching.era':
      return row.pitching.era
    case 'pitching.fip':
      return row.pitching.fip
    case 'pitching.whip':
      return row.pitching.whip
    case 'pitching.ip':
      return row.pitching.ip
    case 'pitching.war':
      return row.pitching.pitchingWar // 실제 필드명 매핑
    default:
      return 0
  }
}
