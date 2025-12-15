'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface YearSelectorProps {
  availableYears: number[]
  initialYear?: number
}

export default function YearSelector({
  availableYears,
  initialYear,
}: YearSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

  const [year, setYear] = useState<number>(
    initialYear || availableYears[availableYears.length - 1]
  )

  // initialYear이 변경될 때 state 동기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (initialYear !== undefined) {
      setYear(initialYear)
    }
  }, [initialYear])

  // URL search params 동기화 (실제 변경이 있을 때만)
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }

    const params = new URLSearchParams()
    const currentYear = searchParams.get('year')
    const defaultYear = availableYears[availableYears.length - 1]

    if (year !== defaultYear) {
      params.set('year', year.toString())
    }

    // 현재 URL과 비교하여 실제로 변경이 있을 때만 호출
    const newUrlParams = params.toString()
    const currentUrlParams = currentYear ? `year=${currentYear}` : ''

    if (currentUrlParams !== newUrlParams) {
      const newUrl = newUrlParams ? `/?${newUrlParams}` : '/'
      router.replace(newUrl, { scroll: false })
    }
  }, [year, router, availableYears, searchParams])

  // 최근 10년만 표시
  const recentYears = availableYears.slice(-10).reverse()

  return (
    <div className="card-sporty animate-fade-in">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        기준 연도 선택
      </label>

      <div className="space-y-3">
        {/* 연도 선택 드롭다운 */}
        <div>
          <select
            value={year}
            onChange={e => setYear(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          >
            {availableYears.map(y => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
        </div>

        {/* 빠른 선택 버튼 (최근 10년) */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            빠른 선택:
          </p>
          <div className="flex flex-wrap gap-2">
            {recentYears.map(y => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setYear(y)
                }}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                  year === y
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {y}년
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        선택한 연도에 존재하는 팀만 차트에 표시됩니다 ({availableYears[0]}년 ~{' '}
        {availableYears[availableYears.length - 1]}년)
      </p>
    </div>
  )
}
