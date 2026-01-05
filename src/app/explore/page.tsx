import type { Metadata } from 'next'
import { ExplorePageContent } from './explore-page-content'

export const metadata: Metadata = {
  title: 'Explore | Antital',
  description: 'Explore investment opportunities on Antital - discover startups and businesses looking for funding.',
}

export default function ExplorePage() {
  return <ExplorePageContent />
}

