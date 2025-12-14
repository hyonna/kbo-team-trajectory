'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface YearSelectorProps {
  availableYears: number[]
  initialYear?: number
}

export default function YearSelector({
  availableYears,
  initialYear,
}: YearSelectorProps) {
  const router = useRouter()
  const [year, setYear] = useState<number>(
    initialYear || availableYears[availableYears.length - 1]
  )

  // URL search params 동기화
  useEffect(() => {
    const params = new URLSearchParams()
    if (year !== availableYears[availableYears.length - 1]) {
      params.set('year', year.toString())
    }

    const newUrl = params.toString()
      ? `/snapshot?${params.toString()}`
      : '/snapshot'
    router.replace(newUrl, { scroll: false })
  }, [year, router, availableYears])

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
