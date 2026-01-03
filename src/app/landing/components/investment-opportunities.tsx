"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { InvestmentCard, InvestmentCardData } from '@/components/investment/organisms/investment-card'

// Investment opportunities data based on your Figma design
const investmentData: InvestmentCardData[] = [
  {
    id: '1',
    name: 'GreenTech Solutions',
    category: 'Clean Energy',
    description: 'Revolutionary solar panel technology with 40% higher efficiency',
    image: '/investments/ayka_solar.jpg',
    risk: 'low',
    investors: 234,
    daysLeft: 234,
    minInvestment: 1000,
    raised: 450000,
    goal: 1100000,
    percentage: 45,
  },
  {
    id: '2',
    name: 'AgriTech Innovations',
    category: 'Sustainable Farming',
    description: 'High-yield crop technology, increasing production by 35%',
    image: '/investments/agri_tech.jpg',
    risk: 'moderate',
    investors: 567,
    daysLeft: 12,
    minInvestment: 5000,
    raised: 890000,
    goal: 1000000,
    percentage: 89,
  },
  {
    id: '3',
    name: 'Solaris Innovations',
    category: 'Agriculture',
    description: 'Next-gen solar tech: 50% more efficient & weather-resilient',
    image: '/investments/solar_innovations.jpg',
    risk: 'low',
    investors: 876,
    daysLeft: 21,
    minInvestment: 5000,
    raised: 890000,
    goal: 1000000,
    percentage: 89,
  },
  {
    id: '4',
    name: 'AquaPure Innovations',
    category: 'Water Purification',
    description: 'Next-gen filtration systems reducing contaminants by 90%',
    image: '/investments/aqua_pure.jpg',
    risk: 'moderate',
    investors: 150,
    daysLeft: 150,
    minInvestment: 500,
    raised: 300000,
    goal: 500000,
    percentage: 60,
  },
  {
    id: '5',
    name: 'EcoBuild Materials',
    category: 'Sustainable Construction',
    description: 'Biodegradable materials for eco-friendly building solutions',
    image: '/investments/eco_build.jpg',
    risk: 'high',
    investors: 120,
    daysLeft: 120,
    minInvestment: 2000,
    raised: 600000,
    goal: 800000,
    percentage: 75,
  },
  {
    id: '6',
    name: 'SmartWaste Technologies',
    category: 'Waste Management',
    description: 'AI-powered sorting systems for efficient recycling',
    image: '/investments/smart_waste.jpg',
    risk: 'low',
    investors: 90,
    daysLeft: 90,
    minInvestment: 1500,
    raised: 250000,
    goal: 500000,
    percentage: 50,
  },
]

export function InvestmentOpportunities() {
  return (
    <section className="w-full bg-background">
      {/* Main Container - padding: 62px 0px, gap: 92px from Figma */}
      <div className="w-full mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-16 flex flex-col items-center gap-16 lg:gap-[92px]">
        
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
              {investmentData.map((investment) => (
                <InvestmentCard key={investment.id} data={investment} />
              ))}
            </div>

            {/* View All Button - no shadow on hover */}
            <Button
              variant="outline"
              className="bg-background border-[#A8A8A8] text-foreground hover:bg-[#A7B832] hover:text-[#11110F] hover:border-[#A7B832] h-12 px-4 rounded-lg shadow-none hover:shadow-none transition-all duration-300"
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

