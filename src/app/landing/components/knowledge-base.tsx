"use client"

import React from 'react';
import { ArticleCard } from '@/components/knowledge-base/molecules/article-card';

// Article data with colors from Figma
const articles = [
  {
    id: '1',
    title: 'The Future of Tech in West Africa',
    readTime: '9 minute read',
    imageUrl: '/knowledge_base/article_card.jpg',
    bgColor: '#C7DDF6', // Light Blue
    imageBgColor: '#4A90E2', // Blue
    href: '/knowledge-base/future-of-tech',
  },
  {
    id: '2',
    title: 'How to Assess a Startup for Investment',
    readTime: '9 minute read',
    imageUrl: '/knowledge_base/article_card2.jpg',
    bgColor: '#E3F2CD', // Light Green
    imageBgColor: '#8EA011', // Green
    href: '/knowledge-base/assess-startup',
  },
  {
    id: '3',
    title: 'Equity Crowdfunding 101',
    readTime: '10 minute read',
    imageUrl: '/knowledge_base/article_card3.jpg',
    bgColor: '#D6D2FA', // Light Purple
    imageBgColor: '#1B1B18', // Dark with purple accent
    href: '/knowledge-base/equity-crowdfunding',
  },
  {
    id: '4',
    title: 'Understanding Term Sheets',
    readTime: '12 minute read',
    imageUrl: '/knowledge_base/article_card4.jpg',
    bgColor: '#FCE9C4', // Light Amber
    imageBgColor: '#434343', // Dark Gray
    href: '/knowledge-base/term-sheets',
  },
];

export function KnowledgeBase() {
  return (
    <section className="w-full py-[146px] bg-background">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-12 xl:px-[104px]">
        {/* Header Container */}
        <div className="flex flex-col items-start gap-2 mb-[56px] max-w-[600px]">
          {/* Header Title */}
          <h2 className="font-rethink-sans font-medium text-[36px] leading-[43px] tracking-[-0.01em] text-foreground">
            Become a smarter investor.
          </h2>
          {/* Header Description */}
          <p className="font-dm-sans font-normal text-lg leading-[23px] tracking-[-0.01em] text-muted-foreground">
            Our Knowledge Base provides everything you need to know about equity crowdfunding, risk management, and the African startup ecosystem.
          </p>
        </div>

        {/* Article Cards Container - gap: 16px from Figma */}
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              readTime={article.readTime}
              imageUrl={article.imageUrl}
              bgColor={article.bgColor}
              imageBgColor={article.imageBgColor}
              href={article.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

