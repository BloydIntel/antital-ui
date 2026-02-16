"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    label: string;
    value: string;
}

interface SelectInputProps {
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
    label?: string;
    error?: string;
}

export function SelectInput({
    options,
    placeholder = "Select an option",
    onChange,
    className = "",
    label,
    error,
}: SelectInputProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectElement = (
        <div className="relative w-full">
            <select
                className="w-full h-[48px] px-4 bg-[#F4F5F7] border-none rounded-lg text-sm appearance-none outline-none cursor-pointer text-[#323232]"
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                onChange={(e) => {
                    setIsOpen(false);
                    if (onChange) onChange(e.target.value);
                }}
                defaultValue=""
            >
                {/* Placeholder */}
                <option value="" disabled hidden>
                    {placeholder}
                </option>

                {/* Dynamic Options */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Animated Chevron */}
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
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                        letterSpacing: "-1%",
                    }}
                >
                    {label}
                </label>
            )}
            {selectElement}
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
}