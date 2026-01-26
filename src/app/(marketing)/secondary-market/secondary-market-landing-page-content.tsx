import React from 'react'
import { SecondaryMarketHero } from '@/components/secondary-market/organisms/SecondaryMarketHero'
import { WhatIsTheAntitalSecondaryMarket } from '@/components/secondary-market/organisms/WhatIsTheAntitalSecondaryMarket'
import { HowToInvest } from '@/components/secondary-market/organisms/HowToInvest'
import { WhyTrade } from '@/components/secondary-market/organisms/WhyTrade'
import { ImportantRiskDisclosure } from '@/components/secondary-market/organisms/ImportantRiskDisclosure'
import { TradeWithConfidence } from '@/components/secondary-market/organisms/TradeWithConfidence'
import { Testimonials } from '@/components/landing/organisms/testimonials'
import { FAQ } from '@/components/landing/organisms/faq'

export default function SecondaryMarketLandingPageContent() {
    return (
        <div className="min-h-screen bg-background">
            <SecondaryMarketHero />
            <WhatIsTheAntitalSecondaryMarket />
            <HowToInvest />
            <WhyTrade />
            <ImportantRiskDisclosure />
            <TradeWithConfidence variant="with-images" />
            <Testimonials className="py-[150px]" />
            <FAQ />
            <TradeWithConfidence variant="plain" />
        </div>
    )
}
