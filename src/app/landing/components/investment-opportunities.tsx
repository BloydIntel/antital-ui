"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { InvestmentCard } from '@/components/investment/organisms/investment-card'
import { allInvestmentData } from '@/data/investments'

interface InvestmentOpportunitiesProps {
  limit?: number
}

export function InvestmentOpportunities({ limit }: InvestmentOpportunitiesProps) {
  // Show first 6 on home page, all 12 on explore page
  const displayData = limit ? allInvestmentData.slice(0, limit) : allInvestmentData

  return (
    <section className="w-full bg-background">
      {/* Main Container - padding: 62px 0px, gap: 92px from Figma */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-16 flex flex-col items-center gap-16 lg:gap-[92px]">
        
        {/* Section Header */}
        <div className="flex flex-col items-start gap-14 w-full max-w-[1232px]">
          {/* Section Description */}
          <div className="flex flex-col items-start gap-2 max-w-[821px]">
            {/* Section Title */}
            <h2
              className="text-foreground w-full"
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 4vw, 36px)',
                lineHeight: '43px',
                letterSpacing: '-0.01em',
              }}
            >
              Invest in tomorrow's success stories today
            </h2>

            {/* Section Subtitle */}
            <p
              className="text-muted-foreground w-full"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '23px',
                letterSpacing: '-0.01em',
              }}
            >
              Get early access to carefully verified startups before they become household names. From fintech innovations to agriculture solutions, discover the businesses shaping Nigeria's future.
            </p>
          </div>

          {/* Projects Container */}
          <div className="flex flex-col items-center gap-12 w-full">
            {/* Projects List - 3 cards per row on desktop */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
              {displayData.map((investment) => (
                <InvestmentCard key={investment.id} data={investment} />
              ))}
            </div>

            {/* View All Button - no shadow on hover */}
            <Button
              variant="outline"
              className="bg-background dark:bg-background border-[#A8A8A8] text-foreground hover:!bg-[#A7B832] hover:!text-[#11110F] hover:!border-[#A7B832] dark:hover:!bg-[#A7B832] dark:hover:!text-[#11110F] dark:hover:!border-[#A7B832] h-12 px-4 rounded-lg shadow-none hover:shadow-none transition-all duration-300"
              style={{
                width: '192px',
                fontFamily: 'var(--font-rethink-sans)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '21px',
              }}
            >
              View all
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

