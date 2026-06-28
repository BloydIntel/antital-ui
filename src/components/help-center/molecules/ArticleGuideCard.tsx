'use client';

import React from 'react';
import { TYPOGRAPHY } from '@/constants/styles';
import { Article } from '@/constants/helpData';

interface ArticleGuideCardProps {
  article: Article;
  onClick?: () => void;
}

export function ArticleGuideCard({ article, onClick }: ArticleGuideCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`rounded-md py-5.5 px-3.5  ${article.bgColor} h-[360px] flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow`}
    >
      <div className="mb-2">
        <h3 
          className="text-[20px] lg:text-[22px] text-[#1A1A1A] tracking-tight mb-2" 
          style={TYPOGRAPHY.heading}
        >
          {article.title}
        </h3>
        <span className="text-[14px] text-[#666666]" style={TYPOGRAPHY.body}>
          {article.readTime}
        </span>
      </div>

     <div 
        className="w-full h-[270px] rounded-md relative overflow-hidden flex flex-col justify-end p-4 select-none"
        style={{
          background: `linear-gradient(165deg, ${article.innerBg} 52%, ${article.splitDarkBg} 52.5%)`
        }}
      >
        {/* Fan-stacked Document Illustration Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[110px] h-[85px] mt-2">
            
            {/* 1. Fluid drop shadow layer under the paper stack */}
            <div className="absolute inset-0 bg-black/15 rounded-sm transform rotate-[-8deg] translate-y-1.5 scale-95 blur-[0.5px]" />

            {/* 2. Secondary underlying accented paper layer */}
            <div 
              className="absolute inset-0 rounded-sm transform rotate-[8deg] translate-y-0.5 opacity-90" 
              style={{ backgroundColor: article.paperAccentBg }}
            />

            {/* 3. Primary Top White Sheet Asset */}
            <div className="absolute inset-0 bg-white rounded-sm transform rotate-[-12deg] p-3 flex flex-col gap-1.5 shadow-xs">
              {/* Simplified mock document body lines */}
              <div className="w-[85%] h-1 bg-[#4A5D2E]/15 rounded-full" />
              <div className="w-[70%] h-1 bg-[#4A5D2E]/15 rounded-full" />
              <div className="w-[50%] h-1 bg-[#4A5D2E]/15 rounded-full" />
            </div>

          </div>
        </div>

        <span 
          className="text-white text-[14px] tracking-wide relative z-10"
          style={TYPOGRAPHY.body}
        >
          {article.id}
        </span>
      </div>
    </div>
  );
}