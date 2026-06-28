"use client"

import React, { useState } from 'react';
import { CategoryTab } from '@/components/faq/atoms/category-tab';
import { FaqItem } from '@/components/faq/molecules/faq-item';
import { TYPOGRAPHY } from '@/constants/styles';
import { cn } from '@/lib/utils';

// FAQ data organized by category
const faqData = {
  general: [
    {
      question: 'Is Antital regulated and safe?',
      answer: "Yes. We're SEC-compliant and registered with CBN for payment processing. All funds are held in NDIC-insured escrow accounts, and our platform uses blockchain verification for transparency.",
    },
    {
      question: 'What fees do you charge?',
      answer: 'We charge a small platform fee of 5% on successful investments. There are no hidden charges, and all fees are transparently displayed before you commit.',
    },
    {
      question: 'Can I withdraw my money anytime?',
      answer: 'Investments in startups are typically locked for a specific period. However, you can sell your shares on our secondary market to other investors if you need liquidity.',
    },
    {
      question: 'What happens if a startup fails?',
      answer: 'Startup investments carry inherent risks. If a startup fails, your investment may result in partial or total loss. We recommend diversifying your portfolio across multiple startups to mitigate risk.',
    },
    {
      question: 'What is the minimum investment amount per project?',
      answer: 'The minimum investment varies by project, but most opportunities start from ₦50,000. This makes it accessible for everyday Nigerians to participate in startup funding.',
    },
    {
      question: 'How are startups vetted before listing?',
      answer: 'Every startup undergoes rigorous due diligence including financial audits, business model validation, team assessment, and market analysis before being approved for listing.',
    },
    {
      question: 'How do I earn returns on my investment?',
      answer: 'Returns come through equity appreciation, profit sharing, or exit events like acquisitions. The return structure depends on the specific startup and investment terms.',
    },
    {
      question: 'Can I sell my investment before the project matures?',
      answer: 'Yes! Our secondary marketplace allows you to sell your shares to other investors, providing liquidity even before the investment period ends.',
    },
  ],
  pricing: [
    {
      question: 'What is the platform fee?',
      answer: 'We charge a 5% platform fee on successful investments. This covers due diligence, platform maintenance, and investor support services.',
    },
    {
      question: 'Are there any withdrawal fees?',
      answer: 'Standard bank transfers have no additional fees. However, instant withdrawals may incur a small processing fee depending on your bank.',
    },
    {
      question: 'Do founders pay to list?',
      answer: 'Founders pay a small listing fee to cover due diligence costs. Successful campaigns incur a 7.5% success fee on funds raised.',
    },
  ],
  security: [
    {
      question: 'How is my data protected?',
      answer: 'We use bank-grade encryption (256-bit SSL) to protect your data. All sensitive information is encrypted both in transit and at rest.',
    },
    {
      question: 'Is my money safe?',
      answer: 'Yes. All funds are held in NDIC-insured escrow accounts and are only released to startups upon meeting campaign goals and compliance requirements.',
    },
    {
      question: 'How do you prevent fraud?',
      answer: 'We employ KYC verification, blockchain transaction records, regular audits, and a multi-layer approval process to prevent fraudulent activities.',
    },
  ],
};

interface FAQProps {
  title?: string
  title2?: string
  titleStyle?: string
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  containerClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  toggleButtonClassname?: string;
}

const categories = [
  { id: 'general', label: 'General' },
  { id: 'pricing', label: 'Plans & Pricing' },
  { id: 'security', label: 'Privacy & Security' },
];

export function FAQ({ title, title2, titleStyle, activeTabClassName, inactiveTabClassName, containerClassName, questionClassName, answerClassName, toggleButtonClassname }: FAQProps) {
  const [activeCategory, setActiveCategory] = useState<'general' | 'pricing' | 'security'>('general');

  return (
    <section >
      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col items-start gap-20">
          {/* Header */}
          <div className="flex flex-col items-start max-w-[420px]">
            <h2
              className={cn("text-[#B9C65B] text-[36px]", titleStyle)}
              style={TYPOGRAPHY.heading}
            >
              {title || "Your Questions Answered"}
            </h2>
            {title2 && <h2 className={cn(titleStyle)} style={TYPOGRAPHY.heading}>{title2}</h2>}
          </div>

          {/* Content Container - Categories and FAQs */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[200px] xl:gap-[300px] w-full">
            {/* Left Side - Category Tabs */}
            <div className="flex flex-col items-start gap-4 w-full lg:w-[330px]">
              {categories.map((category) => (
                <CategoryTab
                  key={category.id}
                  label={category.label}
                  activeTabClassName={activeTabClassName}
                  inactiveTabClassName={inactiveTabClassName}
                  isActive={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id as 'general' | 'pricing' | 'security')}
                />
              ))}
            </div>

            {/* Right Side - FAQ Items */}
            <div className="flex flex-col items-start w-full">
              {faqData[activeCategory].map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  defaultOpen={index === 0 && activeCategory === 'general'}
                  containerClassName={containerClassName}
                  questionClassName={questionClassName}
                  answerClassName={answerClassName}
                  toggleButtonClassname={toggleButtonClassname}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

