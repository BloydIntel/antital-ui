'use client'

import React, { useState } from 'react'
import { Navbar } from '@/app/landing/components/navbar'
import { Footer } from '@/app/landing/components/footer'
import { InvestmentCardData } from '@/components/investment/organisms/investment-card'
import { VideoSection } from '@/components/investment/organisms/video-section'
import { InvestmentPanel } from '@/components/investment/organisms/investment-panel'
import { DealTermsSection } from '@/components/investment/organisms/deal-terms-section'
import { DaysLeftBadge } from '@/components/investment/molecules/days-left-badge'
import { ProblemSection } from '@/components/investment/molecules/problem-section'
import { NavigationTabs } from '@/components/investment/molecules/navigation-tabs'
import { HighlightsSection } from '@/components/investment/organisms/highlights-section'
import { ProprietaryEdgeSection } from '@/components/investment/organisms/proprietary-edge-section'
import { ImagePlaceholder } from '@/components/investment/molecules/image-placeholder'
import { MarketTractionSection } from '@/components/investment/organisms/market-traction-section'
import { TLDRSection } from '@/components/investment/organisms/tldr-section'
import { ActionButton } from '@/components/investment/molecules/action-button'
import { TeamSection } from '@/components/investment/organisms/team-section'
import { FinancialsSection } from '@/components/investment/organisms/financials-section'
import { RisksMitigationSection } from '@/components/investment/organisms/risks-mitigation-section'
import { DocumentsSection } from '@/components/investment/organisms/documents-section'
import { UpdatesSection } from '@/components/investment/organisms/updates-section'
import { AskQuestionSection } from '@/components/investment/organisms/ask-question-section'

interface InvestmentDetailPageContentProps {
  investment: InvestmentCardData
}

export function InvestmentDetailPageContent({ investment: _investment }: InvestmentDetailPageContentProps) {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Hardcoded data for now - will refactor later
  const daysLeft = 14
  const problemTitle = 'The Problem We Solve: Addressing Market Inefficiency'
  const problemDescription = 'Current small and medium-sized enterprises (SMEs) struggle with a complex, fragmented supply chain management system, leading to an average 15% loss in operational efficiency and increased waste. Existing solutions are often too expensive for smaller players or lack the necessary AI-driven predictive capabilities. NEXUS AI is changing this. We provide an accessible, cloud-based platform that uses proprietary machine learning models to forecast inventory needs and optimize logistics routes with 98.5% accuracy, a significant leap over the industry standard of 85%.'

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-8 lg:py-16">
          {/* First Section - Days Left Badge and Problem Section */}
          <section className="relative w-full">
            <DaysLeftBadge daysLeft={daysLeft} />
            <ProblemSection title={problemTitle} description={problemDescription} />
          </section>

          {/* Two Column Section - Video and Investment Panel */}
          <section className="w-full mt-16">
            <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
              {/* Left Column */}
              <div className="flex flex-col w-full lg:w-auto" style={{ maxWidth: '816px' }}>
                <VideoSection />
                
                {/* Left Side Content Below Video */}
                <div className="flex flex-col gap-12 w-full mt-16">
                  {/* Main Heading - Company Name */}
                  <h1
                    style={{
                      fontFamily: 'var(--font-rethink-sans)',
                      fontWeight: 700,
                      fontSize: '48px',
                      lineHeight: '58px',
                      letterSpacing: '-0.01em',
                      color: '#042E27',
                    }}
                  >
                    NEXUS AI
                  </h1>

                  {/* Navigation Tabs */}
                  <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

                  {/* Tab Content - Overview */}
                  {activeTab === 'overview' && (
                    <>
                      {/* Highlights Section */}
                      <HighlightsSection />

                      {/* Proprietary Edge Section */}
                      <ProprietaryEdgeSection />

                      {/* Image Placeholders */}
                      <div className="flex flex-col gap-4 w-full" style={{ maxWidth: '816px' }}>
                        <ImagePlaceholder width="816px" height="352px" />
                        <ImagePlaceholder width="816px" height="352px" />
                      </div>

                      {/* Strong Market Traction & Financials Section */}
                      <MarketTractionSection />
                    </>
                  )}

                  {/* Tab Content - Details */}
                  {activeTab === 'details' && (
                    <>
                      <TeamSection />
                      <div style={{ marginTop: '64px' }}>
                        <FinancialsSection />
                      </div>
                      <div style={{ marginTop: '64px' }}>
                        <RisksMitigationSection />
                      </div>
                      <div style={{ marginTop: '64px' }}>
                        <DocumentsSection />
                      </div>
                    </>
                  )}

                  {/* Tab Content - Updates */}
                  {activeTab === 'updates' && (
                    <>
                      <UpdatesSection />
                    </>
                  )}

                  {/* Tab Content - Testimonials */}
                  {activeTab === 'testimonials' && (
                    <>
                      {/* Testimonials content will go here - placeholder for now */}
                    </>
                  )}

                  {/* Tab Content - Questions */}
                  {activeTab === 'questions' && (
                    <>
                      <AskQuestionSection />
                    </>
                  )}

                  {/* TL;DR Section - visible for Overview and Details tabs only */}
                  {(activeTab === 'overview' || activeTab === 'details') && (
                    <TLDRSection />
                  )}

                  {/* Start Trading Button - not shown for Questions tab */}
                  {activeTab !== 'questions' && (
                    <div className="w-full" style={{ maxWidth: '816px', marginTop: '32px' }}>
                      <ActionButton
                        text="Start trading"
                        variant="primary"
                        width="100%"
                        height="48px"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col items-start w-full lg:w-auto lg:sticky lg:top-8 lg:self-start">
                {/* Investment Panel */}
                <InvestmentPanel />
                
                {/* Divider Line */}
                <div
                  className="w-full border-t border-[#EAEAEA] mt-8"
                  style={{
                    width: '400px',
                  }}
                />

                {/* Deal Terms Section */}
                <div className="mt-8">
                  <DealTermsSection />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

