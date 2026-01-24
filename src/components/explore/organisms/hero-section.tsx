import React from 'react'
import Image from 'next/image'
import { SearchBar } from '../molecules/search-bar'
import { FilterDropdown } from '../molecules/filter-dropdown'

export function HeroSection() {
  // Handler function for search
  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // TODO: Implement search logic
  }

  // Handler functions for filter changes
  const handleSectorChange = (value: string) => {
    console.log('Sector filter changed:', value)
    // TODO: Implement filter logic
  }

  const handleRiskChange = (value: string) => {
    console.log('Risk filter changed:', value)
    // TODO: Implement filter logic
  }

  const handleTrendingChange = (value: string) => {
    console.log('Trending filter changed:', value)
    // TODO: Implement filter logic
  }

  const handleInvestmentChange = (value: string) => {
    console.log('Investment filter changed:', value)
    // TODO: Implement filter logic
  }

  const filterOptions = {
    sectors: [
      { value: 'all-sectors', label: 'All Sectors' },
      { value: 'fintech', label: 'Fintech' },
      { value: 'agriculture', label: 'Agriculture' },
      { value: 'energy', label: 'Energy' },
    ],
    risk: [
      { value: 'all-risk', label: 'All Risk Levels' },
      { value: 'low', label: 'Low' },
      { value: 'moderate', label: 'Moderate' },
      { value: 'high', label: 'High' },
    ],
    trending: [
      { value: 'trending', label: 'Trending' },
      { value: 'newest', label: 'Newest' },
      { value: 'popular', label: 'Popular' },
    ],
    investment: [
      { value: 'min-investment', label: 'Min Investment' },
      { value: '10000', label: '₦10,000' },
      { value: '50000', label: '₦50,000' },
      { value: '100000', label: '₦100,000' },
    ],
  }

  return (
    <section className="relative w-full min-h-[400px] sm:min-h-[500px] lg:min-h-[629px] flex flex-col items-center justify-center py-12 sm:py-16 lg:py-[124px] px-4">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/explore/people_image.png"
          alt="People collaborating in office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/58" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center gap-8 sm:gap-12 lg:gap-[92px]">
        {/* Text and Search Container */}
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full max-w-[848px]">
          {/* Text Content */}
          <div className="flex flex-col items-center gap-4 w-full max-w-[719px]">
            {/* Main Heading */}
            <h1
              className="text-[#F4F5F7] text-center"
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: '1.208',
                letterSpacing: '-0.01em',
              }}
            >
              Discover Your Next Investment Opportunity
            </h1>

            {/* Description */}
            <p
              className="text-[#F4F5F7] text-center"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                lineHeight: '1.278',
                letterSpacing: '-0.01em',
              }}
            >
              Discover carefully vetted Nigerian startups and growth companies. Begin your investment journey with as little as ₦10,000 and be part of building the businesses shaping our future.
            </p>
          </div>

          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Filter Dropdowns - Separate row below search */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center w-full max-w-[662px]">
            <FilterDropdown
              defaultValue="all-sectors"
              placeholder="All Sectors"
              width="w-full sm:w-[142px]"
              options={filterOptions.sectors}
              onValueChange={handleSectorChange}
            />
            <FilterDropdown
              defaultValue="all-risk"
              placeholder="All Risk Levels"
              width="w-full sm:w-[165px]"
              options={filterOptions.risk}
              onValueChange={handleRiskChange}
            />
            <FilterDropdown
              defaultValue="trending"
              placeholder="Trending"
              width="w-full sm:w-[127px]"
              options={filterOptions.trending}
              onValueChange={handleTrendingChange}
            />
            <FilterDropdown
              defaultValue="min-investment"
              placeholder="Min Investment"
              width="w-full sm:w-[180px]"
              options={filterOptions.investment}
              onValueChange={handleInvestmentChange}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

