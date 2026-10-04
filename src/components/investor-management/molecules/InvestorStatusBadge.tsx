"use client";

import { InvestorStatus } from "@/types/investor";

interface InvestorStatusBadgeProps {
    status: InvestorStatus;
}

export function InvestorStatusBadge({ status }: InvestorStatusBadgeProps) {
    const getStatusStyles = (status: InvestorStatus) => {
        switch (status) {
            case "Active":
                return "bg-[#FCFCFC] text-[#45B424]";
            case "Pending KYC":
                return "bg-[#FCFCFC] text-[#F4B942]";
            case "Suspended":
                return "bg-[#FCFCFC] text-[#D4001A]";
            case "Rejected":
                return "bg-[#FCFCFC] text-[#D4001A]";
            case "Info Requested":
                return "bg-[#FCFCFC] text-[#F4B942]";
            default:
                return "bg-[#FCFCFC] text-[#858585]";
        }
    };

    return (
        <span
            className={`inline-block px-2 py-1 rounded-md text-[12px] border border-[#EAEAEA] ${getStatusStyles(
                status
            )}`}
        >
            {status}
        </span>
    );
}
