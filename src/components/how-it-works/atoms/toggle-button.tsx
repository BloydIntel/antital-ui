"use client"

import React from 'react'

interface ToggleButtonProps {
  options: [string, string]
  activeOption: number
  onChange: (index: number) => void
}

export function ToggleButton({ options, activeOption, onChange }: ToggleButtonProps) {
  return (
    <div
      className="flex items-center bg-white border border-[#EAEAEA] rounded"
      style={{
        padding: '4px 8px 4px 4px',
        width: '205px',
        height: '33px',
        gap: '8px',
      }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`flex items-center justify-center rounded transition-all duration-300 whitespace-nowrap ${
            activeOption === index
              ? 'bg-[#365852] text-white'
              : 'bg-transparent text-[#505050] hover:text-[#212121]'
          }`}
          style={{
            padding: '4px 10px',
            height: '25px',
            minWidth: index === 0 ? '98px' : '89px',
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '17px',
            letterSpacing: '-0.01em',
          }}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

