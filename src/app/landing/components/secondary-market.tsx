"use client"

import React from 'react';
import Image from 'next/image';
import { ContentBlock } from '@/components/secondary-market/molecules/content-block';
import { ButtonGroup } from '@/components/secondary-market/molecules/button-group';

export function SecondaryMarket() {
  return (
    <section className="w-full min-h-[600px] lg:min-h-[800px] bg-[#042E27] relative overflow-x-hidden">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto h-full relative px-4 md:px-6 lg:px-12 xl:px-[104px] py-16 lg:py-20 xl:py-0">
        {/* Flex Container for responsive layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-12 xl:gap-16 h-full min-h-[600px] lg:min-h-[800px] overflow-x-hidden">
          
          {/* Left Side - Image on green background (includes yellow card with text) */}
          <div className="relative w-full lg:flex-1 lg:max-w-[646px] xl:w-[646px] h-[400px] sm:h-[500px] lg:h-[700px] flex-shrink-0">
            <Image
              src="/how_it_works/people_investing.png"
              alt="Not Just Investing, Belonging - People investing together"
              fill
              className="object-contain object-left lg:object-left"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 646px"
            />
          </div>

          {/* Right Side - Content */}
          <div className="relative w-full lg:flex-1 lg:max-w-[608px] xl:w-[608px] flex-shrink min-w-0 max-w-full flex flex-col items-start justify-center lg:justify-center gap-6 sm:gap-8 z-10" style={{ boxSizing: 'border-box' }}>
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

