"use client";

import { useState, useMemo } from "react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { SearchInputBar } from "@/components/watchlist/organisms/SearchInputBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface TransactionRecord {
    id: string;
    type: string;
    campaign: string;
    amount: string;
    date: string;
    paymentMethod: string;
    status: "Flagged" | "Completed" | "Pending" | "Hold";
}

interface InvestorTransactionsTableProps {
    transactions: TransactionRecord[];
    onViewTransaction?: (txn: TransactionRecord) => void;
}

const TAB_OPTIONS = [
    "All",
    "Investment",
    "Wallet",
    "Secondary Market",
    "Dividend",
    "Withdrawals",
    "Flagged",
    "Pending",
];

export function InvestorTransactionsTable({
    transactions,
    onViewTransaction,
}: InvestorTransactionsTableProps) {
    const [activeTab, setActiveTab] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Dropdown Filter States
    const [selectedType, setSelectedType] = useState("All");
    const [selectedCampaign, setSelectedCampaign] = useState("All");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    // Dynamic Option Derivations
    const typeOptions = useMemo(() => {
        const types = Array.from(new Set(transactions.map((t) => t.type).filter(Boolean)));
        return ["All", ...types];
    }, [transactions]);

    const campaignOptions = useMemo(() => {
        const campaigns = Array.from(
            new Set(transactions.map((t) => t.campaign).filter((c) => c && c !== "-"))
        );
        return ["All", ...campaigns];
    }, [transactions]);

    const paymentMethodOptions = useMemo(() => {
        const methods = Array.from(new Set(transactions.map((t) => t.paymentMethod).filter(Boolean)));
        return ["All", ...methods];
    }, [transactions]);

    const statusOptions = useMemo(() => {
        const statuses = Array.from(new Set(transactions.map((t) => t.status).filter(Boolean)));
        return ["All", ...statuses];
    }, [transactions]);

    // DRY Filter Configuration Map
    const filterConfigs = [
        {
            key: "type",
            label: "Type",
            value: selectedType,
            onChange: setSelectedType,
            options: typeOptions,
        },
        {
            key: "campaign",
            label: "Campaign",
            value: selectedCampaign,
            onChange: setSelectedCampaign,
            options: campaignOptions,
        },
        {
            key: "paymentMethod",
            label: "Payment Method",
            value: selectedPaymentMethod,
            onChange: setSelectedPaymentMethod,
            options: paymentMethodOptions,
        },
        {
            key: "status",
            label: "Status",
            value: selectedStatus,
            onChange: setSelectedStatus,
            options: statusOptions,
        },
    ];

    // Tab Sync Handler
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (tab === "Flagged" || tab === "Pending") {
            setSelectedStatus(tab);
            setSelectedType("All");
        } else if (tab === "All") {
            setSelectedType("All");
            setSelectedStatus("All");
        } else {
            setSelectedType(tab);
            setSelectedStatus("All");
        }
    };

    // Reset All Filters
    const handleResetFilters = () => {
        setActiveTab("All");
        setSearchQuery("");
        setSelectedType("All");
        setSelectedCampaign("All");
        setSelectedPaymentMethod("All");
        setSelectedStatus("All");
    };

    // Filter Logic
    const filteredTransactions = useMemo(() => {
        return transactions.filter((row) => {
            // Tab Matching
            if (activeTab !== "All") {
                if (activeTab === "Flagged" && row.status !== "Flagged") return false;
                if (activeTab === "Pending" && row.status !== "Pending") return false;
                if (
                    activeTab !== "Flagged" &&
                    activeTab !== "Pending" &&
                    row.type.toLowerCase() !== activeTab.toLowerCase()
                ) {
                    return false;
                }
            }

            // Dropdown Filter Matching
            if (selectedType !== "All" && row.type !== selectedType) return false;
            if (selectedCampaign !== "All" && row.campaign !== selectedCampaign) return false;
            if (selectedPaymentMethod !== "All" && row.paymentMethod !== selectedPaymentMethod) return false;
            if (selectedStatus !== "All" && row.status !== selectedStatus) return false;

            // Search Bar Matching
            if (searchQuery.trim() !== "") {
                const query = searchQuery.toLowerCase();
                const matchesId = row.id.toLowerCase().includes(query);
                const matchesType = row.type.toLowerCase().includes(query);
                const matchesCampaign = row.campaign.toLowerCase().includes(query);
                const matchesMethod = row.paymentMethod.toLowerCase().includes(query);
                const matchesAmount = row.amount.toLowerCase().includes(query);

                if (!matchesId && !matchesType && !matchesCampaign && !matchesMethod && !matchesAmount) {
                    return false;
                }
            }

            return true;
        });
    }, [
        transactions,
        activeTab,
        selectedType,
        selectedCampaign,
        selectedPaymentMethod,
        selectedStatus,
        searchQuery,
    ]);

    return (
        <div className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden space-y-4">
            {/* Nav Tabs */}
            <div className="flex items-center bg-[#F1F5F94D] border-b border-[#EAEAEA] overflow-x-auto scrollbar-hide">
                {TAB_OPTIONS.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-4 text-[14px] font-normal whitespace-nowrap border-b-2 transition-colors cursor-pointer ${isActive
                                ? "border-[#7BA147] text-[#11110F]"
                                : "border-transparent text-[#858585] hover:text-[#11110F]"
                                }`}
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>

            {/* Search & DRY Select Filters */}
            <div className="px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="w-full md:w-[320px]">
                    <SearchInputBar
                        value={searchQuery}
                        onChange={(val) => setSearchQuery(val)}
                        placeholder="Search for anything..."
                    />
                </div>

                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    {filterConfigs.map((filter) => (
                        <div key={filter.key}>
                            <Select value={filter.value} onValueChange={filter.onChange}>
                                <SelectTrigger className="w-full px-2.5 border-[#EAEAEA] bg-white rounded-md cursor-pointer text-[#1A1C1E] h-9 text-[14px]">
                                    <div className="flex items-center gap-1.5 truncate">
                                        <span className="text-[#858585] shrink-0">{filter.label}:</span>
                                        <SelectValue placeholder="All" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-[#EAEAEA] rounded-md">
                                    {filter.options.map((opt) => (
                                        <SelectItem key={opt} value={opt} className="text-[13px] cursor-pointer">
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))}

                    {/* Reset Button */}
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        className="h-9 px-3 rounded-md border border-[#EAEAEA] text-[13px] text-[#858585] hover:text-[#11110F] hover:bg-gray-50 transition-colors cursor-pointer shrink-0 font-medium"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-y border-[#EAEAEA] bg-[#FAFADA]/20 text-[13px] text-[#858585]">
                            <th className="py-3 px-6 font-medium">Transaction ID</th>
                            <th className="py-3 px-4 font-medium">Type</th>
                            <th className="py-3 px-4 font-medium">Campaign</th>
                            <th className="py-3 px-4 font-medium">Amount</th>
                            <th className="py-3 px-4 font-medium">Date</th>
                            <th className="py-3 px-4 font-medium">Payment Method</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                            <th className="py-3 px-6 font-medium text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAEAEA] text-[14px]">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6 text-[#11110F] font-medium">{row.id}</td>
                                    <td className="py-4 px-4 text-[#323232]">{row.type}</td>
                                    <td className="py-4 px-4 text-[#323232]">{row.campaign}</td>
                                    <td className="py-4 px-4 font-semibold text-[#11110F]">{row.amount}</td>
                                    <td className="py-4 px-4 text-[#858585]">{row.date}</td>
                                    <td className="py-4 px-4 text-[#323232]">{row.paymentMethod}</td>
                                    <td className="py-4 px-4">
                                        {row.status === "Flagged" ? (
                                            <span className="inline-flex items-center rounded-md bg-[#FFE3E0] px-2.5 py-1 text-[12px] font-medium text-[#D4001A]">
                                                Flagged
                                            </span>
                                        ) : row.status === "Pending" || row.status === "Hold" ? (
                                            <span className="inline-flex items-center rounded-md bg-[#FEF3C7] px-2.5 py-1 text-[12px] font-medium text-[#D97706]">
                                                {row.status}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-[#F0F9FF] px-2.5 py-1 text-[12px] font-medium text-[#16A34A]">
                                                Completed
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <OnboardingButton
                                            variant="plain"
                                            label="View"
                                            onClick={() => onViewTransaction?.(row)}
                                            className="my-0 inline-flex px-4 py-1.5 text-[13px] border-[#E2E8F0]"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="py-8 text-center text-[14px] text-[#858585]">
                                    No transactions match the selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t border-[#EAEAEA] px-6 py-4 text-[13px] text-[#858585]">
                <span>
                    Showing {filteredTransactions.length > 0 ? 1 : 0}-{filteredTransactions.length} of {transactions.length} records
                </span>
                <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                        Previous
                    </button>
                    <button className="rounded-lg bg-[#0F221E] px-3 py-1.5 text-white font-medium cursor-pointer">
                        1
                    </button>
                    <button className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}