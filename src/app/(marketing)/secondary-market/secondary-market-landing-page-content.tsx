import React from 'react'
import { ComingSoonBanner } from '@/components/secondary-market/molecules/coming-soon-banner'
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
            <ComingSoonBanner />
            <SecondaryMarketHero />
            <WhatIsTheAntitalSecondaryMarket />
            <HowToInvest />
            <WhyTrade />
            <ImportantRiskDisclosure />
            <TradeWithConfidence variant="with-images" />
            <Testimonials className="py-[150px]" />

            <div className="w-full min-h-[800px] bg-[#042E27] py-[107px] px-4 md:px-6 lg:px-12 xl:px-[104px]">
                <FAQ />
            </div>

            <TradeWithConfidence variant="plain" />
        </div>
    )
}
