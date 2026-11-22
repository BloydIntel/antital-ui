"use client";

import { NavHistoryRecord } from "@/types/position-detail";
import { LineChart } from "lucide-react";

interface NavHistoryTableProps {
    records?: NavHistoryRecord[];
}

export function NavHistoryTable({ records = [] }: NavHistoryTableProps) {
    const getValueColorClass = (val: string) => {
        const trimmed = val.trim();

        // Treat standalone dash or placeholder text as neutral
        if (trimmed === "-" || trimmed === "–" || trimmed === "—") {
            return "text-[#666666]";
        }

        if (trimmed.startsWith("+")) {
            return "text-[#45B424]"; // Positive - Green
        }

        // Only color red if it starts with "-" AND has numbers after it (e.g. "-1.20" or "-2.5%")
        if (trimmed.startsWith("-") && trimmed.length > 1) {
            return "text-[#D4001A]"; // Negative - Red
        }

        return "text-[#666666]"; // Neutral/Static - Muted Gray
    };

    const hasRecords = records && records.length > 0;

    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA] p-4 overflow-hidden">
            <h2 className="text-[16px] font-medium text-[#040C17] border-b border-[#EAEAEA] p-4 -mx-4">
                NAV History (per unit)
            </h2>

            {hasRecords ? (
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left text-[14px] border-collapse">
                        <tbody className="divide-y divide-[#EAEAEA] text-[#2C2C2C]">
                            {records.map((rec, idx) => (
                                <tr key={idx} className="hover:bg-[#FAFAFA]/60">
                                    <td className="py-3 px-4 text-[#666666] whitespace-nowrap">{rec.date}</td>
                                    <td className="py-3 px-4 font-medium whitespace-nowrap">{rec.nav}</td>
                                    <td className={`py-3 px-4 font-medium whitespace-nowrap ${getValueColorClass(rec.change)}`}>
                                        {rec.change}
                                    </td>
                                    <td className={`py-3 px-4 text-right font-medium whitespace-nowrap ${getValueColorClass(rec.percentage)}`}>
                                        {rec.percentage}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center px-12.5 py-8 text-center space-y-5">

                    <LineChart className="w-5 h-5 text-[#757575]" />

                    <p className="text-sm text-[#A8A8A8]">No NAV History available</p>
                </div>
            )}
        </div>
    );
}