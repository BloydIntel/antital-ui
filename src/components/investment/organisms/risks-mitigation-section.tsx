import React from 'react'
import { RisksMitigationTable } from '@/components/investment/molecules/risks-mitigation-table'

export function RisksMitigationSection() {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '24px',
      }}
    >
      {/* Section Heading */}
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
        Risks & Mitigation (Full Disclosure)
      </h2>

      {/* Introductory Paragraph */}
      <p
        className="w-full text-muted-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
        }}
      >
        We maintain transparency with our investors by detailing potential risks and our strategies to manage them.
      </p>

      {/* Risks & Mitigation Table */}
      <RisksMitigationTable />
    </div>
  )
}

