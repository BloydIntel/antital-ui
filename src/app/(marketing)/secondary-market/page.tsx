import type { Metadata } from 'next'
import SecondaryMarketLandingPageContent from '@/app/(marketing)/secondary-market/secondary-market-landing-page-content'

export const metadata: Metadata = {
    title: 'Secondary Market | Antital',
    description: 'Explore the secondary market on Antital - buy and sell existing investments in startups and businesses.',
}

export default function Page() {
    return (
        <SecondaryMarketLandingPageContent />
    )
}
