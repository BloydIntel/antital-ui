import React from 'react';
import { LucideIcon } from 'lucide-react';
import { FeatureIcon } from '@/components/about/atoms/feature-icon';
import { FeatureLabel } from '@/components/about/atoms/feature-label';

interface FeatureCardProps {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  backgroundColor: string;
  iconColor: string;
}

export function FeatureCard({ 
  icon, 
  label, 
  title, 
  description, 
  backgroundColor, 
  iconColor 
}: FeatureCardProps) {
  return (
    <div 
      className="flex flex-col justify-center items-center p-6 lg:p-[24px_16px] gap-8 w-full lg:w-[296px] h-[324px] rounded-lg"
      style={{ backgroundColor }}
    >
      {/* Icon and Label */}
      <div className="flex flex-col items-center gap-4">
        <FeatureIcon 
          icon={icon} 
          backgroundColor={backgroundColor} 
          iconColor={iconColor} 
        />
        <FeatureLabel label={label} />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Title */}
        <h4
          className="text-[#1F1F1F] text-center"
          style={{
            fontFamily: 'var(--font-rethink-sans)',
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '29px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h4>

        {/* Description */}
        <p
          className="text-[#858585] text-center w-full"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '23px',
            letterSpacing: '-0.01em',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}


