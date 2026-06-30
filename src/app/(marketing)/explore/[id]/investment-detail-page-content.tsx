'use client'

import React, { useState, useEffect, useLayoutEffect, useRef, useMemo } from 'react'
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
import type { InvestmentDetailBundle } from '@/types/investment'
import {
  findContentBlockByKey,
  findContentBlockByType,
  getMediaThumbnails,
  getVideoUrl,
  mapBlockItems,
  splitHighlights,
} from '@/lib/investment-mappers'
import { useStartInvestmentCheckout } from '@/hooks/use-start-investment-checkout'

interface InvestmentDetailPageContentProps {
  detail: InvestmentDetailBundle
}

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

const IS_IOS = typeof window !== 'undefined' && (
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
)

export function InvestmentDetailPageContent({ detail }: InvestmentDetailPageContentProps) {
  const { shell, highlights, contentBlocks, team, financials, risks, documents, media, updates, testimonials } = detail
  const { offering, funding, dealTerms, corporateProfile } = shell
  const startCheckout = useStartInvestmentCheckout()

  const handleStartTrading = () => {
    startCheckout({ offeringId: offering.id, slug: offering.slug })
  }

  const { stats: statCards, bullets } = useMemo(() => splitHighlights(highlights), [highlights])

  const problemBlock = useMemo(
    () => findContentBlockByType(contentBlocks, 'ProblemStatement'),
    [contentBlocks]
  )
  const proprietaryEdgeBlock = useMemo(
    () => findContentBlockByKey(contentBlocks, 'proprietary-edge'),
    [contentBlocks]
  )
  const marketTractionBlock = useMemo(
    () => findContentBlockByKey(contentBlocks, 'market-traction'),
    [contentBlocks]
  )
  const tldrBlock = useMemo(
    () => findContentBlockByType(contentBlocks, 'Tldr'),
    [contentBlocks]
  )
  const useOfProceedsIntroBlock = useMemo(
    () => findContentBlockByKey(contentBlocks, 'use-of-proceeds-intro'),
    [contentBlocks]
  )

  const thumbnails = useMemo(() => getMediaThumbnails(media), [media])
  const videoUrl = useMemo(() => getVideoUrl(media), [media])

  const galleryImages = useMemo(
    () =>
      media
        .filter((m) => m.assetType.toLowerCase() === 'image')
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((m) => m.url),
    [media]
  )

  const [activeTab, setActiveTab] = useState('overview')
  const [stickyButtonHeight, setStickyButtonHeight] = useState(0)
  const stickyButtonRef = useRef<HTMLDivElement>(null)
  const lastTouchYRef = useRef(0)

  useEffect(() => {
    if (!IS_IOS) {
      return
    }

    const preventOverscroll = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0]
      if (!touch) return

      const target = e.target as Element
      if (target && isScrollableElement(target)) {
        return
      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight

      const threshold = 5
      const isAtTop = scrollTop <= threshold
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold

      if (!isAtTop && !isAtBottom) {
        lastTouchYRef.current = touch.clientY
        return
      }

      const touchDeltaY = touch.clientY - lastTouchYRef.current

      if (isAtTop && touchDeltaY > 0) {
        e.preventDefault()
      } else if (isAtBottom && touchDeltaY < 0) {
        e.preventDefault()
      }

      lastTouchYRef.current = touch.clientY
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        lastTouchYRef.current = e.touches[0].clientY
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', preventOverscroll, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', preventOverscroll)
    }
  }, [])

  useLayoutEffect(() => {
    const buttonElement = stickyButtonRef.current

    const updateStickyButtonHeight = () => {
      const currentElement = stickyButtonRef.current
      if (currentElement) {
        setStickyButtonHeight(currentElement.offsetHeight)
      } else {
        setStickyButtonHeight(0)
      }
    }

    updateStickyButtonHeight()
    window.addEventListener('resize', updateStickyButtonHeight)

    let resizeObserver: ResizeObserver | null = null
    let observedElement: Element | null = null

    if (typeof ResizeObserver !== 'undefined' && buttonElement) {
      observedElement = buttonElement
      resizeObserver = new ResizeObserver(updateStickyButtonHeight)
      resizeObserver.observe(buttonElement)
    }

    return () => {
      window.removeEventListener('resize', updateStickyButtonHeight)
      const elementToUnobserve = observedElement || buttonElement
      if (resizeObserver && elementToUnobserve) {
        resizeObserver.unobserve(elementToUnobserve)
        resizeObserver.disconnect()
      }
    }
  }, [activeTab])

  const daysLeft = offering.daysLeft ?? 0

  return (
    <div
      className="w-full lg:pb-0"
      style={{
        paddingBottom: stickyButtonHeight > 0 ? `${stickyButtonHeight}px` : '0px',
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-8 lg:py-16">
        <section className="relative w-full">
          {daysLeft > 0 && <DaysLeftBadge daysLeft={daysLeft} />}
          {problemBlock && (
            <ProblemSection
              title={problemBlock.title ?? 'The Problem We Solve'}
              description={problemBlock.summary ?? ''}
            />
          )}
        </section>

        <section className="w-full mt-16">
          <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
            <div className="flex flex-col w-full lg:w-auto lg:flex-1" style={{ maxWidth: '816px' }}>
              <VideoSection videoUrl={videoUrl} coverImageUrl={offering.coverImageUrl} />

              {(thumbnails.length > 0 || offering.coverImageUrl) && (
                <div className="w-full mt-4">
                  <MediaThumbnails
                    thumbnails={
                      thumbnails.length > 0
                        ? thumbnails
                        : [offering.coverImageUrl]
                    }
                  />
                </div>
              )}

              <div className="flex flex-col gap-12 w-full mt-16">
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
                  {offering.name}
                </h1>

                <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

                {activeTab === 'overview' && (
                  <>
                    <HighlightsSection statCards={statCards} bulletItems={bullets} />

                    {proprietaryEdgeBlock && (
                      <ProprietaryEdgeSection
                        title={proprietaryEdgeBlock.title ?? 'Our Proprietary Edge'}
                        summary={proprietaryEdgeBlock.summary ?? ''}
                        items={mapBlockItems(proprietaryEdgeBlock)}
                      />
                    )}

                    {galleryImages.length > 0 && (
                      <div className="flex flex-col gap-4 w-full" style={{ maxWidth: '816px' }}>
                        {galleryImages.map((url) => (
                          <ImagePlaceholder key={url} width="816px" height="352px" imageUrl={url} />
                        ))}
                      </div>
                    )}

                    {marketTractionBlock && (
                      <MarketTractionSection
                        title={marketTractionBlock.title ?? 'Market Traction'}
                        summary={marketTractionBlock.summary ?? ''}
                        items={mapBlockItems(marketTractionBlock)}
                      />
                    )}
                  </>
                )}

                {activeTab === 'details' && (
                  <>
                    <TeamSection
                      members={team.map((member) => ({
                        name: member.name,
                        title: member.title,
                        bio: member.bio,
                        imagePath: member.imageUrl,
                      }))}
                    />
                    <div style={{ marginTop: '64px' }}>
                      <FinancialsSection
                        metrics={financials.metrics}
                        useOfProceeds={financials.useOfProceeds}
                        useOfProceedsIntro={useOfProceedsIntroBlock?.summary}
                      />
                    </div>
                    <div style={{ marginTop: '64px' }}>
                      <RisksMitigationSection risks={risks} />
                    </div>
                    <div style={{ marginTop: '64px' }}>
                      <DocumentsSection documents={documents} corporateProfile={corporateProfile} />
                    </div>
                  </>
                )}

                {activeTab === 'updates' && (
                  <UpdatesSection updates={updates.items} />
                )}

                {activeTab === 'testimonials' && (
                  <TestimonialsSection testimonials={testimonials} />
                )}

                {activeTab === 'questions' && (
                  <AskQuestionSection />
                )}

                {(activeTab === 'overview' || activeTab === 'details') && tldrBlock?.summary && (
                  <TLDRSection summary={tldrBlock.summary} />
                )}

                {activeTab !== 'questions' && (
                  <div className="w-full lg:block hidden" style={{ maxWidth: '816px', marginTop: '32px' }}>
                    <ActionButton
                      text="Start trading"
                      variant="primary"
                      width="100%"
                      height="48px"
                      onClick={handleStartTrading}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col items-start w-full max-w-full lg:w-auto lg:max-w-[400px] lg:flex-shrink-0 lg:sticky lg:top-20 lg:self-start">
              <InvestmentPanel offeringId={offering.id} slug={offering.slug} funding={funding} />

              <div className="w-full lg:w-[400px] border-t border-[#EAEAEA] dark:border-[#404040] mt-8" />

              <div className="mt-8 w-full">
                <DealTermsSection
                  dealTerms={dealTerms}
                  companyName={offering.name}
                  offeringId={offering.id}
                  slug={offering.slug}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

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
            onClick={handleStartTrading}
          />
        </div>
      )}
    </div>
  )
}
