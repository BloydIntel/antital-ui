import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ToggleIconProps {
  isOpen: boolean;
}

export function ToggleIcon({ isOpen }: ToggleIconProps) {
  return (
    <div className="w-6 h-6 text-[#F5F5F5] flex items-center justify-center flex-shrink-0">
      {isOpen ? (
        <Minus className="w-full h-full" strokeWidth={2} />
      ) : (
        <Plus className="w-full h-full" strokeWidth={2} />
      )}
    </div>
  );
}

