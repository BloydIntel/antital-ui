"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
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
                src="/icons/antital_logo_white.svg"
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

            {/* Divider */}
            <div className="w-full h-px bg-[#F7F7F7]/20" />

            {/* Copyright */}
            <p className="text-[#C5C9D1] text-sm leading-[17px]">
              Copyright © 2025 Antital. All rights reserved.
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
      </div>
    </footer>
  );
}

