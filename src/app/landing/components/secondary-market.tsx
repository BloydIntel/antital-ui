"use client"

import React from 'react';
import Image from 'next/image';
import { ContentBlock } from '@/components/secondary-market/molecules/content-block';
import { ButtonGroup } from '@/components/secondary-market/molecules/button-group';

export function SecondaryMarket() {
  return (
    <section className="w-full h-[800px] bg-[#042E27] relative overflow-hidden">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto h-full relative px-4 md:px-6 lg:px-12 xl:px-[104px]">
        
        {/* Left Side - Yellow Card with Pattern and Image */}
        <div className="absolute left-4 md:left-6 lg:left-12 xl:left-[104px] top-[105px] w-[502px] h-[605px] hidden lg:block">
          {/* Yellow Card Background with Pattern */}
          <div className="relative w-full h-full bg-[#F4B942] rounded-[12px] overflow-hidden">
            {/* Pattern Overlay - Simplified diagonal stripes */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #FDF1D9 0px,
                  #FDF1D9 20px,
                  transparent 20px,
                  transparent 40px
                )`,
              }}
            />

            {/* Centered Text */}
            <div className="absolute top-[49px] left-1/2 -translate-x-1/2 w-[358px] z-10">
              <h3
                className="text-center text-[#042E27]"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 700,
                  fontSize: '68px',
                  lineHeight: '59px',
                  letterSpacing: '0.01em',
                }}
              >
                Not Just Investing, Belonging.
              </h3>
            </div>
          </div>

          {/* People Investing Image - Outside yellow card, sits on green background */}
          <div className="absolute bottom-[-71px] left-1/2 -translate-x-1/2 w-[646px] h-[452px]">
            <Image
              src="/how_it_works/people_investing.png"
              alt="People investing together"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="absolute right-4 md:right-6 lg:right-12 xl:right-[104px] top-1/2 -translate-y-1/2 w-full lg:w-[608px] px-4 lg:px-0">
          <div className="flex flex-col items-start gap-8">
            {/* Text Content */}
            <ContentBlock
              label="Secondary market"
              heading="Buy and sell investment stakes"
              description="Already missed a funding round? Buy shares from existing investors. Need liquidity? Sell your stakes to new investors. Our secondary marketplace ensures you're never locked into an investment."
            />

            {/* Buttons */}
            <ButtonGroup
              primaryHref="/secondary-market/trade"
              primaryText="Start trading"
              secondaryHref="/secondary-market/learn"
              secondaryText="Learn more"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

