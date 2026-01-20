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
    <div className={cn('flex flex-col items-start gap-4', className)}>
      {/* Label */}
      <p
        className="font-dm-sans font-normal text-sm leading-[17px] tracking-[-0.01em] text-[#F4F5F7]"
      >
        {label}
      </p>

      {/* Heading */}
      <h2
        className="font-rethink-sans font-medium leading-[66px] tracking-[-0.01em] text-[#F4F5F7]"
        style={{
          fontSize: 'clamp(48px, 6vw, 64px)', // Responsive, max 64px
          lineHeight: '1.025', // // 82/80 = 102.5%  
        }}
      >
        {heading}
      </h2>

      {/* Description */}
      <p
        className="font-dm-sans font-normal text-lg leading-[23px] tracking-[-0.01em] text-[#A8A8A8] max-w-[570px]"
      >
        {description}
      </p>
    </div>
  );
}

