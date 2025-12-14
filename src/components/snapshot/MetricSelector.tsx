'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface MetricSelectorProps {
  initialMetric?: 'powerScore' | 'totalWar'
}

export default function MetricSelector({
  initialMetric = 'powerScore',
}: MetricSelectorProps) {
  const router = useRouter()
  const [metric, setMetric] = useState<'powerScore' | 'totalWar'>(initialMetric)

  // URL search params 동기화
  useEffect(() => {
    const params = new URLSearchParams()
    if (metric !== 'powerScore') {
      params.set('metric', metric)
    }

    const newUrl = params.toString()
      ? `/snapshot?${params.toString()}`
      : '/snapshot'
    router.replace(newUrl, { scroll: false })
  }, [metric, router])

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
