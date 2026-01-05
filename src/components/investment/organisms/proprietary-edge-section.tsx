import React from 'react'
import { FeaturePoint } from '@/components/investment/molecules/feature-point'

export function ProprietaryEdgeSection() {
  // Hardcoded data for now
  const heading = 'Our Proprietary Edge: Technology & Scalability'
  const mainDescription = 'At the core of NEXUS AI is the "Quantum-Sync Engine", a patent-pending algorithm that processes real-time data from disparate sources (weather, traffic, consumer sentiment) to create a single, unified supply chain forecast. This technology is 20x faster than competitors\' legacy systems.'
  
  const features = [
    {
      label: 'Scalability',
      description: 'Our platform is built on a modular microservices architecture, allowing us to onboard new clients and expand into new sectors (e.g., e-commerce, healthcare logistics) with minimal friction and no performance degradation. We project a 300% increase in user capacity within the next 18 months.',
    },
    {
      label: 'Defensible Moat',
      description: 'Our proprietary dataset, accumulated over three years of beta testing with 50 pilot companies, gives us an insurmountable data advantage that improves the Quantum-Sync Engine\'s accuracy with every new transaction.',
    },
  ]

  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '24px',
        marginTop: '64px',
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        {heading}
      </h2>

      {/* Main Description */}
      <p
        className="w-full"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.01em',
          color: '#505050',
          maxWidth: '816px',
        }}
      >
        {mainDescription}
      </p>

      {/* Feature Points */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          maxWidth: '816px',
          gap: '24px',
        }}
      >
        {features.map((feature, index) => (
          <FeaturePoint key={index} label={feature.label} description={feature.description} />
        ))}
      </div>
    </div>
  )
}

