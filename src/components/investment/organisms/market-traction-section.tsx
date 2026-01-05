import React from 'react'
import { FeaturePoint } from '@/components/investment/molecules/feature-point'

export function MarketTractionSection() {
  // Hardcoded data for now
  const heading = 'Strong Market Traction & Financials'
  const mainDescription = 'NEXUS AI has demonstrated exceptional market traction with consistent revenue growth, strong customer retention, and expanding market presence. Our financial performance reflects a scalable, high-margin business model with clear path to profitability.'
  
  const features = [
    {
      label: 'Revenue Growth',
      description: 'We have achieved 150% year-over-year revenue growth, with ARR increasing from ₦675M in FY 2024 to a projected ₦15.75B by FY 2027. Our customer base has grown from 12 clients in 2023 to 50+ active clients today, with a 95% retention rate.',
    },
    {
      label: 'Market Expansion',
      description: 'We have successfully expanded from serving only Nigerian SMEs to now operating in three West African markets. Our pipeline includes 120+ qualified leads, with conversion rates improving quarter-over-quarter as we refine our sales process and product-market fit.',
    },
  ]

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
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        {heading}
      </h2>

      {/* Main Description */}
      <p
        className="w-full"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          color: '#505050',
          maxWidth: '816px',
        }}
      >
        {mainDescription}
      </p>

      {/* Feature Points */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          maxWidth: '816px',
          gap: '24px',
        }}
      >
        {features.map((feature, index) => (
          <FeaturePoint key={index} label={feature.label} description={feature.description} />
        ))}
      </div>
    </div>
  )
}

