"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="w-full bg-background py-[62px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
        <div 
          className="relative w-full max-w-[1232px] h-[361px] mx-auto bg-[#042E27] rounded-2xl overflow-visible flex items-center justify-center"
        >
          {/* Left Side - Hand and Container */}
          <div className="absolute hidden lg:block left-4 top-0 w-[150px] h-full">
            {/* Hand dropping coin */}
            <div className="absolute top-4 left-0 w-[110px] h-[110px]">
              <Image
                src="/explore/hands_dropping_coin.png"
                alt="Hands dropping coins into a container, symbolizing investment and wealth building"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            {/* Container below (glass with coins) */}
            <div className="absolute bottom-4 left-0 w-full h-[140px]">
              <Image
                src="/explore/coins_in_glass.png"
                alt="Coins collected in a glass container, representing savings and accumulated wealth"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Right Side - Hand and Container */}
          <div className="absolute hidden lg:block right-4 top-0 w-[150px] h-full">
            {/* Hand dropping coin */}
            <div className="absolute top-4 right-0 w-[110px] h-[110px]">
              <Image
                src="/explore/hands_dropping_coin2.png"
                alt="Hands dropping coins, representing active investment and financial growth"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            {/* Container below (piggy bank) */}
            <div className="absolute bottom-4 right-0 w-full h-[140px]">
              <Image
                src="/explore/piggy_bank.png"
                alt="Piggy bank symbolizing savings, financial security, and long-term wealth accumulation"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full max-w-[670px] px-4">
            {/* Text Container */}
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Heading */}
              <h2
                className="text-[#F4F5F7] text-center"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  lineHeight: '58px',
                  letterSpacing: '-0.01em',
                }}
              >
                Ready to Start Investing?
              </h2>

              {/* Description */}
              <p
                className="text-[#EAEAEA] text-center"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '23px',
                  letterSpacing: '-0.01em',
                }}
              >
                Join thousands of investors building wealth through Nigerian startups. Get started with as little as ₦10,000.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Create Free Account Button */}
              <Button
                className="flex items-center justify-center gap-2 px-4 py-2 w-[204px] h-[48px] bg-[#B9C65B] hover:bg-[#B9C65B]/90 rounded-lg transition-colors"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '21px',
                }}
                asChild
              >
                <Link href="/auth/sign-up" className="text-[#11110F]">
                  Create free account
                </Link>
              </Button>

              {/* Learn More Button */}
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 px-4 py-2 w-[204px] h-[48px] bg-transparent border border-[#B9C65B] text-[#B9C65B] hover:bg-[#B9C65B] hover:text-[#11110F] rounded-lg transition-colors"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '21px',
                }}
                asChild
              >
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

