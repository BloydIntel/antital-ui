"use client"

import React from 'react'
import { Hero } from '@/components/landing/organisms/hero'
import { Statistics } from '@/components/landing/organisms/statistics'
import { InvestmentOpportunities } from '@/components/landing/organisms/investment-opportunities'
import { HowItWorks } from '@/components/landing/organisms/how-it-works'
import { NewLaunches } from '@/components/landing/organisms/new-launches'
import { SecondaryMarket } from '@/components/landing/organisms/secondary-market'
import { KnowledgeBase } from '@/components/landing/organisms/knowledge-base'
import { Testimonials } from '@/components/landing/organisms/testimonials'
import { FAQ } from '@/components/landing/organisms/faq'
import { RaiseCapital } from '@/components/landing/organisms/raise-capital'

export function LandingPageContent() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Statistics Section */}
      <Statistics />

      {/* Investment Opportunities Section - Show first 6 only */}
      <InvestmentOpportunities limit={6} />

      {/* How It Works Section */}
      <HowItWorks />

      {/* New Launches Section */}
      <NewLaunches />

      {/* Secondary Market Section */}
      <SecondaryMarket />

      {/* Knowledge Base Section */}
      <KnowledgeBase />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Raise Capital Section */}
      <RaiseCapital />
    </>
  )
}
