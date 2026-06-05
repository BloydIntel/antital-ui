import React from 'react'
import type { FinancialMetric } from '@/types/investment'
import { buildFinancialTable } from '@/lib/investment-mappers'

interface FinancialMetricsTableProps {
  metrics: FinancialMetric[]
}

export function FinancialMetricsTable({ metrics }: FinancialMetricsTableProps) {
  const { periods, rows } = buildFinancialTable(metrics)

  if (periods.length === 0) {
    return null
  }

  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: '816px' }}>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
            <th className="text-left py-3 px-4 text-muted-foreground font-dm-sans text-sm font-medium">
              Key financial metrics
            </th>
            {periods.map((period) => (
              <th key={period} className="text-left py-3 px-4 text-muted-foreground font-dm-sans text-sm font-medium">
                {period}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.metric}
              style={{ borderBottom: index < rows.length - 1 ? '1px solid #EAEAEA' : 'none' }}
            >
              <td className="py-3 px-4 text-foreground font-dm-sans text-base">{row.metric}</td>
              {row.values.map((value, valueIndex) => (
                <td key={valueIndex} className="py-3 px-4 text-foreground font-dm-sans text-base">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
