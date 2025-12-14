import type { TrajectoryData } from './transform'

/**
 * Y축 도메인 계산 옵션
 */
export interface DomainOptions {
  padding?: number // 도메인 상하 여백 (비율, 기본값: 0.1)
  min?: number // 최소값 고정
  max?: number // 최대값 고정
  includeZero?: boolean // 0 포함 여부
}

/**
 * 궤적 데이터에서 Y축 도메인 계산
 */
export function calculateYDomain(
  data: TrajectoryData,
  options: DomainOptions = {}
): [number, number] {
  const { padding = 0.1, min, max, includeZero = false } = options

  // 모든 유효한 값 추출
  const values: number[] = []
  data.series.forEach(series => {
    series.points.forEach(point => {
      if (!isNaN(point.y)) {
        values.push(point.y)
      }
    })
  })

  if (values.length === 0) {
    return [0, 100]
  }

  let dataMin = Math.min(...values)
  let dataMax = Math.max(...values)

  // 0 포함 옵션
  if (includeZero) {
    dataMin = Math.min(0, dataMin)
    dataMax = Math.max(0, dataMax)
  }

  // 고정값이 있으면 사용
  const finalMin = min !== undefined ? min : dataMin
  const finalMax = max !== undefined ? max : dataMax

  // 패딩 적용
  const range = finalMax - finalMin
  const paddingAmount = range * padding

  return [finalMin - paddingAmount, finalMax + paddingAmount]
}
