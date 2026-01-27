"use client"

import React from 'react'

// Statistics data - makes it easy to update values
const statisticsData = [
  {
    amount: '₦200M',
    description: 'raised in startup capital',
  },
  {
    amount: '₦200M',
    description: 'raised in startup capital',
  },
  {
    amount: '₦200M',
    description: 'raised in startup capital',
  },
]

export function Statistics() {
  return (
    <section className="w-full bg-background">
      {/* Statistics Container - padding: 48px 0px from Figma */}
      <div className="w-full max-w-[1440px] mx-auto px-4 py-12">
        {/* Stats Grid - gap: 104px from Figma */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-[104px]">
          {statisticsData.map((stat, index) => (
            <StatCard
              key={index}
              amount={stat.amount}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Reusable StatCard component - DRY principle
function StatCard({ amount, description }: { amount: string; description: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Amount - Rethink Sans, 500 weight, 48px from Figma */}
      <div
        className="text-foreground text-center"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '48px',
          lineHeight: '58px', // 120% from Figma
          letterSpacing: '-0.01em',
        }}
      >
        {amount}
      </div>

      {/* Description - DM Sans, 400 weight, 16px from Figma */}
      <div
        className="text-muted-foreground text-center"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px', // 130% from Figma
          letterSpacing: '0.01em',
        }}
      >
        {description}
      </div>
    </div>
  )
}
