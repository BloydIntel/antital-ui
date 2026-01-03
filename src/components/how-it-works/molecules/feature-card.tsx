"use client"

import React from 'react'
import Image from 'next/image'

interface FeatureCardProps {
  title: string
  description: string
  image: string
  bgColor: string
}

export function FeatureCard({ title, description, image, bgColor }: FeatureCardProps) {
  return (
    <div
      className="flex flex-col items-start bg-white rounded"
      style={{
        padding: '24px 16px 16px',
        gap: '16px',
        width: '368px',
        height: '431px',
      }}
    >
      {/* Text Container */}
      <div className="flex flex-col items-start gap-2 w-full">
        {/* Card Title - 24px, Rethink Sans 500, #A7B832 from Figma */}
        <h3
          className="text-[#A7B832] w-full"
          style={{
            fontFamily: 'var(--font-rethink-sans)',
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '29px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>

        {/* Card Description - 16px, DM Sans 400, #505050 from Figma */}
        <p
          className="text-[#505050] w-full"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
          }}
        >
          {description}
        </p>
      </div>

      {/* Image Container - different background colors from Figma */}
      <div
        className="w-full rounded-lg overflow-hidden relative"
        style={{
          height: '291px',
          backgroundColor: bgColor,
        }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          sizes="336px"
        />
      </div>
    </div>
  )
}

