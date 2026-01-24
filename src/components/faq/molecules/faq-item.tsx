import React, { useState } from 'react';
import { ToggleIcon } from '@/components/faq/atoms/toggle-icon';
import { cn } from '@/lib/utils';

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'flex flex-col items-start border-b border-[#D3D3D3] rounded transition-all py-4 px-5 w-full'
      )}
    >
      {/* Question and Answer Container - Icons aligned from top */}
      <div className="flex flex-row justify-between items-start w-full">
        {/* Left Side - Question and Answer */}
        <div className={cn(
          'flex flex-col items-start flex-1',
          isOpen && 'gap-4' // Gap only when open
        )}>
          {/* Question */}
          <h3
            className="text-[#F5F5F5] cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              fontFamily: 'var(--font-rethink-sans)',
              fontSize: '24px',
              lineHeight: '29px',
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
          >
            {question}
          </h3>

          {/* Answer - Only show when open */}
          {isOpen && (
            <p
              className="text-[#D3D3D3]"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontSize: '16px',
                lineHeight: '21px',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}
            >
              {answer}
            </p>
          )}
        </div>

        {/* Right Side - Toggle Icon - Fixed position from top */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
          style={{ minWidth: '24px', minHeight: '24px' }}
          aria-label={isOpen ? 'Collapse' : 'Expand'}
        >
          <ToggleIcon isOpen={isOpen} />
        </button>
      </div>
    </div>
  );
}

