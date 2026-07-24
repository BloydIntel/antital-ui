"use client"

import React from 'react'
import { History } from 'lucide-react'
import { SearchInputBar } from '@/components/watchlist/organisms/SearchInputBar'

interface DocumentSearchBarProps {
    value: string
    onChange: (val: string) => void
    onHistoryClick?: () => void
}

export function DocumentSearchBar({ value, onChange, onHistoryClick }: DocumentSearchBarProps) {
    const isHistoryDisabled = !onHistoryClick

    return (
        <div className="w-full flex items-center justify-between gap-4 mb-6">

            <SearchInputBar
                value={value}
                onChange={onChange}
                placeholder="Search document"
                inputClassName='bg-[#EAEAEA] placeholder:text-[#2C2C2C]'
                containerClassName='max-w-[344px]'
                iconClassName='text-[#2C2C2C]'
            />

            {/* Historical Audit Log Link Trigger */}
            <button
                type="button"
                onClick={onHistoryClick}
                disabled={isHistoryDisabled}
                aria-label="View document history"
                className="p-2 text-[#717171] hover:text-[#1B1B1B] rounded-lg transition-colors cursor-pointer hover:bg-[#F9FAFB] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
                <History className="w-5 h-5 stroke-[1.75]" aria-hidden="true" />
            </button>

        </div>
    )
}