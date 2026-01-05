import React from 'react'
import { Info } from 'lucide-react'

interface DaysLeftBadgeProps {
  daysLeft: number
}

export function DaysLeftBadge({ daysLeft }: DaysLeftBadgeProps) {
  return (
    <div
      className="flex flex-row items-center gap-2 px-2 py-2 bg-[#E3F2CD] rounded-sm"
      style={{
        width: '125px',
        height: '37px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '21px',
          color: '#526B2F',
          flex: 'none',
        }}
      >
        {daysLeft} days left
      </span>
      <Info
        className="w-4 h-4"
        style={{
          color: '#526B2F',
          flex: 'none',
        }}
      />
    </div>
  )
}

