"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";

interface DistributionRecord {
    reference: string;
    date: string;
    type: "Dividend" | "Distribution";
    amount: string;
    status: "Paid" | "Scheduled" | "Processing" | "Failed";
}

interface OverviewMetrics {
    totalDistributed: string;
    totalDividends: string;
    totalDistributions: string;
    lastDistributionDate: string;
    lastDistributionSub: string;
}

interface DistributionsCardProps {
    expectedDate?: string;
    metrics?: OverviewMetrics;
    records?: DistributionRecord[];
}

export function DistributionsCard({
    expectedDate = "Mar 31, 2024",
    metrics = {
        totalDistributed: "250,000",
        totalDividends: "180,000",
        totalDistributions: "70,000",
        lastDistributionDate: "Dec 12, 2026",
        lastDistributionSub: "5.0 per unit",
    },
    records = [
        { reference: "DIV-2020-003", date: "Jan 12, 2024", type: "Dividend", amount: "₦1,075", status: "Paid" },
        { reference: "DIS-2020-003", date: "Jan 12, 2024", type: "Distribution", amount: "₦100", status: "Scheduled" },
        { reference: "DIV-2020-003", date: "Jan 12, 2024", type: "Dividend", amount: "₦1,000,000", status: "Processing" },
        { reference: "DIV-2020-003", date: "Jan 12, 2024", type: "Dividend", amount: "₦1,000,000", status: "Failed" },
    ],
}: DistributionsCardProps) {
    const [activeTab, setActiveTab] = useState<"Overview" | "All" | "Dividends" | "Distributions">("Overview");

    const getStatusBadgeClass = (status: DistributionRecord["status"]) => {
        switch (status) {
            case "Paid":
                return "border-[#EAEAEA] bg-[#FCFCFC] text-[#45B424]";
            case "Scheduled":
                return "border-[#EAEAEA] bg-[#FCFCFC] text-[#858585]";
            case "Processing":
                return "border-[#EAEAEA] bg-[#FCFCFC] text-[#386CAA]";
            case "Failed":
                return "border-[#EAEAEA] bg-[#FCFCFC] text-[#D4001A]";
            default:
                return "border-[#EAEAEA] bg-[#FCFCFC] text-[#666666]";
        }
    };

    const filteredRecords = records.filter((item) => {
        if (activeTab === "Dividends") return item.type === "Dividend";
        if (activeTab === "Distributions") return item.type === "Distribution";
        return true; // "Overview" and "All"
    });

    const hasRecords = records && records.length > 0;

    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA] overflow-hidden">
            {/* Header & Tabs Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAEAEA] px-4 py-4 gap-4">
                <h2 className="text-[16px] font-medium text-[#040C17]">Distributions & Dividends</h2>

                <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
                    {(["Overview", "All", "Dividends", "Distributions"] as const).map((tab) => {
                        const isActive = activeTab === tab;
                        return (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`pb-1 px-2 text-[14px] transition-colors relative cursor-pointer whitespace-nowrap ${isActive ? "text-[#11110F]" : "text-[#858585] hover:text-[#11110F]"
                                    }`}
                            >
                                {tab}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A7B832]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Body */}
            {!hasRecords ? (
                <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-[12px] text-[#A8A8A8]">No distributions yet for this position</span>
                    </div>
                    <div className="flex flex-col items-center justify-center px-12.5 py-8 text-center">
                        <Clock className="w-6 h-6 text-[#858585] mb-2" />
                        <p className="text-[13px] text-[#666666]">
                            First distribution expected at campaign close ({expectedDate})
                        </p>
                    </div>
                </div>
            ) : activeTab === "Overview" ? (
                <div className="px-4 py-6">
                    <div className="rounded-lg bg-white border border-[#EAEAEA] px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EAEAEA] gap-4 sm:gap-0">
                        <div className="flex flex-col justify-between sm:pr-6">
                            <span className="text-[14px] text-[#858585]">Total Distributed</span>
                            <div className="mt-2">
                                <p className="text-[20px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>{metrics.totalDistributed}</p>
                                <span className="text-[12px] text-[#858585]">per unit</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between sm:px-6 pt-4 sm:pt-0">
                            <span className="text-[14px] text-[#858585]">Total Dividends</span>
                            <div className="mt-2">
                                <p className="text-[20px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>{metrics.totalDividends}</p>
                                <span className="text-[12px] text-[#858585]">per unit</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between sm:px-6 pt-4 sm:pt-0">
                            <span className="text-[14px] text-[#858585]">Total Distributions</span>
                            <div className="mt-2">
                                <p className="text-[20px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>{metrics.totalDistributions}</p>
                                <span className="text-[12px] text-[#858585]">per unit</span>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between sm:pl-6 pt-4 sm:pt-0">
                            <span className="text-[14px] text-[#858585]">Last Distribution</span>
                            <div className="mt-2">
                                <p className="text-[20px] text-[#2C2C2C]" style={TYPOGRAPHY.heading}>{metrics.lastDistributionDate}</p>
                                <span className="text-[12px] text-[#858585]">{metrics.lastDistributionSub}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left text-[14px] border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAEAEA] text-[#666666] font-normal">
                                <th className="py-3 px-6 font-normal">Reference</th>
                                <th className="py-3 px-6 font-normal">Date</th>
                                <th className="py-3 px-6 font-normal">Type</th>
                                <th className="py-3 px-6 font-normal text-right">Amount (per unit)</th>
                                <th className="py-3 px-6 font-normal text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEAEA] text-[#2C2C2C]">
                            {filteredRecords.map((item, idx) => (
                                <tr key={idx} className="hover:bg-[#FAFAFA]/60">
                                    <td className="py-3.5 px-6 text-[#2C2C2C] whitespace-nowrap">{item.reference}</td>
                                    <td className="py-3.5 px-6 text-[#2C2C2C] whitespace-nowrap">{item.date}</td>
                                    <td className="py-3.5 px-6 text-[#2C2C2C] whitespace-nowrap">{item.type}</td>
                                    <td className="py-3.5 px-6 text-[#2C2C2C] whitespace-nowrap text-right">{item.amount}</td>
                                    <td className="py-3.5 px-6 whitespace-nowrap text-center">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border text-xs w-full max-w-[75px] ${getStatusBadgeClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}