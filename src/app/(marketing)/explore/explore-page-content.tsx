"use client"

import React from 'react'
import { HeroSection } from '@/components/explore/organisms/hero-section'
import { InvestmentOpportunities } from '@/components/landing/organisms/investment-opportunities'
import { CTASection } from '@/components/explore/organisms/cta-section'

export function ExplorePageContent() {
  return (
    <div className="w-full relative">
      <HeroSection />
      {/* Show all 12 investments on explore page */}
      <InvestmentOpportunities />
      <CTASection />
    </div>
  )
}

