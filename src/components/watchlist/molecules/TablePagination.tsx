'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: 'ordinary' | 'detailed';
    totalRecords?: number;
    pageSize?: number;
}

export function TablePagination({
    currentPage,
    totalPages,
    onPageChange,
    variant = 'ordinary',
    totalRecords = 0,
    pageSize = 7,
}: TablePaginationProps) {
    const handlePrevPage = () => {
        onPageChange(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        onPageChange(Math.min(currentPage + 1, totalPages));
    };

    if (variant === 'detailed') {
        const startRecord = totalRecords > 0 ? (currentPage - 1) * pageSize + 1 : 0;
        const endRecord = Math.min(currentPage * pageSize, totalRecords);

        // Render page numbers (e.g., [1, 2])
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

        return (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#EAEAEA] px-6 py-4 text-[12px] text-[#767676] gap-4">
                <span className="font-sans">
                    Showing {startRecord}-{endRecord} of {totalRecords.toLocaleString()} records
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="rounded-lg border border-[#00000014] px-3.5 py-1.5 text-[#0F221E] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        Previous
                    </button>

                    {pages.map((page) => {
                        const isActive = page === currentPage;
                        return (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`rounded-lg px-3 py-1.5 text-[12px] transition-colors cursor-pointer ${isActive
                                    ? "bg-[#042E27] text-white"
                                    : "border border-[#00000014] text-[#0F221E] hover:bg-gray-50"
                                    }`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className="rounded-lg border border-[#00000014] px-3.5 py-1.5 text-[#0F221E] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 bg-white border border-[#EAEAEA] rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                <ChevronLeft className="w-4 h-4 text-[#505050]" />
            </button>
            <span className="px-4 py-1.5 border border-[#EAEAEA] bg-white rounded-lg text-[14px] font-medium text-[#1A1C1E]">
                {currentPage}
            </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 bg-white border border-[#EAEAEA] rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                <ChevronRight className="w-4 h-4 text-[#505050]" />
            </button>
        </div>
    );
}