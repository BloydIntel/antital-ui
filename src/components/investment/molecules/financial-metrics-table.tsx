import React from 'react'

interface FinancialMetric {
  metric: string
  fy2024: string
  fy2025: string
  fy2027: string
}

export function FinancialMetricsTable() {
  const metrics: FinancialMetric[] = [
    {
      metric: 'Annual Recurring Revenue (ARR)',
      fy2024: '$450,000',
      fy2025: '$1,500,000',
      fy2027: '$10,500,000',
    },
    {
      metric: 'Gross Margin (%)',
      fy2024: '78%',
      fy2025: '82%',
      fy2027: '86%',
    },
    {
      metric: 'Customer Acquisition Cost (CAC)',
      fy2024: '$3,000',
      fy2025: '$2,500',
      fy2027: '$35,000',
    },
    {
      metric: 'Customer Lifetime Value (LTV)',
      fy2024: '$24,000',
      fy2025: '$28,000',
      fy2027: '$35,000',
    },
    {
      metric: 'LTV:CAC Ratio',
      fy2024: '8:1',
      fy2025: '11.2:1',
      fy2027: '17.5:1',
    },
    {
      metric: 'Cash-Flow Positive Target',
      fy2024: 'N/A',
      fy2025: 'N/A',
      fy2027: 'N/A',
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
              className="text-left py-3 px-4"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
                color: '#858585',
              }}
            >
              Key financial metrics
            </th>
            <th
              className="text-left py-3 px-4"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
                color: '#858585',
              }}
            >
              FY 2024 (Actual)
            </th>
            <th
              className="text-left py-3 px-4"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
                color: '#858585',
              }}
            >
              FY 2025 (Projected)
            </th>
            <th
              className="text-left py-3 px-4"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
                color: '#858585',
              }}
            >
              FY 2027 (Projected)
            </th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index < metrics.length - 1 ? '1px solid #EAEAEA' : 'none',
              }}
            >
              <td
                className="py-3 px-4"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  color: '#2C2C2C',
                }}
              >
                {metric.metric}
              </td>
              <td
                className="py-3 px-4"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  color: '#2C2C2C',
                }}
              >
                {metric.fy2024}
              </td>
              <td
                className="py-3 px-4"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  color: '#2C2C2C',
                }}
              >
                {metric.fy2025}
              </td>
              <td
                className="py-3 px-4"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  color: '#2C2C2C',
                }}
              >
                {metric.fy2027}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

