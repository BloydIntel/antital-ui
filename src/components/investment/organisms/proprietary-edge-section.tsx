import React from 'react'
import { FeaturePoint } from '@/components/investment/molecules/feature-point'

interface NarrativeSectionProps {
  title: string
  summary: string
  items: { label: string; description: string }[]
}

export function ProprietaryEdgeSection({ title, summary, items }: NarrativeSectionProps) {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{ maxWidth: '816px', gap: '24px', marginTop: '64px' }}
    >
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
        {title}
      </h2>

      <p
        className="w-full text-muted-foreground"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          maxWidth: '816px',
        }}
      >
        {summary}
      </p>

      {items.length > 0 && (
        <div className="flex flex-col items-start w-full" style={{ maxWidth: '816px', gap: '24px' }}>
          {items.map((feature, index) => (
            <FeaturePoint key={index} label={feature.label} description={feature.description} />
          ))}
        </div>
      )}
    </div>
  )
}
