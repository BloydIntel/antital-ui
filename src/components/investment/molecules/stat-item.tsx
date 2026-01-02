"use client"

import React from 'react'

interface StatItemProps {
  label: string
  value: string | number
  variant?: 'normal' | 'bold'
}

export function StatItem({ label, value, variant = 'normal' }: StatItemProps) {
  return (
    <div className="flex flex-col items-start gap-1 flex-1">
      {/* Label - DM Sans 400, 14px/17px, #757575 from Figma */}
      <div
        className="text-[#757575] w-full"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '17px',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </div>

      {/* Value - varies by variant */}
      <div
        className="text-[#212121] w-full"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: variant === 'bold' ? 600 : 500,
          fontSize: variant === 'bold' ? '14px' : '16px',
          lineHeight: variant === 'bold' ? '17px' : '21px',
        }}
      >
        {value}
      </div>
    </div>
  )
}

