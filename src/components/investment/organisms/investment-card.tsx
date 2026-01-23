"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { RiskBadge } from '../atoms/risk-badge'
import { StatItem } from '../molecules/stat-item'
import { FundingProgress } from '../molecules/funding-progress'

export interface InvestmentCardData {
  id: string
  name: string
  category: string
  description: string
  image: string
  risk: 'low' | 'moderate' | 'high'
  investors: number
  daysLeft: number
  minInvestment: number
  raised: number
  goal: number
  percentage: number
}

interface InvestmentCardProps {
  data: InvestmentCardData
}

export function InvestmentCard({ data }: InvestmentCardProps) {
  const {
    id,
    name,
    category,
    description,
    image,
    risk,
    investors,
    daysLeft,
    minInvestment,
    raised,
    goal,
    percentage,
  } = data

  return (
    <div
      className="flex flex-col p-4 bg-white rounded-lg border border-[#F4F5F7] shadow-sm hover:border-[#D1D1D1] hover:shadow-lg transition-all duration-300 w-[358px] md:w-[397px] h-[600px]"
    >
      {/* Project Image Wrapper */}
      <div className="flex flex-col items-center gap-6 flex-1">
        {/* Project Image Container with Risk Badge */}
        <Link href={`/explore/${id}`} className="relative w-full h-[200px] rounded-lg overflow-hidden cursor-pointer">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="365px"
          />

          {/* Risk Badge - positioned absolutely on top right */}
          <RiskBadge risk={risk} />

          {/* Antital Logo Badge - bottom left */}
          <div className="absolute left-2 bottom-2 bg-white rounded-sm px-2 py-1">
            <Image
              src="/antital_logo.svg"
              alt="Antital"
              width={48}
              height={14}
              unoptimized
            />
          </div>
        </Link>

        {/* Project Info Container */}
        <div className="flex flex-col items-start gap-6 w-full">
          {/* Project Info - Name and Category */}
          <div className="flex flex-col items-start gap-1 w-full">
            {/* Project Name */}
            <h3
              className="text-[#212121]"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '23px',
                letterSpacing: '-0.01em',
              }}
            >
              {name}
            </h3>

            {/* Project Category */}
            <div
              className="text-[#7A6FF0] w-full"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              {category}
            </div>
          </div>

          {/* Project Details Container */}
          <div className="flex flex-col items-start gap-8 w-full">
            {/* Project Details */}
            <div className="flex flex-col items-start gap-6 w-full">
              {/* Project Description */}
              <p
                className="text-[#505050] w-full"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '23px',
                  letterSpacing: '-0.01em',
                }}
              >
                {description}
              </p>

              {/* Stats Row - Investors, Days Left, Min Investment */}
              <div className="flex items-start gap-2 w-full">
                <StatItem label="Investors" value={investors} />
                <StatItem label="Days Left" value={daysLeft} />
                <StatItem
                  label="Min. Investment"
                  value={`₦${minInvestment.toLocaleString('en-NG')}`}
                  variant="bold"
                />
              </div>

              {/* Funding Progress */}
              <FundingProgress
                raised={raised}
                goal={goal}
                percentage={percentage}
              />
            </div>

            {/* View Details Button - width: 365px, height: 48px from Figma */}
            <Button
              variant="outline"
              className="h-12 w-[326px] md:w-[365px] bg-white dark:bg-white border-[#365852] text-[#365852] [&:hover]:bg-[#365852] [&:hover]:text-white [&:hover]:border-[#365852] dark:[&:hover]:bg-[#365852] dark:[&:hover]:text-white dark:[&:hover]:border-[#365852] rounded-lg shadow-none [&:hover]:shadow-[0_6px_0px_rgba(0,0,0,0.25)] transition-all duration-300"
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '21px',
              }}
              asChild
            >
              <Link href={`/explore/${id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

