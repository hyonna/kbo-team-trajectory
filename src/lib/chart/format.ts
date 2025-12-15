import type { MetricKey } from './types'

/**
 * 숫자 포맷 옵션
 */
export interface FormatOptions {
  decimals?: number // 소수점 자릿수
  thousandSeparator?: boolean // 천 단위 구분자
  unit?: string // 단위 (예: '위', '%', '점')
}

/**
 * 숫자를 포맷된 문자열로 변환
 */
export function formatNumber(
  value: number,
  options: FormatOptions = {}
): string {
  const { decimals = 2, thousandSeparator = false, unit = '' } = options

  // 결측/NaN 안전 처리
  if (value === null || value === undefined || Number.isNaN(value)) {
    return '-'
  }

  let formatted = value.toFixed(decimals)

  // 천 단위 구분자
  if (thousandSeparator) {
    const parts = formatted.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    formatted = parts.join('.')
  }

  // 불필요한 소수점 제거
  if (decimals === 0) {
    formatted = formatted.replace(/\.0+$/, '')
  } else {
    formatted = formatted.replace(/\.?0+$/, '')
  }

  return unit ? `${formatted}${unit}` : formatted
}

/**
 * 메트릭별 기본 포맷 옵션
 */
export function getMetricFormat(metric: MetricKey): FormatOptions {
  switch (metric) {
    case 'powerRank':
      return { decimals: 0, unit: '위' }
    case 'powerScore':
    case 'totalWar':
    case 'batting.war':
    case 'pitching.war':
      return { decimals: 2 }
    case 'batting.ops':
      return { decimals: 3 }
    case 'batting.wrcPlus':
      return { decimals: 1 }
    case 'pitching.era':
    case 'pitching.fip':
    case 'pitching.whip':
      return { decimals: 2 }
    case 'pitching.ip':
      return { decimals: 1, thousandSeparator: true }
    default:
      return { decimals: 2 }
  }
}

/**
 * 연도 포맷
 */
export function formatYear(year: number): string {
  return year.toString()
}
