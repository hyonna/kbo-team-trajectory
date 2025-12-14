import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { TeamSeason } from '../lib/chart/types'

// Raw 데이터 타입 정의
interface BattingRecord {
  Year: number
  Team: string
  PA: number
  AB: number
  H: number
  BB: number
  HP: number
  SF: number
  TB: number
  HR: number
  OPS: number
  'wRC+': number
  WAR: number
}

interface PitchingRecord {
  Year: number
  Team: string
  IP: number
  ER: number
  H: number
  BB: number
  ERA: number
  FIP: number
  WHIP: number
  WAR: number
}

// JSON 파일 로드 함수
function loadJsonFile<T>(filePath: string): T {
  const content = readFileSync(filePath, 'utf-8')
  return JSON.parse(content) as T
}

// 타자 데이터 집계
function aggregateBattingStats(records: BattingRecord[]): Map<
  string,
  {
    year: number
    team: string
    ops: number
    hr: number
    battingWar: number
    wrcPlus: number
  }
> {
  const grouped = new Map<
    string,
    {
      year: number
      team: string
      sumH: number
      sumBB: number
      sumHP: number
      sumAB: number
      sumSF: number
      sumTB: number
      sumHR: number
      sumWAR: number
      sumPA: number
      sumWrcPlusWeighted: number
    }
  >()

  for (const record of records) {
    const key = `${record.Year}-${record.Team}`
    const existing = grouped.get(key)

    if (existing) {
      existing.sumH += record.H || 0
      existing.sumBB += record.BB || 0
      existing.sumHP += record.HP || 0
      existing.sumAB += record.AB || 0
      existing.sumSF += record.SF || 0
      existing.sumTB += record.TB || 0
      existing.sumHR += record.HR || 0
      existing.sumWAR += record.WAR || 0
      existing.sumPA += record.PA || 0
      existing.sumWrcPlusWeighted += (record['wRC+'] || 0) * (record.PA || 0)
    } else {
      grouped.set(key, {
        year: record.Year,
        team: record.Team,
        sumH: record.H || 0,
        sumBB: record.BB || 0,
        sumHP: record.HP || 0,
        sumAB: record.AB || 0,
        sumSF: record.SF || 0,
        sumTB: record.TB || 0,
        sumHR: record.HR || 0,
        sumWAR: record.WAR || 0,
        sumPA: record.PA || 0,
        sumWrcPlusWeighted: (record['wRC+'] || 0) * (record.PA || 0),
      })
    }
  }

  const result = new Map<
    string,
    {
      year: number
      team: string
      ops: number
      hr: number
      battingWar: number
      wrcPlus: number
    }
  >()

  for (const [key, data] of grouped) {
    // OBP 계산: (H + BB + HP) / (AB + BB + HP + SF)
    const obpDenominator = data.sumAB + data.sumBB + data.sumHP + data.sumSF
    const obp =
      obpDenominator > 0
        ? (data.sumH + data.sumBB + data.sumHP) / obpDenominator
        : 0

    // SLG 계산: TB / AB
    const slg = data.sumAB > 0 ? data.sumTB / data.sumAB : 0

    // OPS = OBP + SLG
    const ops = obp + slg

    // wRC+ 가중 평균
    const wrcPlus = data.sumPA > 0 ? data.sumWrcPlusWeighted / data.sumPA : 0

    result.set(key, {
      year: data.year,
      team: data.team,
      ops: Number(ops.toFixed(3)),
      hr: data.sumHR,
      battingWar: Number(data.sumWAR.toFixed(2)),
      wrcPlus: Number(wrcPlus.toFixed(1)),
    })
  }

  return result
}

// 투수 데이터 집계
function aggregatePitchingStats(records: PitchingRecord[]): Map<
  string,
  {
    year: number
    team: string
    era: number
    fip: number
    whip: number
    pitchingWar: number
    ip: number
  }
> {
  const grouped = new Map<
    string,
    {
      year: number
      team: string
      sumIP: number
      sumER: number
      sumH: number
      sumBB: number
      sumWAR: number
      sumFipWeighted: number
    }
  >()

  for (const record of records) {
    const key = `${record.Year}-${record.Team}`
    const existing = grouped.get(key)

    if (existing) {
      existing.sumIP += record.IP || 0
      existing.sumER += record.ER || 0
      existing.sumH += record.H || 0
      existing.sumBB += record.BB || 0
      existing.sumWAR += record.WAR || 0
      existing.sumFipWeighted += (record.FIP || 0) * (record.IP || 0)
    } else {
      grouped.set(key, {
        year: record.Year,
        team: record.Team,
        sumIP: record.IP || 0,
        sumER: record.ER || 0,
        sumH: record.H || 0,
        sumBB: record.BB || 0,
        sumWAR: record.WAR || 0,
        sumFipWeighted: (record.FIP || 0) * (record.IP || 0),
      })
    }
  }

  const result = new Map<
    string,
    {
      year: number
      team: string
      era: number
      fip: number
      whip: number
      pitchingWar: number
      ip: number
    }
  >()

  for (const [key, data] of grouped) {
    // ERA 계산: (ER * 9) / IP
    const era = data.sumIP > 0 ? (data.sumER * 9) / data.sumIP : 0

    // FIP 가중 평균
    const fip = data.sumIP > 0 ? data.sumFipWeighted / data.sumIP : 0

    // WHIP 계산: (H + BB) / IP
    const whip = data.sumIP > 0 ? (data.sumH + data.sumBB) / data.sumIP : 0

    result.set(key, {
      year: data.year,
      team: data.team,
      era: Number(era.toFixed(2)),
      fip: Number(fip.toFixed(2)),
      whip: Number(whip.toFixed(3)),
      pitchingWar: Number(data.sumWAR.toFixed(2)),
      ip: Number(data.sumIP.toFixed(1)),
    })
  }

  return result
}

// 파생 지표 계산 및 powerRank 부여
function calculateDerivedStats(
  battingStats: Map<
    string,
    {
      year: number
      team: string
      ops: number
      hr: number
      battingWar: number
      wrcPlus: number
    }
  >,
  pitchingStats: Map<
    string,
    {
      year: number
      team: string
      era: number
      fip: number
      whip: number
      pitchingWar: number
      ip: number
    }
  >
): TeamSeason[] {
  const allKeys = new Set([...battingStats.keys(), ...pitchingStats.keys()])

  const results: TeamSeason[] = []

  for (const key of allKeys) {
    const batting = battingStats.get(key)
    const pitching = pitchingStats.get(key)

    if (!batting && !pitching) continue

    const year = batting?.year || pitching?.year || 0
    const team = batting?.team || pitching?.team || ''

    const battingWar = batting?.battingWar || 0
    const pitchingWar = pitching?.pitchingWar || 0
    const totalWar = battingWar + pitchingWar
    const powerScore = battingWar * 0.55 + pitchingWar * 0.45

    results.push({
      year,
      team,
      batting: batting
        ? {
            ops: batting.ops,
            hr: batting.hr,
            battingWar: batting.battingWar,
            wrcPlus: batting.wrcPlus,
          }
        : {
            ops: 0,
            hr: 0,
            battingWar: 0,
            wrcPlus: 0,
          },
      pitching: pitching
        ? {
            era: pitching.era,
            fip: pitching.fip,
            whip: pitching.whip,
            pitchingWar: pitching.pitchingWar,
            ip: pitching.ip,
          }
        : {
            era: 0,
            fip: 0,
            whip: 0,
            pitchingWar: 0,
            ip: 0,
          },
      totalWar: Number(totalWar.toFixed(2)),
      powerScore: Number(powerScore.toFixed(2)),
      powerRank: 0, // 나중에 설정
    })
  }

  // 연도별로 그룹핑하여 powerRank 부여
  const byYear = new Map<number, TeamSeason[]>()

  for (const result of results) {
    const yearResults = byYear.get(result.year) || []
    yearResults.push(result)
    byYear.set(result.year, yearResults)
  }

  // 각 연도별로 powerScore 기준 내림차순 정렬 후 rank 부여
  for (const [, yearResults] of byYear) {
    yearResults.sort((a, b) => b.powerScore - a.powerScore)

    for (let i = 0; i < yearResults.length; i++) {
      yearResults[i].powerRank = i + 1
    }
  }

  // 최종 결과를 연도, 순위 순으로 정렬
  return results.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year
    }
    return a.powerRank - b.powerRank
  })
}

// 메인 실행 함수
function main() {
  const projectRoot = process.cwd()
  const rawDataPath = join(projectRoot, 'src/data/raw')
  const derivedDataPath = join(projectRoot, 'src/data/derived')

  console.log('데이터 파일 로드 중...')
  const battingRecords = loadJsonFile<BattingRecord[]>(
    join(rawDataPath, 'kbo_batting_stats_by_season_1982-2025.json')
  )
  const pitchingRecords = loadJsonFile<PitchingRecord[]>(
    join(rawDataPath, 'kbo_pitching_stats_by_season_1982-2025.json')
  )

  console.log(`타자 기록: ${battingRecords.length}건`)
  console.log(`투수 기록: ${pitchingRecords.length}건`)

  console.log('타자 데이터 집계 중...')
  const battingStats = aggregateBattingStats(battingRecords)

  console.log('투수 데이터 집계 중...')
  const pitchingStats = aggregatePitchingStats(pitchingRecords)

  console.log('파생 지표 계산 및 순위 부여 중...')
  const teamSeasonStats = calculateDerivedStats(battingStats, pitchingStats)

  console.log(`팀 시즌 통계: ${teamSeasonStats.length}건`)

  // 결과 저장
  const outputPath = join(derivedDataPath, 'team-season.json')
  writeFileSync(outputPath, JSON.stringify(teamSeasonStats, null, 2), 'utf-8')

  console.log(`결과 저장 완료: ${outputPath}`)
}

// 스크립트 실행
if (require.main === module) {
  main()
}

export { main }
