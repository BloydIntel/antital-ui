'use client'

import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function TablePagination({
    currentPage,
    totalPages,
    onPageChange
}: TablePaginationProps) {

    const handlePrevPage = () => {
        onPageChange(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        onPageChange(Math.min(currentPage + 1, totalPages));
    };

    return (

        <div className="flex items-center gap-2">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 bg-white border border-[#EAEAEA] rounded-lg hover:bg-gray-50 cursor-pointer">
                <ChevronLeft className="w-4 h-4 text-[#505050]" />
            </button>
            <span className="px-4 py-1.5 border border-[#EAEAEA] bg-white rounded-lg text-[14px] font-medium text-[#1A1C1E]">{currentPage} </span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 bg-white border border-[#EAEAEA] rounded-lg hover:bg-gray-50 cursor-pointer">
                <ChevronRight className="w-4 h-4 text-[#505050]" />
            </button>
        </div>

    );
}