'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

interface MetricSelectorProps {
  initialMetric?: 'powerScore' | 'totalWar'
}

export default function MetricSelector({
  initialMetric = 'powerScore',
}: MetricSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isInitialMount = useRef(true)

  const [metric, setMetric] = useState<'powerScore' | 'totalWar'>(initialMetric)

  // initialMetric이 변경될 때 state 동기화
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    setMetric(initialMetric)
  }, [initialMetric])

  // URL search params 동기화 (실제 변경이 있을 때만)
  useEffect(() => {
    if (isInitialMount.current) {
      return
    }

    const params = new URLSearchParams()
    const currentMetric = searchParams.get('metric')

    if (metric !== 'powerScore') {
      params.set('metric', metric)
    }

    // 현재 URL과 비교하여 실제로 변경이 있을 때만 호출
    const newUrlParams = params.toString()
    const currentUrlParams = currentMetric ? `metric=${currentMetric}` : ''

    if (currentUrlParams !== newUrlParams) {
      const newUrl = newUrlParams ? `/snapshot?${newUrlParams}` : '/snapshot'
      router.replace(newUrl, { scroll: false })
    }
  }, [metric, router, searchParams])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        지표 선택
      </label>
      <select
        value={metric}
        onChange={e => setMetric(e.target.value as 'powerScore' | 'totalWar')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="powerScore">Power Score</option>
        <option value="totalWar">Total WAR</option>
      </select>
    </div>
  )
}
