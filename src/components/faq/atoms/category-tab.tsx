import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function CategoryTab({ label, isActive, onClick }: CategoryTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-start w-full h-12 px-3 rounded transition-colors',
        isActive
          ? 'bg-[#DCE3AD] text-[#2A2E0C]'
          : 'bg-transparent text-[#F5F5F5] hover:bg-[#042E27]/50'
      )}
      style={{
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 400,
        letterSpacing: '-0.01em',
      }}
    >
      {label}
    </button>
  );
}

