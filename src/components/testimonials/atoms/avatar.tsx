import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export function Avatar({ src, alt, className }: AvatarProps) {
  return (
    <div className={cn('w-14 h-14 rounded-sm overflow-hidden flex-shrink-0', className)}>
      <Image
        src={src}
        alt={alt}
        width={56}
        height={56}
        className="w-full h-full object-cover"
        unoptimized
      />
    </div>
  );
}

