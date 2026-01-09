'use client'

import React, { useState } from 'react'
import { Info } from 'lucide-react'

interface DealTermItemProps {
  label: string
  value: string
  description?: string
  showInfo?: boolean
  isLast?: boolean
}

export function DealTermItem({ label, value, description, showInfo = false, isLast = false }: DealTermItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex flex-col items-start w-full transition-all duration-300 ease-in-out ${isLast ? '' : 'border-b border-[#EAEAEA] dark:border-[#404040]'}`}
      style={{
        padding: '16px 0px',
        gap: '16px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex flex-row justify-between items-center w-full"
        style={{
          gap: '16px',
        }}
      >
        {/* Label and Value */}
        <div
          className="flex flex-col items-start flex-1 transition-all duration-300 ease-in-out"
          style={{
            gap: '8px',
            minHeight: isHovered && description ? 'auto' : '49px',
          }}
        >
          {/* Label */}
          <span
            className="transition-colors duration-300 ease-in-out text-[#858585] dark:text-gray-400"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '17px',
              letterSpacing: '-0.01em',
            }}
          >
            {label}
          </span>

          {/* Value */}
          <span
            className="transition-all duration-300 ease-in-out text-[#2C2C2C] dark:text-white"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: isHovered ? 600 : 400,
              fontSize: '20px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
            }}
          >
            {value}
          </span>

          {/* Description - appears on hover */}
          {description && (
            <span
              className="transition-all duration-300 ease-in-out overflow-hidden text-[#858585] dark:text-gray-400"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
                maxHeight: isHovered ? '100px' : '0px',
                opacity: isHovered ? 1 : 0,
                marginTop: isHovered ? '8px' : '0px',
              }}
            >
              {description}
            </span>
          )}
        </div>

        {/* Info Icon */}
        {showInfo && (
          <Info
            className="flex-shrink-0 self-start transition-opacity duration-300 ease-in-out text-[#858585] dark:text-gray-400"
            style={{
              width: '24px',
              height: '24px',
              opacity: isHovered ? 1 : 0.87,
              marginTop: '8px',
            }}
          />
        )}
      </div>
    </div>
  )
}

