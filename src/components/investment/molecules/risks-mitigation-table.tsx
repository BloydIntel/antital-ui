import React from 'react'

interface RiskItem {
  category: string
  riskDescription: string
  mitigationDescription: string
}

export function RisksMitigationTable() {
  const risks: RiskItem[] = [
    {
      category: 'Market Risk',
      riskDescription: 'Larger competitors (e.g., SAP, Oracle) could develop or acquire similar AI capabilities and target our SME market segment.',
      mitigationDescription: 'We focus on an underserved market, maintain a high-speed development cycle (one major feature release per quarter), and build a defensible IP portfolio through patent filings.',
    },
    {
      category: 'Technology Risk',
      riskDescription: 'The accuracy of the Quantum-Sync Engine relies on the uninterrupted integrity of external real-time data feeds.',
      mitigationDescription: 'We have diversified our data ingestion pipeline (no single point of failure) and maintain a proprietary, redundant Data Lake for real-time data cleansing and backup.',
    },
    {
      category: 'Regulatory Risk',
      riskDescription: 'New international data privacy laws (e.g., cross-border transfer) could necessitate costly re-engineering of the platform.',
      mitigationDescription: 'We maintain a compliance-first architecture with modular data handling, allowing us to adapt to new regulations without full platform re-engineering. We also engage with legal experts to stay ahead of regulatory changes.',
    },
  ]

  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: '816px' }}>
      <table
        className="w-full"
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            <th
              className="text-left py-3 px-4 text-muted-foreground"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              Risk Category
            </th>
            <th
              className="text-left py-3 px-4 text-muted-foreground"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              Description
            </th>
            <th
              className="text-left py-3 px-4 text-muted-foreground"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              Mitigation
            </th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index < risks.length - 1 ? '1px solid #EAEAEA' : 'none',
              }}
            >
              <td
                className="py-3 px-4 text-foreground"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  verticalAlign: 'top',
                }}
              >
                {risk.category}
              </td>
              <td
                className="py-3 px-4 text-foreground"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  verticalAlign: 'top',
                }}
              >
                {risk.riskDescription}
              </td>
              <td
                className="py-3 px-4 text-foreground"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  verticalAlign: 'top',
                }}
              >
                {risk.mitigationDescription}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

