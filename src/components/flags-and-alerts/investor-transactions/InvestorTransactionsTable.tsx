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
import { TablePagination } from "@/components/watchlist/molecules/TablePagination";

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
    currentPage?: number;
    onPageChange?: (page: number) => void;
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

const PAGE_SIZE = 7;

export function InvestorTransactionsTable({
    transactions,
    onViewTransaction,
    currentPage: externalPage,
    onPageChange: externalOnPageChange,
}: InvestorTransactionsTableProps) {
    // Local pagination state if external controls aren't provided
    const [internalPage, setInternalPage] = useState(1);
    const currentPage = externalPage ?? internalPage;
    const handlePageChange = externalOnPageChange ?? setInternalPage;

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
        { key: "type", label: "Type", value: selectedType, onChange: setSelectedType, options: typeOptions },
        { key: "campaign", label: "Campaign", value: selectedCampaign, onChange: setSelectedCampaign, options: campaignOptions },
        { key: "paymentMethod", label: "Payment Method", value: selectedPaymentMethod, onChange: setSelectedPaymentMethod, options: paymentMethodOptions },
        { key: "status", label: "Status", value: selectedStatus, onChange: setSelectedStatus, options: statusOptions },
    ];

    // Reset pagination to page 1 whenever any filter or search changes
    const resetToFirstPage = () => handlePageChange(1);

    // Tab Sync Handler
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        resetToFirstPage();
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
        resetToFirstPage();
    };

    // Filter Logic
    const filteredTransactions = useMemo(() => {
        return transactions.filter((row) => {
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

            if (selectedType !== "All" && row.type !== selectedType) return false;
            if (selectedCampaign !== "All" && row.campaign !== selectedCampaign) return false;
            if (selectedPaymentMethod !== "All" && row.paymentMethod !== selectedPaymentMethod) return false;
            if (selectedStatus !== "All" && row.status !== selectedStatus) return false;

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

    // Calculate Page Counts & Current Page Slice
    const totalPages = Math.ceil(filteredTransactions.length / PAGE_SIZE) || 1;

    const paginatedTransactions = useMemo(() => {
        const start = (currentPage - 1) * PAGE_SIZE;
        return filteredTransactions.slice(start, start + PAGE_SIZE);
    }, [filteredTransactions, currentPage]);

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

            {/* Search & Select Filters */}
            <div className="px-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="w-full md:w-[320px]">
                    <SearchInputBar
                        value={searchQuery}
                        onChange={(val) => {
                            setSearchQuery(val);
                            resetToFirstPage();
                        }}
                        placeholder="Search for anything..."
                    />
                </div>

                <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                    {filterConfigs.map((filter) => (
                        <div key={filter.key}>
                            <Select
                                value={filter.value}
                                onValueChange={(val) => {
                                    filter.onChange(val);
                                    resetToFirstPage();
                                }}
                            >
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
            <div className="overflow-x-auto px-4 scrollbar-hide">
                <table className="w-full min-w-[800px] text-left border-collapse">
                    <thead>
                        <tr className="border-y border-[#EAEAEA] text-[14px] text-[#858585] whitespace-nowrap">
                            <th className="py-3 pr-3 font-medium">Transaction ID</th>
                            <th className="py-3 px-3 font-medium">Type</th>
                            <th className="py-3 px-3 font-medium">Campaign</th>
                            <th className="py-3 px-3 font-medium">Amount</th>
                            <th className="py-3 px-3 font-medium">Date</th>
                            <th className="py-3 px-3 font-medium">Payment Method</th>
                            <th className="py-3 px-3 font-medium text-center">Status</th>
                            <th className="py-3 px-3 font-medium text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAEAEA] text-[14px] whitespace-nowrap">
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((row) => (
                                <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-3 text-[#1B1B1B]">{row.id}</td>
                                    <td className="py-4 px-3 text-[#1B1B1B]">{row.type}</td>
                                    <td className="py-4 px-3 text-[#1B1B1B]">{row.campaign}</td>
                                    <td className="py-4 px-3 text-[#1B1B1B]">{row.amount}</td>
                                    <td className="py-4 px-3 text-[#1B1B1B]">{row.date}</td>
                                    <td className="py-4 px-3 text-[#1B1B1B]">{row.paymentMethod}</td>
                                    <td className="py-4 px-3 text-center">
                                        {row.status === "Flagged" ? (
                                            <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#D4001A]">
                                                Flagged
                                            </span>
                                        ) : row.status === "Pending" || row.status === "Hold" ? (
                                            <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#D97706]">
                                                {row.status}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#45B424]">
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

            {/* Detailed Pagination */}
            <TablePagination
                variant="detailed"
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={filteredTransactions.length}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
            />
        </div>
    );
}