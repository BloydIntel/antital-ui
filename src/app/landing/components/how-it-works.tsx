"use client"

import React, { useState } from 'react'
import { SectionHeader } from '@/components/how-it-works/molecules/section-header'
import { FeatureCard } from '@/components/how-it-works/molecules/feature-card'
import { ToggleButton } from '@/components/how-it-works/atoms/toggle-button'

// Feature data for investors
const investorFeatures = [
  {
    id: 'discover',
    title: 'Discover',
    description: 'Browse a curated list of high-growth startups and innovative businesses.',
    image: '/how_it_works/discover.jpg',
    bgColor: '#E7FFC5', // Light green from Figma
  },
  {
    id: 'invest',
    title: 'Invest',
    description: 'Fund the companies you believe in with transparent, straightforward investments.',
    image: '/how_it_works/invest.jpg',
    bgColor: '#D1E6FF', // Light blue from Figma
  },
  {
    id: 'grow',
    title: 'Grow',
    description: "Track your portfolio and participate in the success of Africa's future",
    image: '/how_it_works/grow.jpg',
    bgColor: '#F4EDFF', // Light purple from Figma
  },
]

// Feature data for founders
const founderFeatures = [
  {
    id: 'apply',
    title: 'Apply',
    description: 'Submit your startup for review and join our curated marketplace.',
    image: '/how_it_works/apply.jpg',
    bgColor: '#E7FFC5', // Light green from Figma
  },
  {
    id: 'raise',
    title: 'Raise',
    description: 'Launch your fundraising campaign and connect with thousands of investors.',
    image: '/how_it_works/raise.jpg',
    bgColor: '#D1E6FF', // Light blue from Figma
  },
  {
    id: 'scale',
    title: 'Scale',
    description: 'Receive funding and support to grow your business to the next level.',
    image: '/how_it_works/scale.jpg',
    bgColor: '#F4EDFF', // Light purple from Figma
  },
]

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState(0) // 0 for investors, 1 for founders
  const features = activeTab === 0 ? investorFeatures : founderFeatures

  return (
    <section className="w-full bg-background">
      {/* Main Container - padding: 62px 0px, gap: 92px from Figma */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] py-16 flex flex-col items-center gap-16 lg:gap-[92px]">
        
        {/* Content Container - padding: 32px, gap: 56px, bg: #F4F5F7 from Figma */}
        <div 
          className="flex flex-col items-center w-full max-w-[1232px] rounded"
          style={{
            padding: '32px',
            gap: '56px',
            backgroundColor: '#F4F5F7',
          }}
        >
          {/* Section Header */}
          <SectionHeader
            title="A simple path to powerful returns."
            subtitle="Antital makes equity crowdfunding accessible and secure for everyone."
          />

          {/* Button Container */}
          <div className="flex flex-col items-center gap-12 w-full">
            {/* Toggle Button */}
            <ToggleButton
              options={['For investors', 'For founders']}
              activeOption={activeTab}
              onChange={setActiveTab}
            />

            {/* Feature Cards Container - gap: 32px from Figma */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full">
              {features.map((feature) => (
                <FeatureCard
                  key={feature.id}
                  title={feature.title}
                  description={feature.description}
                  image={feature.image}
                  bgColor={feature.bgColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

