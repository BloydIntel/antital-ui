import React from 'react'
import { Navbar } from '@/app/landing/components/navbar'
import { Footer } from '@/app/landing/components/footer'
import SecondaryMarketHero from '@/app/secondary-market/components/SecondaryMarketHero'
import WhatIsTheAntitalSecondaryMarket from '@/app/secondary-market/components/WhatIsTheAntitalSecondaryMarket'
import HowToInvest from '@/app/secondary-market/components/HowToInvest'

export default function SecondaryMarketLandingPageContent() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <SecondaryMarketHero />
            <WhatIsTheAntitalSecondaryMarket />
            <HowToInvest />
            <Footer />
        </div>
    )
}
