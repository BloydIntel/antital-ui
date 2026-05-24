

// export function StatusButton({ status }: { status: "Completed" | "Pending" | "Failed" }) {
//     return (
//         <span className="px-1 py-0.5 text-[14px] text-white bg-[#22C55E] rounded-sm">
//             {status}
//         </span>
//     )
// }


import React from 'react';
import { TYPOGRAPHY } from "@/constants/styles";

export type TransactionStatus = "Completed" | "Pending" | "Failed";

interface StatusButtonProps {
    status: TransactionStatus;
}

const statusStyles: Record<TransactionStatus, string> = {
    Completed: "bg-[#22C55E] text-[#FFFFFF]",
    Pending: "bg-[#B06000] text-[#FFFFFF]",
    Failed: "bg-[#C5221F] text-[#FFFFFF]",
};

export function StatusButton({ status }: StatusButtonProps) {
    return (
        <span
            className={`inline-flex items-center justify-center px-2.5 py-1 text-[13px] font-medium rounded-md min-w-[85px] text-center capitalize ${statusStyles[status]}`}
            style={TYPOGRAPHY.body}
            role="status"
            aria-label={`Transaction status: ${status}`}
        >
            {status}
        </span>
    );
}