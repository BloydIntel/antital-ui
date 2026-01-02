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
              <Link href="/apply" className="flex items-center justify-center gap-2">
                <span>Apply to List Your Startup</span>
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
          </div>

          {/* Right Side - Big Dreams Card */}
          <div className="relative w-full lg:w-[502px] h-[400px] lg:h-[462px] flex-shrink-0">
            <div className="relative w-full h-full bg-[#0A2342] rounded-[10px] overflow-hidden">
              {/* Background decorative elements would go here if needed */}
              
              {/* Big Dreams Text */}
              <div 
                className="absolute left-[37px] top-[48px] w-[271px] z-10"
                style={{
                  fontFamily: 'var(--font-rethink-sans)', // Using Rethink Sans instead of Clash Grotesk
                  fontSize: '43px',
                  lineHeight: '38px',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  color: '#FFFFFF',
                }}
              >
                Big Dreams?
                <br />
                Small Steps.
                <br />
                <span className="text-[#B9C65B]">Collective</span>
                <br />
                <span className="text-[#B9C65B]">Power.</span>
              </div>

              {/* Person Image */}
              <div className="absolute right-[-10px] bottom-[-32px] w-[293px] h-[418px]">
                <Image
                  src="/how_it_works/big_dreams.jpg"
                  alt="Nigerian entrepreneur"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Decorative Coin 1 - Bottom Left */}
              <div className="absolute left-[-78px] bottom-[110px] w-[160px] h-[152px] rotate-[-29deg]">
                <div className="relative w-full h-full">
                  {/* Coin circle - olive green with black border */}
                  <div className="absolute inset-0 rounded-full bg-[#E7FFC5] border-[3px] border-black"></div>
                  {/* Naira symbol */}
                  <div className="absolute inset-0 flex items-center justify-center text-[80px] font-bold text-[#A7B832]">
                    ₦
                  </div>
                </div>
              </div>

              {/* Decorative Coin 2 - Top Right (smaller) */}
              <div className="absolute right-[120px] top-[280px] w-[62px] h-[58px]">
                <div className="relative w-full h-full">
                  {/* Coin circle */}
                  <div className="absolute inset-0 rounded-full bg-[#E7FFC5] border-[2px] border-black"></div>
                  {/* Naira symbol */}
                  <div className="absolute inset-0 flex items-center justify-center text-[32px] font-bold text-[#A7B832]">
                    ₦
                  </div>
                </div>
              </div>

              {/* Decorative Coin 3 - Bottom Right */}
              <div className="absolute right-[400px] bottom-[108px] w-[132px] h-[117px]">
                <div className="relative w-full h-full">
                  {/* Coin circle */}
                  <div className="absolute inset-0 rounded-full bg-[#E7FFC5] border-[2px] border-black"></div>
                  {/* Naira symbol */}
                  <div className="absolute inset-0 flex items-center justify-center text-[64px] font-bold text-[#A7B832]">
                    ₦
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

