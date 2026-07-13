"use client"

import React from 'react'
import { Search, History } from 'lucide-react'

interface DocumentSearchBarProps {
    value: string
    onChange: (val: string) => void
    onHistoryClick?: () => void
}

export function DocumentSearchBar({ value, onChange, onHistoryClick }: DocumentSearchBarProps) {
    const isHistoryDisabled = !onHistoryClick

    return (
        <div className="w-full flex items-center justify-between gap-4 mb-6">

            {/* Custom Framed Search Input Field Wrapper */}
            <div className="relative max-w-sm w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171]" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search document"
                    className="w-full h-10 pl-10 pr-4 bg-[#EAEAEA]/60 hover:bg-[#EAEAEA]/90 focus:bg-white border-transparent focus:border-[#EAEAEA] rounded-lg text-sm text-[#1B1B1B] placeholder-[#717171] outline-none transition-all"
                />
            </div>

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