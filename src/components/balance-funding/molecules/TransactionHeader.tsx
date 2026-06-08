"use client"

import { Download, FileText } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";

interface TransactionHeaderProps {
    title?: string;
    description?: string;
    onExportCSV?: () => void;
    onExportPDF?: () => void;
}

export function TransactionHeader({
    title = "Transaction History",
    description = "Complete record of all your financial activities",
    onExportCSV,
    onExportPDF
}: TransactionHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full py-4">
            {/* Title Block Left */}
            <div className="flex flex-col gap-1">
                <h2
                    className="text-[22px] lg:text-[28px] font-semibold text-[#1A1C1E]"
                    style={TYPOGRAPHY.heading}
                >
                    {title}
                </h2>
                <p
                    className="text-[14px] lg:text-[15px] text-[#505050]"
                    style={TYPOGRAPHY.body}
                >
                    {description}
                </p>
            </div>

            {/* Action Buttons Right */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onExportCSV}
                    className="h-10 px-4 border border-[#EAEAEA] bg-white text-[#1A1C1E] rounded-md text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <Download className="w-4 h-4 text-[#1A1C1E]" />
                    Export CSV
                </button>
                <button
                    onClick={onExportPDF}
                    className="h-10 px-4 border border-[#EAEAEA] bg-white text-[#1A1C1E] rounded-md text-[14px] font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors cursor-pointer"
                    style={TYPOGRAPHY.body}
                >
                    <FileText className="w-4 h-4 text-[#1A1C1E]" />
                    Export PDF
                </button>
            </div>
        </div>
    );
}