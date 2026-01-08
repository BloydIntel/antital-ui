import React from 'react'
import { HighlightCard } from '@/components/investment/molecules/highlight-card'
import { HighlightItem } from '@/components/investment/molecules/highlight-item'

export function HighlightsSection() {
  // Hardcoded data for now
  const highlightCards = [
    {
      amount: '₦675M ARR',
      description: 'Annual Recurring Revenue as of FY 2024',
    },
    {
      amount: '50+ Clients',
      description: 'Active clients across West African markets',
    },
  ]

  const highlightItems = [
    { number: 1, text: 'Lifetime revenue of ₦2.1B across all clients' },
    { number: 2, text: 'Average monthly revenue per client: ₦11.25M' },
    { number: 3, text: 'Annual growth rate of 150% year-over-year' },
    { number: 4, text: 'Customer acquisition cost (CAC) of ₦4.5M' },
    { number: 5, text: 'Projected ARR for FY 2025: ₦2.25B' },
  ]

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
      }}
    >
      {/* Highlights Heading */}
      <h2
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          marginBottom: '50px',
        }}
      >
        Highlights
      </h2>

      {/* Highlight Cards Row */}
      <div
        className="flex flex-row flex-wrap items-center w-full"
        style={{
          maxWidth: '608px',
          minHeight: '113px',
          gap: '16px',
          marginBottom: '50px',
        }}
      >
        {highlightCards.map((card, index) => (
          <HighlightCard
            key={index}
            amount={card.amount}
            description={card.description}
          />
        ))}
      </div>

      {/* Highlight Items List */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          maxWidth: '816px',
          gap: '24px',
          marginTop: '50px'
        }}
      >
        {highlightItems.map((item) => (
          <HighlightItem key={item.number} number={item.number} text={item.text} />
        ))}
      </div>
    </div>
  )
}

