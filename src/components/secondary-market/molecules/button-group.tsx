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
    <div className={cn('flex flex-row items-start gap-4', className)}>
      <ArrowButton href={primaryHref} showArrow className="w-[156px]">
        {primaryText}
      </ArrowButton>
      <ArrowButton href={secondaryHref} showArrow={false} className="w-[116px]">
        {secondaryText}
      </ArrowButton>
    </div>
  );
}

