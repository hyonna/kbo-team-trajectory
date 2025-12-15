'use client'

interface InfoIconProps {
  label: string
  description: string
}

export function InfoIcon({ label, description }: InfoIconProps) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <span className="sr-only">{label}</span>
      <span
        className="relative inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold cursor-help group"
        aria-label={`${label} 설명`}
      >
        ?
        <span className="pointer-events-none absolute left-1/2 top-full z-[9999] mt-2 -translate-x-1/2 whitespace-pre-line rounded-md bg-gray-900 px-3 py-2 text-[11px] text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
          <span className="block max-w-[360px] whitespace-normal leading-snug text-left break-words">
            {description}
          </span>
        </span>
      </span>
    </span>
  )
}
