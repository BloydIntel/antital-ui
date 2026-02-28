"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [showDisclaimers, setShowDisclaimers] = useState(false);
  return (
    <footer className="w-full bg-[#11110F] py-16">
      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px] flex flex-col gap-16">
        
        {/* Top Section - Still Have Questions + Contact Info + Social */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[104px]">
          
          {/* Left - Still Have Questions */}
          <div className="flex flex-col items-start gap-4 w-full lg:w-[337px]">
            <h2
              className="text-[#B9C65B]"
              style={{
                fontFamily: 'var(--font-rethink-sans)',
                fontSize: '36px',
                lineHeight: '43px',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              Still Have Questions?
            </h2>
            <p
              className="text-[#F7F7F7]"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                lineHeight: '21px',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              Our support team responds within 24 hours.
            </p>
          </div>

          {/* Middle - Contact Info */}
          <div className="flex flex-col md:flex-row items-start gap-10 flex-1">
            {/* Live Chat */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start gap-2">
                <p className="text-[#F7F7F7] font-medium text-base">Live Chat</p>
                <p className="text-[#C5C9D1] text-sm leading-[17px]">
                  Get instant support from our team.
                </p>
              </div>
              <Button
                className="bg-transparent border border-[#B9C65B] text-[#F7F7F7] hover:bg-[#B9C65B] hover:text-[#11110F] transition-all duration-300"
                style={{
                  width: '176px',
                  height: '51px',
                  padding: '16px 24px',
                  borderRadius: '4px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '16px',
                  lineHeight: '19px',
                }}
                asChild
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-[#C5C9D1]" />
                <span className="text-[#C5C9D1] text-sm">hello@antital.com</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-[#C5C9D1]" />
                <span className="text-[#C5C9D1] text-sm">+234 (0) 800 ANTITAL</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-[#C5C9D1]" />
                <span className="text-[#C5C9D1] text-sm">Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-start gap-[14px]">
              <Link 
                href="https://facebook.com/antital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#B9C65B] transition-colors group"
              >
                <Facebook className="w-6 h-6 text-[#C5C9D1] group-hover:text-[#B9C65B] transition-colors" />
                <span className="text-[#C5C9D1] text-sm group-hover:text-[#B9C65B] transition-colors">@antital</span>
              </Link>
              <Link 
                href="https://twitter.com/antital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#B9C65B] transition-colors group"
              >
                <Twitter className="w-6 h-6 text-white group-hover:text-[#B9C65B] transition-colors" />
                <span className="text-[#C5C9D1] text-sm group-hover:text-[#B9C65B] transition-colors">@antital</span>
              </Link>
              <Link 
                href="https://instagram.com/antital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#B9C65B] transition-colors group"
              >
                <Instagram className="w-6 h-6 text-white group-hover:text-[#B9C65B] transition-colors" />
                <span className="text-[#C5C9D1] text-sm group-hover:text-[#B9C65B] transition-colors">@antital</span>
              </Link>
              <Link 
                href="https://linkedin.com/company/antital" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 hover:text-[#B9C65B] transition-colors group"
              >
                <Linkedin className="w-6 h-6 text-white group-hover:text-[#B9C65B] transition-colors" />
                <span className="text-[#C5C9D1] text-sm group-hover:text-[#B9C65B] transition-colors">@antital</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#F7F7F7]/20" />

        {/* Bottom Section - Logo, Links, Copyright */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-[119px]">
          
          {/* Left - Logo + Disclaimer + Copyright */}
          <div className="flex flex-col items-start gap-4 w-full lg:w-[416px]">
            {/* Logo */}
            <Link href="/" className="cursor-pointer">
              <Image
                src="/icons/antital_white.svg"
                alt="Antital"
                width={140}
                height={42}
                className="h-[42px] w-auto"
                unoptimized
              />
            </Link>

            {/* Disclaimer */}
            <p className="text-[#C5C9D1] text-sm leading-[17px]">
              Antital is registered with the Securities and Exchange Commission (SEC) Nigeria and compliant with all applicable regulations. All investments carry risk of loss. Past performance does not guarantee future results.
            </p>
          </div>

          {/* Right - Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-[40px] flex-1">
            
            {/* Quick Links */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-[#F7F7F7] font-medium text-base">Quick Links</h3>
              <div className="flex flex-col items-start gap-2">
                <Link href="/about" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  About Us
                </Link>
                <Link href="/how-it-works" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  How It Works
                </Link>
                <Link href="/investments" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Investment Opportunities
                </Link>
                <Link href="/knowledge-base" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Knowledge Base
                </Link>
                <Link href="/help" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Help Centre
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-[#F7F7F7] font-medium text-base">Support</h3>
              <div className="flex flex-col items-start gap-2">
                <Link href="/faqs" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  FAQs
                </Link>
                <Link href="/contact" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Contact Suport
                </Link>
                <Link href="/privacy" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-[#F7F7F7] font-medium text-base">Legal</h3>
              <div className="flex flex-col items-start gap-2">
                <Link href="/terms-of-service" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/risk-disclosure" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  Risk Disclosure
                </Link>
                <Link href="/sec-compliance" className="text-[#C5C9D1] text-sm hover:text-[#B9C65B] transition-colors">
                  SEC Compliance
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="w-full pt-8">
          <div className="relative">
            {/* Disclaimer Content - Always show preview, expand on click */}
            <div className="flex flex-col gap-4 pb-4">
              <div className="text-[#C5C9D1] text-xs leading-[17px] space-y-3">
                {/* Preview - Always visible */}
                <div className={showDisclaimers ? '' : 'relative pb-16'}>
                  <div className={showDisclaimers ? '' : 'opacity-100'}>
                    <p>
                      *Includes funds deployed through investment platforms, funds, and firms within the Antital ecosystem.
                    </p>
                    <p>
                      1 Represents users of antital.com, limited partners of Antital Capital Adviser vehicles, and clients of other affiliates.
                    </p>
                    <p>
                      2 Includes aggregate figures from Antital platform to date, including investment opportunities presented by Antital Portal LLC, Antital Broker LLC, and Antital Core LLC.
                    </p>
                    <p>
                      The testimonials, statements, and opinions presented here are applicable to the individuals depicted. Unique experiences and past performances do not guarantee future results.
                    </p>
                  </div>

                  {/* Floating Button - Only visible when collapsed */}
                  {!showDisclaimers && (
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center pt-8 pb-2" style={{ background: 'linear-gradient(to bottom, rgba(17, 17, 15, 0), rgba(17, 17, 15, 0.95) 30%, #11110F)' }}>
                      <Button
                        variant="outline"
                        onClick={() => setShowDisclaimers(true)}
                        className="border-[#C5C9D1] text-[#C5C9D1] hover:bg-[#C5C9D1]/10 hover:text-[#F7F7F7] bg-[#11110F] rounded-md"
                        style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '14px',
                          lineHeight: '17px',
                          fontWeight: 400,
                          padding: '8px 16px',
                        }}
                      >
                        Show disclaimers
                      </Button>
                    </div>
                  )}
                </div>

                {/* Full Content - Only visible when expanded */}
                {showDisclaimers && (
                  <>
                    <p>
                      This site (the &quot;Site&quot;) is owned and maintained by Antital Inc., which is not a registered broker-dealer. Antital Inc. does not give investment advice, endorsement, analysis or recommendations with respect to any securities. All securities listed here are being offered by, and all information included on this Site is the responsibility of, the applicable issuer of such securities. The intermediary facilitating the offering will be identified in such offering&apos;s documentation.
                    </p>
                    <p>
                      All related securities activity is conducted by Antital Broker LLC, a registered broker-dealer, Member of SEC Nigeria, an affiliate of Antital Inc. and Antital Portal LLC, located in Lagos, Nigeria. Please check our background on SEC Nigeria&apos;s database.
                    </p>
                    <p>
                      Certain pages discussing the mechanics and providing educational materials regarding equity crowdfunding offerings may refer to Antital Broker LLC and Antital Portal LLC collectively as &quot;Antital&quot;, solely for explanatory purposes.
                    </p>
                    <p>
                      Neither Antital Inc., Antital Portal LLC nor Antital Broker LLC make investment recommendations and no communication, through this Site, or in any other medium, should be construed as a recommendation for any security offered on or off this investment platform. Investment opportunities posted on this Site are private placements of securities that are not publicly traded, involve a high degree of risk, may lose value including the total loss of invested capital, are subject to holding period requirements and are intended for investors who do not need a liquid investment. Past performance is not indicative of future results. Investors must be able to afford the loss of their entire investment. Only qualified investors, who understand the risks of early-stage investment and who meet Antital&apos;s investment criteria may invest. Investors may be restricted to only Accredited Investors or non-Nigerian persons, to invest in offerings hosted by Antital Broker.
                    </p>
                    <p>
                      Neither Antital Inc., Antital Portal LLC nor Antital Broker LLC, nor any of their officers, directors, agents and employees make any warranty, express or implied, of any kind whatsoever related to the adequacy, accuracy or completeness of any information on this Site or the use of information on this site. Offers to sell securities can only be made through official offering documents that contain important information about the investment and the issuers, including risks. Investors should carefully read the offering documents. Investors should conduct their own due diligence and are encouraged to consult with their tax, legal and financial advisors.
                    </p>
                    <p>
                      By accessing the Site and any pages thereof, you agree to be bound by Antital Portal&apos;s Terms of Use and Privacy Policy and/or Antital Broker&apos;s Terms of Use and Privacy Policy. All issuers offering securities under regulation crowdfunding as hosted by Antital Portal LLC are listed on the All Companies Page. The inclusion or exclusion of an issuer on the Platform Page and/or Antital&apos;s Homepage, which includes offerings conducted under regulation crowdfunding as well as other exemptions from registration, is not based upon any endorsement or recommendation by Antital Inc, Antital Portal LLC, or Antital Broker LLC, nor any of their affiliates, officers, directors, agents, and employees. Rather, issuers of securities may, in their sole discretion, opt-out of being listed on the Platform Page and Homepage.
                    </p>
                    <p>
                      Investors should verify any issuer information they consider important before making an investment.
                    </p>
                    <p>
                      Investments in private companies are particularly risky and may result in total loss of invested capital. Past performance of a security or a company does not guarantee future results or returns. Only investors who understand the risks of early stage investment and who meet Antital&apos;s investment criteria may invest.
                    </p>
                    <p>
                      Neither Antital Inc., Antital Portal LLC nor Antital Broker LLC verify information provided by companies on this Site and makes no assurance as to the completeness or accuracy of any such information. Additional information about companies fundraising on the Site can be found by searching the SEC Nigeria database, or the offering documentation located on the Site when the offering does not require an SEC filing.
                    </p>
                    <p>
                      Antital and its affiliates are not and do not operate or act as a bank. All funds are held in NDIC-insured escrow accounts. Digital assets and investment products are not insured by the NDIC, may lose value, and are not deposits or other obligations of any bank and are not guaranteed by any bank. Terms and conditions apply.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Show/Hide Disclaimers Button - Only visible when expanded */}
            {showDisclaimers && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDisclaimers(false)}
                  className="border-[#C5C9D1] text-[#C5C9D1] hover:bg-[#C5C9D1]/10 hover:text-[#F7F7F7] bg-transparent rounded-md"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontSize: '14px',
                    lineHeight: '17px',
                    fontWeight: 400,
                    padding: '8px 16px',
                  }}
                >
                  Hide disclaimers
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Copyright - At the very bottom */}
        <div className="w-full pt-8 border-t border-[#F7F7F7]/20">
          <p className="text-[#C5C9D1] text-sm leading-[17px] text-center">
            Copyright © 2025 Antital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

