"use client"

import React from 'react'
import Image from 'next/image'
import { Navbar } from '@/app/landing/components/navbar'
import { Footer } from '@/app/landing/components/footer'
import { ValueCard } from '@/components/about/molecules/value-card'
import { FeatureCard } from '@/components/about/molecules/feature-card'
import { Briefcase, ShieldCheck, TrendingUp, ArrowLeftRight } from 'lucide-react'

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <section className="relative w-full h-[512px] bg-[#042E27] overflow-hidden">
          <div className="w-full max-w-[1440px] mx-auto h-full relative px-4 md:px-6 lg:px-12 xl:px-[104px]">
            
            {/* Left Side - Text Content */}
            <div className="absolute left-4 md:left-6 lg:left-12 xl:left-[104px] top-1/2 -translate-y-1/2 w-full max-w-[719px] flex flex-col gap-4 z-10">
              {/* Heading */}
              <h1
                className="text-[#F4F5F7]"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  lineHeight: '58px',
                  letterSpacing: '-0.01em',
                }}
              >
                Wealth Creation for Every Nigerian
              </h1>

              {/* Description */}
              <p
                className="text-[#EAEAEA] max-w-[719px]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '23px',
                  letterSpacing: '-0.01em',
                }}
              >
                Traditional investment has locked out average earners for too long. While the wealthy access high-growth startups through exclusive networks, most Nigerians are left with savings accounts earning 5% or risky schemes promising unrealistic returns.
              </p>
            </div>

            {/* Right Side - Lime Oval Background with People Image */}
            <div className="hidden lg:block absolute left-0 top-0 w-[1440px] h-[512px]">
              {/* Lime Green Background - Behind the people */}
              <div 
                 className="absolute z-10"
                style={{
                    width: '590.89px',
                    height: '380.92px',
                    left: '870px',
                  top: '80px',
                  backgroundColor: '#A7B832',
                  borderRadius: '50%',
                  transform: 'rotate(155.9deg)',
                  opacity: 1,
                }}
              />

              {/* People Image - On top */}
              <div 
                className="absolute z-10"
                style={{
                  width: '609.89px',
                  height: '426.92px',
                  left: '860px',
                  top: '52px',
                }}
              >
                <Image
                  src="/about_us/people.png"
                  alt="Team collaboration at Antital"
                  fill
                  className="object-cover rounded-[20px]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="w-full bg-background py-[62px]">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-[25px] w-full max-w-[1232px] mx-auto">
              
              {/* Left Card - About Us */}
              <div 
                className="relative w-full lg:w-[608px] h-[352px] bg-[#042E27] rounded p-6 flex flex-col gap-6 overflow-hidden"
              >
                {/* Decorative Leaf - Bottom Left */}
                <div 
                  className="absolute"
                  style={{
                    width: '132.48px',
                    height: '185.87px',
                    left: '-15.57px',
                    bottom: '-44.71px',
                    transform: 'rotate(10.48deg)',
                    zIndex: 0,
                  }}
                >
                  <Image
                    src="/about_us/over_leaf.png"
                    alt=""
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </div>

                {/* Content - Layered on top */}
                <div className="relative z-10 flex flex-col gap-6">
                  {/* Heading */}
                  <h2
                    className="text-[#F4F5F7]"
                    style={{
                      fontFamily: 'var(--font-rethink-sans)',
                      fontWeight: 400,
                      fontSize: '28px',
                      lineHeight: '34px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    About us
                  </h2>

                  {/* Description */}
                  <p
                    className="text-[#EAEAEA] max-w-[560px]"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '23px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    We're a micro-investment marketplace connecting you with rigorously vetted early-stage startups and innovative small businesses. Our meticulous 6-step assessment ensures you invest in promising ventures, not empty promises.
                    <br /><br />
                    At Antital, we're leveling the playing field, empowering every Nigerian to participate in wealth creation and drive economic growth.
                  </p>
                </div>
              </div>

              {/* Right Card - Quote */}
              <div className="w-full lg:w-[599px] h-auto lg:h-[352px] flex items-center">
                <p
                  className="text-foreground"
                  style={{
                    fontFamily: 'var(--font-rethink-sans)',
                    fontWeight: 500,
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    lineHeight: '1.3',
                    letterSpacing: '-0.01em',
                  }}
                >
                  " Traditional investment has locked out average earners for too long. While the wealthy access high-growth startups through exclusive networks, most Nigerians are left with savings accounts earning 5% or risky schemes promising unrealistic returns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="w-full bg-background py-[62px]">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 lg:gap-[15px] w-full max-w-[1232px] mx-auto">
              
              <ValueCard
                title="Our Mission"
                description="Transform every Nigerian into a micro angel investor while empowering entrepreneurs to build the solutions our country needs."
              />

              <ValueCard
                title="Our Vision"
                description="Transparent, secure, and accessible wealth creation that grows your money and our economy together."
              />

              <ValueCard
                title="Our Values"
                description="Integrity, transparency, and collaboration guide everything we do as we support founders and empower investors to grow with confidence."
              />

            </div>
          </div>
        </section>

        {/* Why Choose Antital Section */}
        <section className="w-full bg-background py-[62px]">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
            <div className="flex flex-col items-start gap-14 w-full max-w-[1232px] mx-auto">
              
              {/* Header */}
              <div className="flex flex-col items-start gap-2 w-full max-w-[713px]">
                <h2
                  className="text-foreground"
                  style={{
                    fontFamily: 'var(--font-rethink-sans)',
                    fontWeight: 500,
                    fontSize: '36px',
                    lineHeight: '43px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Why Choose Antital?
                </h2>
                <p
                  className="text-muted-foreground"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 400,
                    fontSize: '18px',
                    lineHeight: '23px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  We've built the most secure, accessible, and transparent investment platform in Nigeria.
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 w-full">
                
                <FeatureCard
                  icon={Briefcase}
                  label="Everyone Can Invest"
                  title="Accessible to All"
                  description="Investment accessible to middle-class earners"
                  backgroundColor="#F2F1FE"
                  iconColor="#827499"
                />

                <FeatureCard
                  icon={ShieldCheck}
                  label="Maximum Security"
                  title="3-Layer Security"
                  description="Rigorous due diligence ensures only quality opportunities reach our platform"
                  backgroundColor="#FEF8EC"
                  iconColor="#926F28"
                />

                <FeatureCard
                  icon={TrendingUp}
                  label="Thoroughly Vetted"
                  title="6-Step Vetting Process"
                  description="Only the most promising ventures make it through"
                  backgroundColor="#EDF4FC"
                  iconColor="#2C5688"
                />

                <FeatureCard
                  icon={ArrowLeftRight}
                  label="Flexible Trading"
                  title="Easy Exits"
                  description="Exit your investments anytime through our trading platform"
                  backgroundColor="#F6FBEF"
                  iconColor="#628038"
                />

              </div>
            </div>
          </div>
        </section>

        {/* Ready to Start Building Wealth CTA Section */}
        <section className="w-full bg-background py-[62px]">
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
            <div 
              className="relative w-full max-w-[1232px] h-[361px] mx-auto bg-[#042E27] rounded-2xl overflow-visible flex items-center justify-center"
            >
              {/* Left Decorative Coins - Bottom Left */}
              <div 
                className="absolute hidden lg:block"
                style={{
                  left: '16px',
                  top: '118px',
                  width: '220px',
                  height: '226.25px',
                }}
              >
                <Image
                  src="/about_us/money_flower.png"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* Right Decorative Coins - Top Right */}
              <div 
                className="absolute hidden lg:block"
                style={{
                  left: '1040px',
                  top: '-6px',
                  width: '179.15px',
                  height: '216.98px',
                }}
              >
                <Image
                  src="/about_us/coins.png"
                  alt=""
                  fill
                  className="object-contain"
                  unoptimized
                />
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
                    Ready to Start Building Wealth?
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
                    Join thousands of Nigerians who are already investing in the future through Antital. Start your wealth creation journey today.
                  </p>
                </div>

                {/* CTA Button */}
                <button
                  className="flex items-center justify-center gap-2 px-4 py-2 w-[204px] h-[48px] bg-[#B9C65B] hover:bg-[#B9C65B]/90 rounded-lg transition-colors"
                >
                  <span
                    className="text-[#11110F]"
                    style={{
                      fontFamily: 'var(--font-rethink-sans)',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '21px',
                    }}
                  >
                    Explore Investment
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="#11110F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* More sections will go here */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

