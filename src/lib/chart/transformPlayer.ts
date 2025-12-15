import type {
  BattingRecord,
  PitchingRecord,
} from '@/lib/dataset/loadPlayerStats'

export type PlayerMetricKey =
  | 'WAR'
  | 'OPS'
  | 'PA'
  | 'AB'
  | 'H'
  | 'HR'
  | 'ERA'
  | 'FIP'
  | 'IP'

export interface PlayerSeriesPoint {
  x: number // year
  y: number // metric value
  raw: BattingRecord | PitchingRecord
}

export interface PlayerSeries {
  player: string
  points: PlayerSeriesPoint[]
}

export interface PlayerTrajectoryData {
  years: number[]
  series: PlayerSeries[]
}

/**
 * 타자 데이터를 차트용 형식으로 변환합니다
 */
export function buildBatterTrajectoryData(
  records: BattingRecord[],
  metric: PlayerMetricKey
): PlayerTrajectoryData {
  if (records.length === 0) {
    return { years: [], series: [] }
  }

  const years = Array.from(new Set(records.map(r => r.Year))).sort(
    (a, b) => a - b
  )
  const playerName = records[0].Name

  const points: PlayerSeriesPoint[] = years.map(year => {
    const record = records.find(r => r.Year === year)
    if (!record) {
      return {
        x: year,
        y: NaN,
        raw: records[0], // fallback
      }
    }

    let value: number
    switch (metric) {
      case 'WAR':
        value = record.WAR || 0
        break
      case 'OPS':
        value = record.OPS || 0
        break
      case 'PA':
        value = record.PA || 0
        break
      case 'AB':
        value = record.AB || 0
        break
      case 'H':
        value = record.H || 0
        break
      case 'HR':
        value = record.HR || 0
        break
      default:
        value = 0
    }

    return {
      x: year,
      y: value,
      raw: record,
    }
  })

  return {
    years,
    series: [
      {
        player: playerName,
        points,
      },
    ],
  }
}

/**
 * 투수 데이터를 차트용 형식으로 변환합니다
 */
export function buildPitcherTrajectoryData(
  records: PitchingRecord[],
  metric: PlayerMetricKey
): PlayerTrajectoryData {
  if (records.length === 0) {
    return { years: [], series: [] }
  }

  const years = Array.from(new Set(records.map(r => r.Year))).sort(
    (a, b) => a - b
  )
  const playerName = records[0].Name

  const points: PlayerSeriesPoint[] = years.map(year => {
    const record = records.find(r => r.Year === year)
    if (!record) {
      return {
        x: year,
        y: NaN,
        raw: records[0], // fallback
      }
    }

    let value: number
    switch (metric) {
      case 'WAR':
        value = record.WAR || 0
        break
      case 'ERA':
        value = record.ERA || 0
        break
      case 'FIP':
        value = record.FIP || 0
        break
      case 'IP':
        value = record.IP || 0
        break
      default:
        value = 0
    }

    return {
      x: year,
      y: value,
      raw: record,
    }
  })

  return {
    years,
    series: [
      {
        player: playerName,
        points,
      },
    ],
  }
}
