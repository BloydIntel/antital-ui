import React from 'react'

interface FeaturePointProps {
  label: string
  description: string
}

export function FeaturePoint({ label, description }: FeaturePointProps) {
  return (
    <div
      className="flex flex-col items-start"
      style={{
        gap: '8px',
      }}
    >
      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          color: '#2C2C2C',
        }}
      >
        {label}
      </span>

      {/* Description */}
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          color: '#858585',
        }}
      >
        {description}
      </span>
    </div>
  )
}

