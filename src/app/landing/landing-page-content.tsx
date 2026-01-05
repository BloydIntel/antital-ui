"use client"

import React from 'react'
import { Navbar } from './components/navbar'
import { Hero } from './components/hero'
import { Statistics } from './components/statistics'
import { InvestmentOpportunities } from './components/investment-opportunities'
import { HowItWorks } from './components/how-it-works'
import { NewLaunches } from './components/new-launches'
import { SecondaryMarket } from './components/secondary-market'
import { KnowledgeBase } from './components/knowledge-base'
import { Testimonials } from './components/testimonials'
import { FAQ } from './components/faq'
import { RaiseCapital } from './components/raise-capital'
import { Footer } from './components/footer'

export function LandingPageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
