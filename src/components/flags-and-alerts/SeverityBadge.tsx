import React from "react";
import { AlertSeverity } from "@/types/flags-and-alerts";

interface SeverityBadgeProps {
    severity: AlertSeverity;
}

const severityStyles: Record<AlertSeverity, string> = {
    CRITICAL: "bg-[#FB2C361A] text-[#FB2C36]",
    HIGH: "bg-[#FF69001A] text-[#FF6900]",
    MEDIUM: "bg-[#F0B1001A] text-[#F0B100]",
    LOW: "bg-[#EDF1D6] text-[#83AB4B]",
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
    return (
        <span
            className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded uppercase ${severityStyles[severity]}`}
        >
            {severity}
        </span>
    );
}