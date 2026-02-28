import React from 'react';
import Image from 'next/image';

interface ValueCardProps {
  title: string;
  description: string;
}

export function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div 
      className="flex flex-col justify-between items-end p-6 lg:p-[24px_16px] gap-6 w-full lg:w-[400.67px] h-[320px] bg-[#F2F1FE] border border-[#9BABA9] rounded transition-shadow duration-300 hover:shadow-[0px_4px_0px_#042E27]"
    >
      {/* Content */}
      <div className="flex flex-col items-start gap-6 w-full">
        <h3
          className="text-[#1F1F1F] w-full"
          style={{
            fontFamily: 'var(--font-rethink-sans)',
            fontWeight: 500,
            fontSize: '36px',
            lineHeight: '43px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <p
          className="text-[#2C2C2C] w-full"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
          }}
        >
          {description}
        </p>
      </div>

      {/* Logo */}
      <div className="ml-auto">
        <Image
          src="/icons/antital.svg"
          alt="Antital"
          width={108}
          height={32}
          className="w-[107.52px] h-[31.95px]"
          unoptimized
        />
      </div>
    </div>
  );
}
