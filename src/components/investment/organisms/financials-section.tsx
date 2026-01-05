import React from 'react'
import { FinancialMetricsTable } from '@/components/investment/molecules/financial-metrics-table'
import { UseOfProceeds } from '@/components/investment/molecules/use-of-proceeds'

export function FinancialsSection() {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '48px',
      }}
    >
      {/* Section Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        Financials
      </h2>

      {/* Financial Metrics Table */}
      <FinancialMetricsTable />

      {/* Use of Proceeds */}
      <UseOfProceeds />
    </div>
  )
}

