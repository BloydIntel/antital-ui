import React from 'react'
import type { UseOfProceedsItem } from '@/types/investment'

interface UseOfProceedsProps {
  items: UseOfProceedsItem[]
  intro?: string | null
}

export function UseOfProceeds({ items, intro }: UseOfProceedsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col items-start w-full" style={{ maxWidth: '816px', gap: '16px' }}>
      <h3
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '34px',
          letterSpacing: '-0.01em',
        }}
      >
        Use of Proceeds
      </h3>

      {intro && (
        <p className="w-full text-muted-foreground font-dm-sans text-base mb-2">{intro}</p>
      )}

      <ul className="flex flex-col items-start w-full gap-3 list-none p-0">
        {items.map((item) => (
          <li key={item.id} className="w-full pl-6 relative">
            <span className="absolute left-0 text-foreground font-dm-sans font-medium">•</span>
            <span className="text-foreground font-dm-sans font-medium">
              {item.allocationPercent != null ? `${item.allocationPercent}%` : ''} ({item.category}):
            </span>
            <span className="text-muted-foreground font-dm-sans"> {item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
