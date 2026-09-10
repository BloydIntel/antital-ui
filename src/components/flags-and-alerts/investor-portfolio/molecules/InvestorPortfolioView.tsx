"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { PortfolioPosition, PortfolioMetric } from "@/types/portfolio";
import { PortfolioStatusBadge } from "@/components/flags-and-alerts/investor-portfolio/atoms/PortfolioStatusBadge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TYPOGRAPHY } from "@/constants/styles";


interface InvestorPortfolioViewProps {
    investorName: string;
    investorCode: string;
    metrics: PortfolioMetric[];
    positions: PortfolioPosition[];
    onBack: () => void;
    onViewDetails: (position: PortfolioPosition) => void;
}

type TabType = "All Positions" | "Active" | "Pending Close" | "Exited";

export function InvestorPortfolioView({
    investorName,
    investorCode,
    metrics,
    positions,
    onBack,
    onViewDetails,
}: InvestorPortfolioViewProps) {
    const [activeTab, setActiveTab] = useState<TabType>("All Positions");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedAssetClass, setSelectedAssetClass] = useState<string>("All");

    const assetClassOptions = useMemo(() => {
        const uniqueAssets = Array.from(new Set(positions.map((p) => p.assetClass)));
        return ["All", ...uniqueAssets];
    }, [positions]);

    const filteredPositions = useMemo(() => {
        return positions.filter((item) => {
            // Filter by tab status
            if (activeTab === "Active" && item.status !== "PERFORMING") return false;
            if (activeTab === "Pending Close" && item.status !== "PENDING CLOSE") return false;
            if (activeTab === "Exited" && item.status !== "EXITED") return false;

            // Filter by asset class
            if (selectedAssetClass !== "All" && item.assetClass !== selectedAssetClass) {
                return false;
            }

            // Search filter
            const searchLower = searchQuery.toLowerCase();
            return (
                item.campaign.toLowerCase().includes(searchLower) ||
                item.campaignId.toLowerCase().includes(searchLower) ||
                item.assetClass.toLowerCase().includes(searchLower)
            );
        });
    }, [positions, activeTab, selectedAssetClass, searchQuery]);

    return (
        <div className="min-h-screen space-y-6 font-sans text-[#11110F] bg-[#FAFAFA] pb-12">
            {/* Top Header Navigation */}
            <div>
                <button
                    onClick={onBack}
                    className="hidden lg:inline-flex items-center text-[16px] text-[#8D8D8D] hover:text-[#11110F] transition-colors mb-3 cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 text-[#11110F]" />
                    Back to Investor Profile
                </button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-[28px] font-medium text-[#11110F] tracking-tight">
                            Full Portfolio: {investorName}
                        </h1>
                        <p className="text-[16px] text-[#505050] mt-0.5">
                            Comprehensive view of all historical and active positions ({investorCode})
                        </p>
                    </div>

                    <div className="w-fit min-w-[180px] max-w-[280px]">
                        <Select
                            value={selectedAssetClass}
                            onValueChange={(val) => setSelectedAssetClass(val)}
                        >
                            <SelectTrigger className="w-full px-2.5 border-[#EAEAEA] bg-white rounded-md cursor-pointer text-[#1A1C1E] h-9 text-[14px]">
                                <div className="flex items-center gap-1.5 truncate">
                                    <Filter className="w-4 h-4 text-[#858585] shrink-0" />
                                    <span className="text-[#858585] shrink-0">Filter by Asset Class:</span>
                                    <SelectValue placeholder="All" />
                                </div>
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-md">
                                {assetClassOptions.map((opt) => (
                                    <SelectItem key={opt} value={opt} className="text-[13px] cursor-pointer">
                                        {opt}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-[#EAEAEA] px-4 py-6">
                        <p className="text-[16px] text-[#858585] font-normal">{metric.label}</p>
                        <p className="text-[28px] text-[#11110F] mt-2 tracking-tight" style={TYPOGRAPHY.heading}>
                            {metric.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-xl border border-[#EAEAEA] shadow-xs overflow-hidden">
                {/* Table Controls (Tabs & Search) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 border-b border-[#EAEAEA]">
                    {/* Tabs */}
                    <div className="flex items-center space-x-6 border-b sm:border-b-0 border-[#EAEAEA]">
                        {(["All Positions", "Active", "Pending Close", "Exited"] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 sm:pb-0 text-[14px] font-medium transition-colors relative cursor-pointer ${activeTab === tab
                                    ? "text-[#11110F] font-semibold after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-[2px] after:bg-[#11110F]"
                                    : "text-[#666666] hover:text-[#11110F]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full sm:w-[280px]">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#858585]" />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-1.5 bg-[#FCFCFC] border border-[#EAEAEA] rounded-lg text-[13px] text-[#11110F] placeholder-[#858585] focus:outline-none focus:border-[#11110F] transition-colors"
                        />
                    </div>
                </div>

                {/* Positions Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-[12px] font-normal text-[#666666]">
                                <th className="py-3 px-5">Campaign / ID</th>
                                <th className="py-3 px-4">Asset Class</th>
                                <th className="py-3 px-4">Date Invested</th>
                                <th className="py-3 px-4">Initial Amount</th>
                                <th className="py-3 px-4">Current Value / ROI</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEAEA] text-[13px]">
                            {filteredPositions.map((row) => (
                                <tr key={row.id} className="hover:bg-[#FAFAFA]/60 transition-colors">
                                    <td className="py-4 px-5">
                                        <div className="font-medium text-[#11110F]">{row.campaign}</div>
                                        <div className="text-[12px] text-[#858585] mt-0.5">{row.campaignId}</div>
                                    </td>
                                    <td className="py-4 px-4 text-[#11110F]">{row.assetClass}</td>
                                    <td className="py-4 px-4 text-[#11110F]">{row.dateInvested}</td>
                                    <td className="py-4 px-4 font-medium text-[#11110F]">{row.initialAmount}</td>
                                    <td className="py-4 px-4">
                                        <div className="font-medium text-[#11110F]">{row.currentValue}</div>
                                        <div
                                            className={`text-[12px] mt-0.5 ${row.roi.startsWith("+")
                                                ? "text-[#16A34A]"
                                                : row.roi === "0%"
                                                    ? "text-[#858585]"
                                                    : "text-[#DC2626]"
                                                }`}
                                        >
                                            {row.roi}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-center">
                                        <PortfolioStatusBadge status={row.status} />
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <button
                                            onClick={() => onViewDetails(row)}
                                            className="bg-[#0A251E] hover:bg-[#061713] text-white text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <div className="flex items-center justify-between p-4 border-t border-[#EAEAEA] text-[13px] text-[#666666]">
                    <span>Showing {filteredPositions.length} of {positions.length} records</span>
                    <div className="flex items-center space-x-2">
                        <button
                            disabled
                            className="px-3 py-1.5 border border-[#EAEAEA] rounded-md text-[#858585] bg-[#FAFAFA] cursor-not-allowed"
                        >
                            Previous
                        </button>
                        <button
                            disabled
                            className="px-3 py-1.5 border border-[#EAEAEA] rounded-md text-[#858585] bg-[#FAFAFA] cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}