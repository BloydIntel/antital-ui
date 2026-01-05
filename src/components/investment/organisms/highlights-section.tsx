import React from 'react'
import { HighlightCard } from '@/components/investment/molecules/highlight-card'
import { HighlightItem } from '@/components/investment/molecules/highlight-item'

export function HighlightsSection() {
  // Hardcoded data for now
  const highlightCards = [
    {
      amount: '+₦1M Revenue',
      description: 'Earned over the past 12 months',
    },
    {
      amount: '+₦1M Revenue',
      description: 'Earned over the past 12 months',
    },
  ]

  const highlightItems = [
    { number: 1, text: 'Lifetime revenue of ₦1M Revenue' },
    { number: 2, text: 'Monthly revenue of ₦200K Revenue' },
    { number: 3, text: 'Annual growth rate of 15%' },
    { number: 4, text: 'Customer acquisition cost of ₦50K' },
    { number: 5, text: 'Projected revenue for next quarter ₦300K Revenue' },
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
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
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

