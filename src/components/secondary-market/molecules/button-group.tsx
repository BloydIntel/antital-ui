import React from 'react';
import { ArrowButton } from '../atoms/arrow-button';
import { cn } from '@/lib/utils';

interface ButtonGroupProps {
  primaryHref: string;
  primaryText: string;
  secondaryHref: string;
  secondaryText: string;
  className?: string;
}

export function ButtonGroup({
  primaryHref,
  primaryText,
  secondaryHref,
  secondaryText,
  className,
}: ButtonGroupProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4 w-full sm:w-auto', className)}>
      <ArrowButton href={primaryHref} showArrow className="w-full sm:w-[156px]">
        {primaryText}
      </ArrowButton>
      <ArrowButton href={secondaryHref} showArrow={false} className="w-full sm:w-[116px]">
        {secondaryText}
      </ArrowButton>
    </div>
  );
}

