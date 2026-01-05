import React from 'react'

interface UseOfProceedsItem {
  percentage: string
  category: string
  description: string
}

export function UseOfProceeds() {
  const items: UseOfProceedsItem[] = [
    {
      percentage: '50%',
      category: '(R&D)',
      description: 'Scaling the Engineering Team and accelerating development of V4.0 (Autonomous Bidding Engine).',
    },
    {
      percentage: '30%',
      category: '(Sales & Marketing)',
      description: 'Expanding into two new economic zones (Kenya, South Africa) with dedicated sales hires.',
    },
    {
      percentage: '20%',
      category: '(Operations & Working Capital)',
      description: 'Securing key data feed licenses and general operational expenses.',
    },
  ]

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '16px',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '34px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        Use of Proceeds
      </h3>

      <p
        className="w-full"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          color: '#505050',
          marginBottom: '8px',
        }}
      >
        This section details how the $2.5M being raised in the Seed Plus round will be strategically allocated to achieve product and market acceleration.
      </p>

      <ul
        className="flex flex-col items-start w-full"
        style={{
          gap: '12px',
          listStyle: 'none',
          padding: 0,
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="w-full"
            style={{
              paddingLeft: '24px',
              position: 'relative',
            }}
          >
            {/* Bullet point */}
            <span
              style={{
                position: 'absolute',
                left: '0',
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '21px',
                letterSpacing: '0.01em',
                color: '#2C2C2C',
              }}
            >
              •
            </span>
            {/* Content with label and description */}
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '21px',
                letterSpacing: '0.01em',
                color: '#2C2C2C',
              }}
            >
              {item.percentage} {item.category}:
            </span>
            <span
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '21px',
                letterSpacing: '0.01em',
                color: '#505050',
              }}
            >
              {' '}{item.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

