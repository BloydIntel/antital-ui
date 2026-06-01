import React from 'react'
import type { OfferingRisk } from '@/types/investment'

interface RisksMitigationTableProps {
  risks: OfferingRisk[]
}

export function RisksMitigationTable({ risks }: RisksMitigationTableProps) {
  if (risks.length === 0) {
    return null
  }

  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: '816px' }}>
      <table className="w-full" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #EAEAEA' }}>
            <th className="text-left py-3 px-4 text-muted-foreground font-dm-sans text-sm font-medium">Risk Category</th>
            <th className="text-left py-3 px-4 text-muted-foreground font-dm-sans text-sm font-medium">Description</th>
            <th className="text-left py-3 px-4 text-muted-foreground font-dm-sans text-sm font-medium">Mitigation</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk, index) => (
            <tr key={risk.id} style={{ borderBottom: index < risks.length - 1 ? '1px solid #EAEAEA' : 'none' }}>
              <td className="py-3 px-4 text-foreground font-dm-sans text-base align-top">{risk.category}</td>
              <td className="py-3 px-4 text-foreground font-dm-sans text-base align-top">{risk.description}</td>
              <td className="py-3 px-4 text-foreground font-dm-sans text-base align-top">{risk.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
