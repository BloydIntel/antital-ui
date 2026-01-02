"use client"

import React from 'react'

type RiskLevel = 'low' | 'moderate' | 'high'

interface RiskBadgeProps {
  risk: RiskLevel
}

// Risk badge styles from Figma (risk.css)
const riskStyles: Record<RiskLevel, { bg: string; label: string }> = {
  low: {
    bg: '#377E36',
    label: 'Low risk',
  },
  moderate: {
    bg: '#DCA73B',
    label: 'Moderate Risk',
  },
  high: {
    bg: '#D4001A',
    label: 'High Risk',
  },
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const { bg, label } = riskStyles[risk]

  return (
    <div
      className="absolute top-2 right-2 flex items-center justify-center rounded px-3 py-1.5"
      style={{
        backgroundColor: bg,
      }}
    >
      <span
        className="text-[#F6FBEF] whitespace-nowrap"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '16px',
        }}
      >
        {label}
      </span>
    </div>
  )
}

