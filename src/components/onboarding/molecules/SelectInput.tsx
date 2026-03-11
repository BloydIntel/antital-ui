"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

export interface SelectOption {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: readonly SelectOption[];
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
    label?: string;
    error?: string;
    selectAreaStyle?: string
}

export function SelectInput({
    options,
    value,
    placeholder,
    onChange,
    className = "",
    label,
    error,
    selectAreaStyle = ''
}: SelectInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const displayPlaceholder = placeholder || options[0]?.label


    const selectElement = (
        <div className="relative w-full">
            <select
                className={`w-full h-[48px] px-4 rounded-lg text-sm appearance-none outline-none cursor-pointer transition-all 
                            ${selectAreaStyle || 'bg-[#F4F5F7] border-transparent'} 
                            ${error ? 'border-red-500' : 'focus:border-[#042E27]'} 
                            ${!value ? 'text-[#858585]' : 'text-[#1A1A1A]'}`}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                onChange={(e) => {
                    setIsOpen(false);
                    if (onChange) onChange(e.target.value);
                }}
                value={value || ""}
            >
                <option value="" disabled>
                    {displayPlaceholder}
                </option>

                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            <div
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#323232] pointer-events-none transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
            >
                <ChevronDown size={20} />
            </div>
        </div>
    );

    return (
        <div className={`w-full flex flex-col gap-2 pb-[16px] ${className}`}>
            {label && (
                <label
                    className="text-[16px] text-[#1A1A1A] leading-tight"
                    style={TYPOGRAPHY.body}
                >
                    {label}
                </label>
            )}
            {selectElement}
            {error && <span className="text-xs text-red-500 font-[family-name:var(--font-dm-sans)]">{error}</span>}
        </div>
    );
}