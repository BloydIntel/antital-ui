import React from 'react'

interface HighlightCardProps {
  amount: string
  description: string
  icon?: string
}

export function HighlightCard({ amount, description, icon }: HighlightCardProps) {
  return (
    <div
      className="relative flex flex-row items-center px-4 py-8 bg-[#F3ECFF] rounded"
      style={{
        width: '296px',
        height: '113px',
        isolation: 'isolate',
      }}
    >
      {/* Background Icon/Decoration - placeholder for decorative icon */}
      {icon && (
        <div
          className="absolute left-4"
          style={{
            width: '128px',
            height: '128px',
            top: 'calc(50% - 64px)',
            opacity: 0.56,
            zIndex: 0,
          }}
        >
          {/* Icon would be rendered here if provided */}
        </div>
      )}

      {/* Revenue Info */}
      <div
        className="flex flex-col items-start relative z-10"
        style={{
          width: '238px',
          gap: '8px',
        }}
      >
        {/* Revenue Amount */}
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 700,
            fontSize: '20px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: '#2C2C2C',
          }}
        >
          {amount}
        </span>

        {/* Revenue Description */}
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
            color: '#858585',
          }}
        >
          {description}
        </span>
      </div>
    </div>
  )
}

