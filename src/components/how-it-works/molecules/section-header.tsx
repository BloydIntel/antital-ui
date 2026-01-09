"use client"

import React from 'react'

interface SectionHeaderProps {
  title: string
  subtitle: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-[581px]">
      {/* Heading - 36px, Rethink Sans 500 from Figma */}
      <h2
        className="text-[#212121] dark:text-foreground text-center w-full"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: 'clamp(28px, 4vw, 36px)',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>

      {/* Subheading - 18px, DM Sans 400 from Figma */}
      <p
        className="text-[#3D3D3D] dark:text-muted-foreground text-center w-full"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '18px',
          lineHeight: '23px',
          letterSpacing: '-0.01em',
        }}
      >
        {subtitle}
      </p>
    </div>
  )
}

