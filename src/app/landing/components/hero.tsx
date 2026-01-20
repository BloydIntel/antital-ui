"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="w-full bg-background">
      {/* Main Container - padding: 0px 104px 62px from Figma */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] pt-12 lg:pt-16 pb-16">
        {/* Content Container - gap: 32px from Figma */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Left Content - Text and Button */}
          <div className="flex flex-col items-start gap-6 w-full lg:w-[594px] lg:shrink-0">
            {/* Text Content Container - gap: 24px from Figma */}
            <div className="flex flex-col items-start gap-6">
              {/* Main Heading */}
              <h1
                className="text-foreground"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(48px, 6vw, 80px)', // Responsive, max 80px from Figma
                  lineHeight: '1.025', // 82/80 = 102% from Figma
                  letterSpacing: '-0.01em',
                }}
              >
                Turn your earnings into opportunities.
              </h1>

              {/* Subheading */}
              <p
                className="text-muted-foreground max-w-[542px]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px', // 120% from Figma
                  letterSpacing: '-0.01em',
                }}
              >
                Antital connects everyday Nigerians with startups and small businesses. Making wealth creation simple, transparent, and inclusive.
              </p>
            </div>

            {/* Hero Button - width: 287px, height: 64px, background: #7A6FF0 from Figma */}
            <Button
              className="bg-[#7A6FF0] hover:bg-[#7A6FF0]/90 text-white rounded-lg h-16 px-4 gap-2 transition-all w-full md:w-71.75"
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '21px',
              }}
              asChild
            >
              <Link href="/auth/sign-up" className="flex items-center justify-between w-full">
                <span className="mx-auto">Invest Now</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* Right Content - Hero Image with Floating Cards */}
          <div className="relative w-full lg:w-[606px] h-[400px] md:h-[500px] lg:h-[580px] flex-shrink-0">
            {/* Main Hero Image - 502x540px from Figma */}
            <div className="absolute left-1/2 lg:left-[104px] top-0 -translate-x-1/2 lg:translate-x-0 w-full max-w-[502px] h-[400px] md:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/hero/main-image.jpg"
                alt="Nigerian entrepreneur presenting investment opportunity"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 502px"
              />
            </div>

            {/* Floating Card 1 - "Invest in The Future" - top left of image */}
            <div className="hidden lg:block absolute left-0 top-[62px] z-10 shadow-[0px_4px_0px_#042E27] rounded-lg">
              <Image
                src="/hero/card-invest.png"
                alt="Invest in The Future"
                width={212}
                height={60}
                className="rounded-lg"
                unoptimized
              />
            </div>

            {/* Floating Card 2 - Stats Card with Graph - bottom left of image */}
            <div className="hidden lg:block absolute left-0 top-[345px] z-10 shadow-[0px_6px_0px_#11110F] rounded-lg">
              <Image
                src="/hero/card-stats.png"
                alt="Greentech Solutions - 128K Total Investors"
                width={234}
                height={234}
                className="rounded-lg"
                unoptimized
              />
            </div>

            {/* Floating Card 3 - Deposit Card - bottom right of image */}
            <div className="hidden lg:block absolute right-0 xl:right-[-27px] bottom-[20px] z-10 shadow-[0px_6px_0px_#11110F] rounded-[10.5909px]">
              <Image
                src="/hero/card-deposit.png"
                alt="Deposit +₦50,000"
                width={233}
                height={226}
                className="rounded-[10.5909px]"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
