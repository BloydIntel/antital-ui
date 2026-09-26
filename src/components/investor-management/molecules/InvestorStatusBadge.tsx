"use client";

import { InvestorStatus } from "@/types/investor";

interface InvestorStatusBadgeProps {
    status: InvestorStatus;
}

export function InvestorStatusBadge({ status }: InvestorStatusBadgeProps) {
    const getStatusStyles = (status: InvestorStatus) => {
        switch (status) {
            case "Active":
                return "bg-[#ECFDF3] text-[#16A34A]";
            case "Pending KYC":
                return "bg-[#FFFAEB] text-[#D97706]";
            case "Suspended":
                return "bg-[#FEF3F2] text-[#D4001A]";
            default:
                return "bg-[#F4F4F4] text-[#666666]";
        }
    };

    return (
        <span
            className={`inline-block px-3 py-1 rounded-full text-[13px] font-medium ${getStatusStyles(
                status
            )}`}
        >
            {status}
        </span>
    );
}