'use client'

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
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
import { MediaThumbnails } from '@/components/investment/molecules/media-thumbnails'
import { TestimonialsSection } from '@/components/investment/organisms/testimonials-section'

interface InvestmentDetailPageContentProps {
  investment: InvestmentCardData
}

/**
 * Check if an element or its parents are scrollable.
 * Recursively traverses the DOM tree and performs DOM queries (getComputedStyle, scrollHeight, clientHeight)
 * on each element. This is a pure utility function moved outside the component to avoid function
 * recreation on every render, but it is not memoized - it performs fresh DOM queries on every call.
 */
function isScrollableElement(element: Element | null): boolean {
  if (!element || element === document.body || element === document.documentElement) {
    return false
  }
  
  const style = window.getComputedStyle(element)
  const overflowY = style.overflowY
  const hasScrollableContent = element.scrollHeight > element.clientHeight
  
  return (
    (overflowY === 'scroll' || overflowY === 'auto') &&
    hasScrollableContent
  ) || isScrollableElement(element.parentElement)
}

/**
 * Detect if the current device is iOS.
 * This is a static device property that won't change during the session,
 * so it's computed once at module load time.
 */
const IS_IOS = typeof window !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
)

export function InvestmentDetailPageContent({ investment }: InvestmentDetailPageContentProps) {
  // Investment data is available but not currently used - will be used for dynamic content later
  void investment
  const [activeTab, setActiveTab] = useState('overview')
  const [stickyButtonHeight, setStickyButtonHeight] = useState(0)
  const stickyButtonRef = useRef<HTMLDivElement>(null)
  
  // Prevent iOS overscroll bounce (CSS overscroll-behavior doesn't work reliably on iOS Safari)
  // Only apply JavaScript fallback on iOS devices to avoid performance impact on other platforms
  const lastTouchYRef = useRef(0)
  
  useEffect(() => {
    // Skip JavaScript handler on non-iOS devices - rely on CSS overscroll-behavior
    if (!IS_IOS) {
      return
    }
    
    const preventOverscroll = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0]
      if (!touch) return
      
      // Early exit: Don't prevent scroll if user is interacting with a scrollable child element
      const target = e.target as Element
      if (target && isScrollableElement(target)) {
        return
      }
      
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      
      // Early exit if not at boundaries (most common case)
      const threshold = 5
      const isAtTop = scrollTop <= threshold
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold
      
      if (!isAtTop && !isAtBottom) {
        // Not at boundary, allow normal scroll - update lastTouchY and return
        lastTouchYRef.current = touch.clientY
        return
      }
      
      // Only calculate delta if we're at a boundary
      const touchDeltaY = touch.clientY - lastTouchYRef.current
      
      // At top and trying to scroll up - prevent overscroll
      if (isAtTop && touchDeltaY > 0) {
        e.preventDefault()
      }
      // At bottom and trying to scroll down - prevent overscroll
      else if (isAtBottom && touchDeltaY < 0) {
        e.preventDefault()
      }
      
      lastTouchYRef.current = touch.clientY
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        lastTouchYRef.current = e.touches[0].clientY
      }
    }
    
    // Use passive listeners where possible to improve scroll performance
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    // touchmove must be non-passive to allow preventDefault, but we minimize its impact
    document.addEventListener('touchmove', preventOverscroll, { passive: false })
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', preventOverscroll)
    }
  }, [])
  
  // Dynamically calculate sticky button height for mobile padding
  // Use useLayoutEffect to ensure refs are available synchronously after DOM mutations
  useLayoutEffect(() => {
    // Capture ref value at effect execution time for cleanup
    const buttonElement = stickyButtonRef.current
    
    const updateStickyButtonHeight = () => {
      const currentElement = stickyButtonRef.current
      if (currentElement) {
        const height = currentElement.offsetHeight
        setStickyButtonHeight(height)
      } else {
        // Reset height when button is not visible (e.g., on questions tab)
        setStickyButtonHeight(0)
      }
    }

    // Initial measurement - refs are guaranteed to be available in useLayoutEffect
    updateStickyButtonHeight()

    // Update on window resize
    window.addEventListener('resize', updateStickyButtonHeight)
    
    // Use ResizeObserver for more accurate measurements when element is available
    let resizeObserver: ResizeObserver | null = null
    let observedElement: Element | null = null
    
    if (typeof ResizeObserver !== 'undefined' && buttonElement) {
      // Ref is available synchronously in useLayoutEffect, so we can set up observer immediately
      observedElement = buttonElement
      resizeObserver = new ResizeObserver(updateStickyButtonHeight)
      resizeObserver.observe(buttonElement)
    }

    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('resize', updateStickyButtonHeight)
      
      // Clean up ResizeObserver if it was created
      // Use observedElement (captured when observer was created) or buttonElement (captured at effect start)
      const elementToUnobserve = observedElement || buttonElement
      if (resizeObserver && elementToUnobserve) {
        resizeObserver.unobserve(elementToUnobserve)
        resizeObserver.disconnect()
      }
    }
  }, [activeTab]) // Re-measure when tab changes (button visibility changes)
  
  // Hardcoded data for now - will refactor later
  const daysLeft = 14
  const problemTitle = 'The Problem We Solve: Addressing Market Inefficiency'
  const problemDescription = 'Current small and medium-sized enterprises (SMEs) struggle with a complex, fragmented supply chain management system, leading to an average 15% loss in operational efficiency and increased waste. Existing solutions are often too expensive for smaller players or lack the necessary AI-driven predictive capabilities. NEXUS AI is changing this. We provide an accessible, cloud-based platform that uses proprietary machine learning models to forecast inventory needs and optimize logistics routes with 98.5% accuracy, a significant leap over the industry standard of 85%.'

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main 
        className="w-full lg:pb-0"
        style={{
          paddingBottom: stickyButtonHeight > 0 ? `${stickyButtonHeight}px` : '0px',
        }}
      >
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
              <div className="flex flex-col w-full lg:w-auto lg:flex-1" style={{ maxWidth: '816px' }}>
                <VideoSection />
                
                {/* Media Thumbnails and Like/Share */}
                <div className="w-full mt-4">
                  <MediaThumbnails />
                </div>
                
                {/* Left Side Content Below Video */}
                <div className="flex flex-col gap-12 w-full mt-16">
                  {/* Main Heading - Company Name */}
                  <h1
                    className="text-[#042E27] dark:text-[#A7B832]"
                    style={{
                      fontFamily: 'var(--font-rethink-sans)',
                      fontWeight: 700,
                      fontSize: '48px',
                      lineHeight: '58px',
                      letterSpacing: '-0.01em',
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
                      <TestimonialsSection />
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
                    <div className="w-full lg:block hidden" style={{ maxWidth: '816px', marginTop: '32px' }}>
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
              <div className="flex flex-col items-start w-full max-w-full lg:w-auto lg:max-w-[400px] lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start">
                {/* Investment Panel */}
                <InvestmentPanel />
                
                {/* Divider Line */}
                <div
                  className="w-full lg:w-[400px] border-t border-[#EAEAEA] dark:border-[#404040] mt-8"
                />

                {/* Deal Terms Section */}
                <div className="mt-8 w-full">
                  <DealTermsSection />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Start Trading Button - only visible on mobile and not on questions tab */}
      {activeTab !== 'questions' && (
        <div 
          ref={stickyButtonRef}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-[#EAEAEA] p-4 shadow-lg"
        >
          <ActionButton
            text="Start trading"
            variant="primary"
            width="100%"
            height="48px"
          />
        </div>
      )}
    </div>
  )
}

