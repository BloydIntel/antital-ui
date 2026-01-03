"use client"

import React from 'react'
import { ProgressBar } from '@/components/ui/progress-bar'

interface FundingProgressProps {
  raised: number
  goal: number
  percentage: number
}

// Format number to Nigerian currency format (e.g., 450,000)
const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-NG')
}

export function FundingProgress({ raised, goal, percentage }: FundingProgressProps) {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* Funding Info - Amount raised and percentage */}
      <div className="flex items-center justify-between w-full">
        {/* Funding Raised Container */}
        <div className="flex items-center gap-0">
          {/* Naira symbol icon - using text instead of icon for simplicity */}
          <span
            className="text-[#212121]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '17px',
              letterSpacing: '-0.01em',
            }}
          >
            ₦
          </span>
          
          {/* Funding Raised Amount */}
          <span
            className="text-[#212121]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '17px',
              letterSpacing: '-0.01em',
            }}
          >
            {formatAmount(raised)} raised
          </span>
        </div>

        {/* Funding Percentage */}
        <div
          className="text-[#212121]"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
          }}
        >
          {percentage}%
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar value={percentage} />

      {/* Goal Info Container */}
      <div className="flex items-center gap-0.5 w-full">
        {/* Goal Label */}
        <span
          className="text-[#757575]"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
          }}
        >
          Goal:
        </span>

        {/* Goal Amount */}
        <div className="flex items-center">
          <span
            className="text-[#757575]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              letterSpacing: '-0.01em',
            }}
          >
            ₦{formatAmount(goal)}
          </span>
        </div>
      </div>
    </div>
  )
}

