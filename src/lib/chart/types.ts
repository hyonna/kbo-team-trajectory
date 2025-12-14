// TeamSeason 타입 정의 (실제 JSON 구조에 맞춤)
export interface TeamSeason {
  year: number
  team: string
  batting: {
    ops: number
    hr: number
    battingWar: number // 실제 JSON에서는 battingWar
    wrcPlus: number
  }
  pitching: {
    era: number
    fip: number
    whip: number
    pitchingWar: number // 실제 JSON에서는 pitchingWar
    ip: number
  }
  totalWar: number
  powerScore: number
  powerRank: number
}

// MetricKey 유니온 타입 (경로 기반)
export type MetricKey =
  | 'powerRank'
  | 'powerScore'
  | 'totalWar'
  | 'batting.ops'
  | 'batting.war'
  | 'batting.wrcPlus'
  | 'pitching.era'
  | 'pitching.fip'
  | 'pitching.whip'
  | 'pitching.ip'
  | 'pitching.war'
