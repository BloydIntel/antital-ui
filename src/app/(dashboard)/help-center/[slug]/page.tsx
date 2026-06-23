'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { HELP_DETAILS_MAP } from '@/constants/helpData';
import { ArticleGuideCard } from '@/components/help-center/molecules/ArticleGuideCard';
import { TYPOGRAPHY } from '@/constants/styles';

export default function HelpCategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === 'string' ? params.slug : 'account-setup';

  // Fallback gracefully if an obscure slug string pattern is used
  const detail = HELP_DETAILS_MAP[slug] || HELP_DETAILS_MAP['account-setup'];

  // Re-map the specific target sub-faqs into the generic matrix shape for the FAQ component structure
  // const formattedCustomFaqData = {
  //   general: detail.faqs
  // };

  // const alternativeCategories = [
  //   { id: 'general', label: detail.title }
  // ];

  const handleArticleClick = (articleId: string) => {
    // Ready for future sub-article reading routes if needed: e.g., router.push(`/help-center/${slug}/${articleId}`)
    console.log(`Navigating to article: ${articleId}`);
  };

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen pb-20">
      <div className="max-w-[1440px] mx-auto">

        {/* Back Navigation Heading Header */}
        <button
          onClick={() => router.push('/help-center')}
          className="flex items-center gap-2 text-[#1A1A1A] hover:opacity-80 transition-opacity mb-2 group cursor-pointer"
        >
          <ArrowLeft className="hidden lg:block w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-[24px] lg:text-[28px] text-[#1B1B1B] tracking-tight" style={TYPOGRAPHY.heading}>
            {detail.title}
          </span>
        </button>

        <p className="text-[14px] lg:text-[16px] text-[#505050] mb-12" style={TYPOGRAPHY.body}>
          {detail.description}
        </p>

        {/* Section: Articles & Guides */}
        <div className="mb-12">
          <h2 className="text-[20px] font-medium text-[#1A1A1A] mb-6" style={TYPOGRAPHY.heading}>
            Articles & Guides
          </h2>

          {/* Clean Mapped Child Component Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.articles.map((article, idx) => (
              <ArticleGuideCard
                key={idx}
                article={article}
                onClick={() => handleArticleClick(article.id)}
              />
            ))}
          </div>
        </div>

        {/* Integrated Customizable Light-Faq Render Area block */}
        <div className="pt-1">
          {/* Section Main Header Label */}
          <h2
            className="text-[20px] text-[#505050] tracking-tight mb-4"
            style={TYPOGRAPHY.body}
          >
            Frequently Asked Questions
          </h2>

          {/* Row List Wrapper */}
          <div className="flex flex-col gap-2">
            {detail.faqs.map((faq, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-2"
              >
                {/* Left Side Question Node */}
                <div className="md:col-span-5">
                  <h3
                    className="text-[18px] lg:text-[24px] text-[#1A1A1A] leading-[32px] tracking-tight"
                    style={TYPOGRAPHY.heading}
                  >
                    {faq.question}
                  </h3>
                </div>

                {/* Right Side Answer Paragraph Block */}
                <div className="md:col-span-7 md:pl-4">
                  <p
                    className="text-[16px] text-[#4E4E4E] leading-[26px] font-normal"
                    style={TYPOGRAPHY.body}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}