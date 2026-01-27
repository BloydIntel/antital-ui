import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  title: 'Antital - Turn your earnings into opportunities',
  description: 'Antital connects everyday Nigerians with startups and small businesses. Making wealth creation simple, transparent, and inclusive.',
  keywords: ['investment', 'startups', 'nigeria', 'wealth creation', 'fintech', 'micro-investment', 'angel investing', 'startup investment'],
  openGraph: {
    title: 'Antital - Turn your earnings into opportunities',
    description: 'Antital connects everyday Nigerians with startups and small businesses. Making wealth creation simple, transparent, and inclusive.',
    type: 'website',
    // Add your site URL when ready
    // url: 'https://antital.com',
    // Add your OG image when ready
    // images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antital - Turn your earnings into opportunities',
    description: 'Antital connects everyday Nigerians with startups and small businesses. Making wealth creation simple, transparent, and inclusive.',
    // Add your Twitter handle when ready
    // creator: '@antital',
  },
}

export default function LandingPage() {
  return <LandingPageContent />
}
