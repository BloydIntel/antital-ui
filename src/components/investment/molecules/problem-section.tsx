import React from 'react'

interface ProblemSectionProps {
  title: string
  description: string
}

export function ProblemSection({ title, description }: ProblemSectionProps) {
  return (
    <div
      className="flex flex-col items-start gap-4 mt-4"
      style={{
        width: '100%',
        maxWidth: '1128px',
      }}
    >
      {/* Heading */}
      <h2
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '24px',
          lineHeight: '29px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>

      {/* Description */}
      <p
        className="text-muted-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '23px',
          letterSpacing: '-0.01em',
        }}
      >
        {description}
      </p>
    </div>
  )
}

