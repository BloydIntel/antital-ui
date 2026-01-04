import React from 'react';

interface FeatureLabelProps {
  label: string;
}

export function FeatureLabel({ label }: FeatureLabelProps) {
  return (
    <div 
      className="flex items-center justify-center px-2 py-1 h-[32px] bg-white border border-[#A8A8A8] rounded-sm"
    >
      <span
        className="text-[#3D3D3D]"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '16px',
        }}
      >
        {label}
      </span>
    </div>
  );
}


