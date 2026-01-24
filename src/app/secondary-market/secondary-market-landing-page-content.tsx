import React from 'react'
import { Navbar } from '@/app/landing/components/navbar'
import { Footer } from '@/app/landing/components/footer'
import SecondaryMarketHero from '@/app/secondary-market/components/SecondaryMarketHero'
import WhatIsTheAntitalSecondaryMarket from '@/app/secondary-market/components/WhatIsTheAntitalSecondaryMarket'
import HowToInvest from '@/app/secondary-market/components/HowToInvest'
import WhyTrade from '@/app/secondary-market/components/WhyTrade'
import ImportantRiskDisclosure from '@/app/secondary-market/components/ImportantRiskDisclosure'
import TradeWithConfidence from '@/app/secondary-market/components/TradeWithConfidence'
import { Testimonials } from '@/app/landing/components/testimonials'
import { FAQ } from '@/app/landing/components/faq'
import TradeWithConfidencePlain from '@/app/secondary-market/components/TradeWithConfidencePlain'

export default function SecondaryMarketLandingPageContent() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <SecondaryMarketHero />
            <WhatIsTheAntitalSecondaryMarket />
            <HowToInvest />
            <WhyTrade />
            <ImportantRiskDisclosure />
            <TradeWithConfidence />
            <Testimonials className="py-[150px]" />
            <FAQ />
            <TradeWithConfidencePlain />
            <Footer />
        </div>
    )
}
