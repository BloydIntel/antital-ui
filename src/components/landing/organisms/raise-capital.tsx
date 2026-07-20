"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RaiseCapital() {
  return (
    <section className="w-full bg-background py-16">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
        {/* Content Container - padding: 64px 104px, gap: 129px */}
        <div 
          className="flex flex-col lg:flex-row justify-between items-center bg-[#F4F5F7] rounded px-8 py-16 lg:p-16 gap-12 lg:gap-[129px]"
        >
          {/* Left Side - Text Content */}
          <div className="flex flex-col items-start gap-6 w-full lg:w-[661px]">
            {/* Text Block */}
            <div className="flex flex-col items-start gap-6">
              {/* Title */}
              <h2
                className="text-[#11110F]"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontSize: '36px',
                  lineHeight: '43px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                Raise Capital for Your Startup on Antital
              </h2>

              {/* Description */}
              <p
                className="text-[#2C2C2C]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '18px',
                  lineHeight: '23px',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                }}
              >
                Unlock funding, visibility, and support for your early-stage startup or business. 
                Antital connects you to a growing network of retail investors ready to back 
                promising ventures like yours. From seamless onboarding to milestone-based 
                disbursement and investor engagement, we provide everything you need to 
                grow your business.
              </p>
            </div>

            {/* Button */}
            <Button
              className="bg-[#B9C65B] hover:bg-[#B9C65B]/90 text-[#F4F5F7] rounded-lg h-12 px-4 gap-2 transition-all"
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontSize: '16px',
                lineHeight: '21px',
                fontWeight: 500,
                width: '251px',
              }}
              asChild
            >
              <Link href="/create-account" className="flex items-center justify-center gap-2">
                <span>Apply to List Your Startup</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* Right Side - Big Dreams Card (image includes text, person, and coins) */}
          <div className="relative w-full lg:w-[502px] h-[400px] lg:h-[462px] flex-shrink-0">
            <Image
              src="/how_it_works/big_dreams.jpg"
              alt="Big Dreams? Small Steps. Collective Power."
              fill
              className="object-contain rounded-[10px]"
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}

