import React from 'react'
import { FinancialMetricsTable } from '@/components/investment/molecules/financial-metrics-table'
import { UseOfProceeds } from '@/components/investment/molecules/use-of-proceeds'
import type { FinancialMetric, UseOfProceedsItem } from '@/types/investment'

interface FinancialsSectionProps {
  metrics: FinancialMetric[]
  useOfProceeds: UseOfProceedsItem[]
  useOfProceedsIntro?: string | null
}

export function FinancialsSection({ metrics, useOfProceeds, useOfProceedsIntro }: FinancialsSectionProps) {
  return (
    <div className="flex flex-col items-start w-full" style={{ maxWidth: '816px', gap: '48px' }}>
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
        Financials
      </h2>

      <FinancialMetricsTable metrics={metrics} />

      <UseOfProceeds items={useOfProceeds} intro={useOfProceedsIntro} />
    </div>
  )
}
