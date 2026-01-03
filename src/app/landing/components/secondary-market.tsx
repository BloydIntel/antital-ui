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
        
        {/* Left Side - Image on green background (includes yellow card with text) */}
        <div className="absolute left-0 lg:left-4 xl:left-8 top-[105px] w-[646px] h-[700px] hidden lg:block">
          <Image
            src="/how_it_works/people_investing.png"
            alt="Not Just Investing, Belonging - People investing together"
            fill
            className="object-contain"
            unoptimized
          />
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

