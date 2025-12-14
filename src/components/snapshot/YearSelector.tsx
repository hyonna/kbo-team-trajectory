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
      const newUrl = newUrlParams ? `/snapshot?${newUrlParams}` : '/snapshot'
      router.replace(newUrl, { scroll: false })
    }
  }, [year, router, availableYears, searchParams])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        연도 선택
      </label>
      <select
        value={year}
        onChange={e => setYear(Number(e.target.value))}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {availableYears.map(y => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}
