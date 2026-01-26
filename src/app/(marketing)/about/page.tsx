import type { Metadata } from 'next'
import { AboutPageContent } from './about-page-content'

export const metadata: Metadata = {
  title: 'About Us | Antital',
  description: 'Learn about Antital - connecting everyday Nigerians with startups and small businesses. Our mission is to make wealth creation simple, transparent, and inclusive.',
}

export default function AboutPage() {
  return <AboutPageContent />
}

