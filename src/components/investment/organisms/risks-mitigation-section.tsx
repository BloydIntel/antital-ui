import React from 'react'
import type { OfferingRisk } from '@/types/investment'
import { RisksMitigationTable } from '@/components/investment/molecules/risks-mitigation-table'

interface RisksMitigationSectionProps {
  risks: OfferingRisk[]
}

export function RisksMitigationSection({ risks }: RisksMitigationSectionProps) {
  return (
    <div className="flex flex-col items-start w-full" style={{ maxWidth: '816px', gap: '24px' }}>
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

      <p className="w-full text-muted-foreground font-dm-sans text-base">
        We maintain transparency with our investors by detailing potential risks and our strategies to manage them.
      </p>

      <RisksMitigationTable risks={risks} />
    </div>
  )
}
