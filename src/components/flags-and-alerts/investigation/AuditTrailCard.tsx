import React from "react";

export interface AuditTrailItem {
    id: string;
    event: string;
    details: string;
    time: string;
    color: "blue" | "red" | "green" | "gray";
}

interface AuditTrailCardProps {
    items: AuditTrailItem[];
}

export function AuditTrailCard({ items }: AuditTrailCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
            <h2 className="text-[16px] font-semibold text-[#11110F] mb-4">
                Audit Trail
            </h2>

            <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#E2E8F0]">
                {items.map((item) => (
                    <div key={item.id} className="relative pl-3">
                        <div
                            className={`absolute -left-[15px] top-1.5 w-2.5 h-2.5 rounded-full ${item.color === "blue"
                                ? "bg-[#2563EB]"
                                : item.color === "red"
                                    ? "bg-[#DC2626]"
                                    : "bg-[#16A34A]"
                                }`}
                        />
                        <h4 className="text-[14px] font-medium text-[#11110F]">
                            {item.event}
                        </h4>
                        <p className="text-[12px] text-[#64748B] mt-0.5">{item.details}</p>
                        <p className="text-[11px] text-[#94A3B8] mt-0.5">{item.time}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}