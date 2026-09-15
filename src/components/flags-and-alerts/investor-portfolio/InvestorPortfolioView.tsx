"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { PortfolioPosition, PortfolioMetric } from "@/types/portfolio";
import { PortfolioStatusBadge } from "@/components/flags-and-alerts/investor-portfolio/PortfolioStatusBadge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TYPOGRAPHY } from "@/constants/styles";
import { SearchInputBar } from "@/components/watchlist/organisms/SearchInputBar";
import { TablePagination } from "@/components/watchlist/molecules/TablePagination";


interface InvestorPortfolioViewProps {
    investorName: string;
    investorCode: string;
    metrics: PortfolioMetric[];
    positions: PortfolioPosition[];
    onBack: () => void;
    onViewDetails: (position: PortfolioPosition) => void;
}

type TabType = "All Positions" | "Active" | "Pending Close" | "Exited";

const PAGE_SIZE = 7;

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
    const [currentPage, setCurrentPage] = useState(1);

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

    const totalPages = Math.ceil(filteredPositions.length / PAGE_SIZE);

    const paginatedPositions = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredPositions.slice(start, start + PAGE_SIZE);
    }, [filteredPositions, currentPage]);

    const handleTabChange = (tab: TabType) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    const handleAssetClassChange = (val: string) => {
        setSelectedAssetClass(val);
        setCurrentPage(1);
    };

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
                            onValueChange={handleAssetClassChange}
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
            <div className="bg-white rounded-xl border border-[#EAEAEA] overflow-hidden">
                {/* Table Controls (Tabs & Search) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4">
                    {/* Tabs Wrapper with Horizontal Scroll */}
                    <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap border-b border-[#EAEAEA] py-4 scrollbar-hide">
                        {(["All Positions", "Active", "Pending Close", "Exited"] as TabType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`pb-2 sm:pb-0 px-6 text-[14px] transition-colors relative cursor-pointer shrink-0 ${activeTab === tab
                                    ? "text-[#042E27] after:absolute after:bottom-[-16px] after:left-0 after:right-0 after:h-[2px] after:bg-[#A7B832]"
                                    : "text-[#858585] hover:text-[#11110F]"
                                    }`}
                                style={TYPOGRAPHY.body}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="w-full sm:max-w-[317px] sm:pr-4">
                        <SearchInputBar
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                {/* Positions Table */}
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#EAEAEA] text-[14px] font-normal text-[#505050]" style={TYPOGRAPHY.body}>
                                <th className="py-3 px-5 font-normal w-[15%] whitespace-nowrap">Campaign / ID</th>
                                <th className="py-3 px-4 font-normal w-[12%] whitespace-nowrap">Asset Class</th>
                                <th className="py-3 px-4 font-normal w-[14%] whitespace-nowrap">Date Invested</th>
                                <th className="py-3 px-4 font-normal w-[13%] whitespace-nowrap">Initial Amount</th>
                                <th className="py-3 px-4 font-normal text-right w-[13%] whitespace-nowrap">Current Value / ROI</th>
                                <th className="py-3 px-4 font-normal text-left w-[13%] whitespace-nowrap">Status</th>
                                <th className="py-3 px-5 font-normal text-center w-[13%] whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EAEAEA] text-[13px]">
                            {paginatedPositions.map((row) => (
                                <tr key={row.id} className="hover:bg-[#FAFAFA]/60 transition-colors">
                                    <td className="py-4 px-5">
                                        <div className="font-medium text-[#11110F]">{row.campaign}</div>
                                        <div className="text-[12px] text-[#858585] mt-0.5">{row.campaignId}</div>
                                    </td>
                                    <td className="py-4 px-4 text-[#11110F]">{row.assetClass}</td>
                                    <td className="py-4 px-4 text-[#11110F]">{row.dateInvested}</td>
                                    <td className="py-4 px-4 font-medium text-[#11110F]">{row.initialAmount}</td>
                                    <td className="py-4 px-4 text-right">
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
                                    <td className="py-4 px-4 text-left whitespace-nowrap">
                                        <PortfolioStatusBadge status={row.status} />
                                    </td>
                                    <td className="py-4 px-5 text-center">
                                        <button
                                            onClick={() => onViewDetails(row)}
                                            className="bg-[#042E27] hover:bg-[#061713] text-[#F4F5F7] text-[14px]  px-3 py-1.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                                            style={TYPOGRAPHY.body}
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
                <TablePagination
                    variant="simple"
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={positions.length}
                    filteredCount={filteredPositions.length}
                    pageSize={PAGE_SIZE}
                    onPageChange={(page) => setCurrentPage(page)}
                />

            </div>
        </div>
    );
}