import React from 'react';
import { Avatar } from '@/components/testimonials/atoms/avatar';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle: string;
  avatarSrc: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorTitle,
  avatarSrc,
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn('flex flex-col items-start gap-10 w-[625px] h-[320px]', className)}>
      {/* Testimonial Text with Quote Mark */}
      <div className="relative w-full">
        {/* Large Opening Quote Mark - positioned at top left with rotation */}
        <div 
          className="text-[#3D3D3D] leading-none mb-2 inline-block"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '96px',
            fontWeight: 400,
            lineHeight: '66px',
            transform: 'rotate(-8deg)',
            transformOrigin: 'center center',
          }}
        >
          &quot;
        </div>

        {/* Testimonial Text */}
        <blockquote
          className="text-[#3D3D3D]"
          style={{
            fontFamily: 'var(--font-rethink-sans)',
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '32px',
            letterSpacing: '-0.01em',
          }}
        >
          {quote}
        </blockquote>
      </div>

      {/* Author Info Container */}
      <div className="flex flex-col items-start gap-4 w-full">
        {/* Separator Line */}
        <div className="w-full h-px bg-[#C5CCFF]" />

        {/* Author Details */}
        <div className="flex flex-row items-center gap-4">
          <Avatar src={avatarSrc} alt={authorName} />
          
          <div className="flex flex-col items-start gap-2">
            {/* Author Name */}
            <p className="font-dm-sans font-medium text-base leading-[21px] text-[#2C2C2C]">
              {authorName}
            </p>
            {/* Author Title */}
            <p className="font-dm-sans font-normal text-sm leading-[17px] tracking-[-0.01em] text-[#7BA147]">
              {authorTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

