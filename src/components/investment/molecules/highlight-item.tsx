import React from 'react'

interface HighlightItemProps {
  number: number
  text: string
}

export function HighlightItem({ number, text }: HighlightItemProps) {
  return (
    <div
      className="flex flex-row items-center w-full"
      style={{
        maxWidth: '816px',
        minHeight: '40px',
        gap: '16px',
      }}
    >
      {/* Number Badge */}
      <div
        className="flex flex-col justify-center items-center p-2 border border-[#A8A8A8] rounded"
        style={{
          width: '88px',
          height: '40px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '20px',
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            color: '#2A2E0C',
          }}
        >
          {number}
        </span>
      </div>

      {/* Text */}
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        {text}
      </span>
    </div>
  )
}

