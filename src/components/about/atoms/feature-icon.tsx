import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureIconProps {
  icon: LucideIcon;
  backgroundColor: string;
  iconColor: string;
}

export function FeatureIcon({ icon: Icon, backgroundColor, iconColor }: FeatureIconProps) {
  return (
    <div 
      className="flex items-center justify-center w-[80px] h-[80px] rounded-full"
      style={{ backgroundColor }}
    >
      <Icon className="w-12 h-12" style={{ color: iconColor }} strokeWidth={1.5} />
    </div>
  );
}

