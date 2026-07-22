'use client';

import React from 'react';
import { FileText, Download } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

export interface TaxDocumentItem {
    id: string;
    title: string;
    date: string;
    status: 'VERIFIED' | 'UNVERIFIED';
    downloadUrl?: string;
}

interface TaxDocumentCardProps {
    document: TaxDocumentItem;
    onDownload?: (doc: TaxDocumentItem) => void;
}

export function TaxDocumentCard({ document, onDownload }: TaxDocumentCardProps) {
    const isVerified = document.status === 'VERIFIED';

    return (
        <div className="bg-[#F4F5F7] rounded-lg p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4 w-full max-w-full overflow-hidden">
            {/* Left Column: Icon + Title & Date */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1">
                {/* File Icon Box */}
                <div className="p-2 sm:p-3 bg-[#F9FAFB] rounded-md shrink-0">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#1B1B1B]" />
                </div>

                {/* Title & Date */}
                <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                    <h4 className="text-[14px] sm:text-[16px] text-[#505050] truncate" style={{ ...TYPOGRAPHY.body, fontWeight: 700 }}>
                        {document.title}
                    </h4>
                    <p className="text-[12px] sm:text-[14px] text-[#858585] truncate" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                        {document.date}
                    </p>
                </div>
            </div>

            {/* Right Column: Status Badge & Download Action */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                <span className={`text-[10px] sm:text-[12px] lg:text-[14px] font-bold px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-2 rounded-full tracking-wider uppercase whitespace-nowrap ${isVerified
                    ? 'bg-[#D2EED9] text-[#34C759]'
                    : 'bg-[#FFE8E5] text-[#D4001A]'
                    }`}>
                    {document.status}
                </span>

                <button
                    type="button"
                    onClick={() => onDownload?.(document)}
                    className="p-1.5 sm:p-2 text-[#858585] hover:text-[#1B1B1B] hover:bg-white rounded-lg transition-colors cursor-pointer shrink-0"
                    aria-label={`Download ${document.title}`}
                >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
            </div>
        </div>
    );
}