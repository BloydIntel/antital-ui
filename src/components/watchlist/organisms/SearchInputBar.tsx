'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    containerClassName?: string;
    inputClassName?: string;
    placeholderClassName?: string;
    iconClassName?: string;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
}

export function SearchInputBar({
    value,
    onChange,
    placeholder = "Search for anything...",
    containerClassName,
    inputClassName,
    placeholderClassName = "placeholder:text-[#A2A3A1]",
    iconClassName = "text-[#A2A3A1]",
    iconPosition = 'right',
    disabled = false,
}: SearchInputProps) {

    const isLeft = iconPosition === 'left';

    return (
        <div className={cn(
            "relative flex-1 md:min-w-[280px] lg:min-w-[320px]",
            containerClassName
        )}>
            <Input
                type="search"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    "w-full h-[37px] border-[#EAEAEA] rounded-md text-[14px] transition-all",
                    "bg-white focus-visible:ring-1 focus-visible:ring-[#042E27]",
                    isLeft ? "pl-10 pr-4" : "pl-4 pr-10",
                    placeholderClassName,
                    inputClassName
                )}
                style={TYPOGRAPHY.body}
            />
            <Search
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors",
                    isLeft ? "left-3" : "right-3",
                    iconClassName
                )}
            />
        </div>
    );
}