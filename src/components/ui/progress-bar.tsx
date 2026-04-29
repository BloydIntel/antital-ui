"use client"

import React from 'react'

interface ProgressBarProps {
  value: number // 0-100
  className?: string
  fillColor?: string
}

export function ProgressBar({ value, className = '', fillColor = '#377E36' }: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100)

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        height: '8px',
        backgroundColor: '#E0F0E4', // Light green background from Figma
        borderRadius: '4px',
      }}
    >
      {/* Progress fill */}
      <div
        className="absolute left-0 top-0 h-full transition-all duration-300 ease-in-out"
        style={{
          width: `${clampedValue}%`,
          backgroundColor: fillColor,
          borderRadius: '4px',
        }}
      />
    </div>
  )
}

