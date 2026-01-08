import React from 'react'

export function TLDRSection() {
  // Hardcoded data for now
  const heading = 'TL;DR'
  const summary = 'NEXUS AI is dedicated to transforming supply chain operations for SMEs through advanced AI solutions, significantly improving efficiency and greatly minimizing waste across the board. Our cutting-edge technology offers unparalleled optimization, ensuring sustainable and cost-effective practices for businesses of all sizes, while also enhancing overall productivity and streamlining complex logistical challenges with ease.'

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '24px',
      }}
    >
      {/* Heading */}
      <h2
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
        }}
      >
        {heading}
      </h2>

      {/* Summary Paragraph */}
      <p
        className="w-full text-muted-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          maxWidth: '816px',
        }}
      >
        {summary}
      </p>
    </div>
  )
}

