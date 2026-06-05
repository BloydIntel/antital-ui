"use client"

import React from 'react'
import { HeroSection } from '@/components/explore/organisms/hero-section'
import { InvestmentInfiniteGrid } from '@/components/explore/organisms/investment-infinite-grid'
import { CTASection } from '@/components/explore/organisms/cta-section'

export function ExplorePageContent() {
  return (
    <div className="w-full relative">
      <HeroSection />
      <InvestmentInfiniteGrid />
      <CTASection />
    </div>
  )
}

