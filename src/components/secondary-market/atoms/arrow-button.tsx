"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArrowButtonProps {
  href: string;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export function ArrowButton({ href, children, showArrow = true, className }: ArrowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 h-12 rounded-lg transition-all duration-300',
        'border border-[#A8A8A8] text-[#F4F5F7] bg-transparent',
        'hover:bg-[#A7B832] hover:border-[#A7B832] hover:text-[#042E27]',
        'font-rethink-sans font-medium text-base leading-[21px]',
        className
      )}
    >
      <span>{children}</span>
      {showArrow && <ArrowRight className="w-6 h-6" />}
    </Link>
  );
}

