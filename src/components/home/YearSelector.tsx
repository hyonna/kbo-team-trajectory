'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Toast from '@/components/ui/Toast'

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
  const [inputValue, setInputValue] = useState<string>(
    (initialYear || availableYears[availableYears.length - 1]).toString()
  )
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // initialYear이 변경될 때 state 동기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (initialYear !== undefined) {
      setYear(initialYear)
      setInputValue(initialYear.toString())
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    const numValue = Number(value)
    if (
      !isNaN(numValue) &&
      numValue >= availableYears[0] &&
      numValue <= availableYears[availableYears.length - 1] &&
      availableYears.includes(numValue)
    ) {
      setYear(numValue)
    }
  }

  const handleInputBlur = () => {
    const numValue = Number(inputValue)

    // 빈 값이면 현재 연도로 복원
    if (inputValue === '' || isNaN(numValue)) {
      setInputValue(year.toString())
      return
    }

    // 범위 밖의 연도인 경우
    if (
      numValue < availableYears[0] ||
      numValue > availableYears[availableYears.length - 1]
    ) {
      setInputValue(year.toString())
      setToastMessage(
        `${availableYears[0]}년 ~ ${availableYears[availableYears.length - 1]}년 사이의 연도를 입력해주세요.`
      )
      setShowToast(true)
      return
    }

    // 범위 안이지만 데이터가 없는 연도인 경우
    if (!availableYears.includes(numValue)) {
      setInputValue(year.toString())
      setToastMessage(`${numValue}년에 대한 데이터가 존재하지 않습니다.`)
      setShowToast(true)
      return
    }

    // 유효한 연도인 경우
    setYear(numValue)
  }

  // 최근 10년만 표시
  const recentYears = availableYears.slice(-10).reverse()

  return (
    <div className="card-sporty animate-fade-in">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
        기준 연도 선택
      </label>

      <div className="space-y-3">
        {/* 연도 입력 필드 */}
        <div>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            min={availableYears[0]}
            max={availableYears[availableYears.length - 1]}
            placeholder="연도 입력 (예: 2025)"
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
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
                  setInputValue(y.toString())
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

      {showToast && (
        <Toast
          message={toastMessage}
          type="error"
          duration={4000}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  )
}
