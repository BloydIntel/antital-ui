import React from 'react';
import { cn } from '@/lib/utils';

interface ContentBlockProps {
  label: string;
  heading: string;
  description: string;
  className?: string;
}

export function ContentBlock({ label, heading, description, className }: ContentBlockProps) {
  return (
    <div className={cn('flex flex-col items-start gap-4 w-full min-w-0', className)}>
      {/* Label */}
      <p
        className="font-dm-sans font-normal text-sm sm:text-base leading-[17px] tracking-[-0.01em] text-[#F4F5F7] w-full"
      >
        {label}
      </p>

      {/* Heading */}
      <h2
        className="font-rethink-sans font-medium tracking-[-0.01em] text-[#F4F5F7] w-full"
        style={{
          fontSize: 'clamp(32px, 4vw, 64px)', // Responsive, max 64px - reduced from 5vw to 4vw for better fit
          lineHeight: '1.1', // Better line height for responsive
          wordWrap: 'normal', // Wrap whole words, don't break them mid-word
          overflowWrap: 'break-word', // Only break if word is extremely long
          hyphens: 'none', // Prevent automatic hyphenation - wrap whole words instead
          maxWidth: '100%',
        }}
      >
        {heading}
      </h2>

      {/* Description */}
      <p
        className="font-dm-sans font-normal text-base sm:text-lg leading-[1.3] tracking-[-0.01em] text-[#A8A8A8] w-full max-w-[570px] break-words"
      >
        {description}
      </p>
    </div>
  );
}

