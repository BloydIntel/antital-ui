"use client"

import React from 'react'
import { Navbar } from '@/app/landing/components/navbar'
import { Footer } from '@/app/landing/components/footer'
import { HeroSection } from '@/components/explore/organisms/hero-section'
import { InvestmentOpportunities } from '@/app/landing/components/investment-opportunities'
import { CTASection } from '@/components/explore/organisms/cta-section'

export function ExplorePageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full relative">
        <HeroSection />
        {/* Show all 12 investments on explore page */}
        <InvestmentOpportunities />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

