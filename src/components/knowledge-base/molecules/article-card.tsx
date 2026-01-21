import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  title: string;
  readTime: string;
  imageUrl: string;
  bgColor: string;
  imageBgColor: string;
  href: string;
  className?: string;
}

export function ArticleCard({
  title,
  readTime,
  imageUrl,
  bgColor,
  imageBgColor,
  href,
  className,
}: ArticleCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col justify-between items-start w-full md:w-[296px] h-[448px] rounded transition-all duration-300 hover:scale-105',
        className
      )}
      style={{
        backgroundColor: bgColor,
        padding: '24px 16px',
        gap: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderRadius: '4px',
      }}
    >
      {/* Article Info */}
      <div className="flex flex-col items-start gap-2 w-[264px] h-[83px] mx-auto">
        {/* Article Title */}
        <h3 className="font-rethink-sans font-medium text-2xl leading-[29px] tracking-[-0.01em] text-[#2C2C2C] w-[264px]">
          {title}
        </h3>
        {/* Article Read Time */}
        <p className="font-dm-sans font-normal text-sm leading-[17px] tracking-[-0.01em] text-[#3D3D3D] w-[264px]">
          {readTime}
        </p>
      </div>

      {/* Article Image Container */}
      <div className="relative w-[264px] h-[304px] rounded overflow-hidden mx-auto" style={{ backgroundColor: imageBgColor, borderRadius: '4px' }}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="264px"
          unoptimized
        />
      </div>
    </Link>
  );
}

