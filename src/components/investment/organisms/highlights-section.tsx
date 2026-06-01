import React from 'react'
import { HighlightCard } from '@/components/investment/molecules/highlight-card'
import { HighlightItem } from '@/components/investment/molecules/highlight-item'

interface HighlightStat {
  amount: string
  description: string
}

interface HighlightBullet {
  number: number
  text: string
}

interface HighlightsSectionProps {
  statCards: HighlightStat[]
  bulletItems: HighlightBullet[]
}

export function HighlightsSection({ statCards, bulletItems }: HighlightsSectionProps) {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{ maxWidth: '816px' }}
    >
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

      {statCards.length > 0 && (
        <div
          className="flex flex-row flex-wrap items-center w-full"
          style={{
            maxWidth: '608px',
            minHeight: '113px',
            gap: '16px',
            marginBottom: '50px',
          }}
        >
          {statCards.map((card, index) => (
            <HighlightCard
              key={index}
              amount={card.amount}
              description={card.description}
            />
          ))}
        </div>
      )}

      {bulletItems.length > 0 && (
        <div
          className="flex flex-col items-start w-full"
          style={{ maxWidth: '816px', gap: '24px', marginTop: '50px' }}
        >
          {bulletItems.map((item) => (
            <HighlightItem key={item.number} number={item.number} text={item.text} />
          ))}
        </div>
      )}
    </div>
  )
}
