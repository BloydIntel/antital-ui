import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToggleIconProps {
  isOpen: boolean;
  toggleButtonClassname?: string
}

export function ToggleIcon({ isOpen, toggleButtonClassname }: ToggleIconProps) {
  return (
    <div className={cn(
      "w-6 h-6 flex items-center justify-center flex-shrink-0",
      toggleButtonClassname || "text-[#F5F5F5]"
    )}>
      {isOpen ? (
        <Minus className="w-full h-full" strokeWidth={2} />
      ) : (
        <Plus className="w-full h-full" strokeWidth={2} />
      )}
    </div>
  );
}

