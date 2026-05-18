'use client'

import React, { useMemo, useState } from 'react';
import { TYPOGRAPHY } from "@/constants/styles";
import {
    ArrowUpRight, ShoppingCart, FileText, Download, ChevronLeft, ChevronRight, CheckCircle2,
    Trash,
    Upload,
    CreditCard,
    ArrowDownRight
} from "lucide-react";
import { TransactionItem } from '@/data/transactionsMockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useRouter } from 'next/navigation';

// Helper for type column visuals
const getTypeBadge = (type: TransactionItem['type']) => {
    const baseClass = "flex items-center gap-1.5 px-2 py-1 rounded-md text-[13px] font-medium w-fit";
    switch (type) {
        case "Investment":
            return <div className={`${baseClass}`}>
                <ArrowUpRight className="w-3 h-3 text-[#A4D65E]" />
                <span className='text-[#FFFFFF] bg-[#7BA147] py-0.5 px-1 rounded-sm' style={TYPOGRAPHY.body}>Investment</span>
            </div>;
        case "Buy":
            return <div className={`${baseClass}`}>
                <ShoppingCart className="w-3 h-3 text-[#45B424]" />
                <span className='text-[#FFFFFF] bg-[#45B424] py-0.5 px-1 rounded-sm' style={TYPOGRAPHY.body}>Buy</span>
            </div>;
        case "Sell":
            return <div className={`${baseClass}`}>
                <Upload className="w-3 h-3 text-[#D4001A]" />
                <span className='text-[#FFFFFF] bg-[#D4001A] py-0.5 px-1 rounded-sm' style={TYPOGRAPHY.body}> Sell </span>
            </div>;
        case "Fee":
            return <div className={`${baseClass}`}>
                <CreditCard className="w-3.5 h-3 text-[#0A2341]" />
                <span className='text-[#FFFFFF] bg-[#0A2341] py-0.5 px-1 rounded-sm' style={TYPOGRAPHY.body}> Fee </span>
            </div>;
        case "Deposit":
            return <div className={`${baseClass}`}>
                <ArrowDownRight className="w-3 h-3 text-[#042E27]" />
                <span className='text-[#FFFFFF] bg-[#042E27] py-0.5 px-1 rounded-sm' style={TYPOGRAPHY.body}>Deposit</span>
            </div>;
        case "Withdrawal":
            return <div className={`${baseClass}`}>
                <Upload className="w-3 h-3 text-[#D4001A]" />
                <span className='text-[#FFFFFF] bg-[#D4001A] py-0.5 px-1 rounded-sm' style={TYPOGRAPHY.body}> Withdrawal</span>
            </div>;
    }
};

const filterConfigs = [
    {
        key: "date",
        label: "Date",
        placeholder: "Date",
        allLabel: "All Dates",
        data: ["Today", "This Month", "This Year"]
    },
    {
        key: "type",
        label: "Type",
        placeholder: "Type",
        allLabel: "All Types",
        data: ["Investment", "Buy", "Sell", "Fee", "Deposit", "Withdrawal"]
    },
    {
        key: "status",
        label: "Status",
        placeholder: "Status",
        allLabel: "All Statuses",
        data: ["Completed", "Processing", "Failed"]
    }
] as const;

export function TransactionRecordsTable({ data }: { data: TransactionItem[] }) {

    const router = useRouter()

    const initialFilters = {
        date: "",
        type: "",
        status: ""
    };

    const [filters, setFilters] = useState(initialFilters);
    const [isAllSelected, setIsAllSelected] = useState(false);

    // Helper to update a specific filter key
    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const filteredTransactions = useMemo(() => {
        return data.filter((tx) => {
            // Match if string is empty OR matches exactly
            const statusMatch = !filters.status || tx.status === filters.status;
            const typeMatch = !filters.type || tx.type.toLowerCase() === filters.type.toLowerCase();

            let dateMatch = true;
            if (filters.date) {
                const txDate = new Date(tx.date);
                const today = new Date();
                if (filters.date === "Today") dateMatch = txDate.toDateString() === today.toDateString();
                if (filters.date === "This Month") dateMatch = txDate.getMonth() === today.getMonth() && txDate.getFullYear() === today.getFullYear();
                if (filters.date === "This Year") dateMatch = txDate.getFullYear() === today.getFullYear();
            }

            return statusMatch && typeMatch && dateMatch;
        });
    }, [data, filters]);

    const handleClearFilters = () => {
        setFilters(initialFilters); // Resets all select dropdowns back to "all"
        setIsAllSelected(false);    // Unchecks master checkbox state
    };

    const hasActiveFilters = filters.date !== "" || filters.type !== "" || filters.status !== "" || isAllSelected;

    return (
        <div className="w-full bg-white border border-[#EAEAEA] rounded-xl p-6 shadow-sm">
            {/* Header Controls Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-[20px] font-semibold text-[#1A1C1E]" style={TYPOGRAPHY.heading}>Transaction Records</h3>
                    <p className="text-[14px] text-[#717171]" style={TYPOGRAPHY.body}>Track your investments, orders, and fees.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[14px]">

                    {filterConfigs.map((config) => (
                        <Select
                            key={config.key}
                            // Passing an empty string fallback ensures Radix clears its internal text cache 
                            value={filters[config.key] || ""}
                            onValueChange={(value) => handleFilterChange(config.key, value)}
                        >
                            <SelectTrigger
                                className="w-fit py-1.5 px-3 border-[#EAEAEA] rounded-md bg-white cursor-pointer gap-2 h-9 text-[#1A1C1E] text-[16px]"
                                style={TYPOGRAPHY.heading}
                            >
                                <SelectValue placeholder={config.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {config.data.map((opt) => (
                                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}

                    {/* Select All Button */}
                    <button
                        onClick={() => setIsAllSelected(prev => !prev)}
                        className={`px-3 py-1.5 text-[16px] border rounded-md flex items-center gap-2 h-9 transition-colors cursor-pointer ${isAllSelected
                            ? "bg-[#042E27] text-white border-[#042E27]"
                            : "border-[#EAEAEA] text-[#1A1C1E] bg-white hover:bg-gray-50"
                            }`}
                        style={TYPOGRAPHY.heading}
                    >
                        <CheckCircle2 className="w-4 h-4" /> Select All
                    </button>

                    {/* Clear Action Button */}
                    <button
                        disabled={!hasActiveFilters}
                        onClick={handleClearFilters}
                        className={`px-3 py-1.5 h-9 rounded-md flex items-center transition-colors font-medium text-[14px] border ${hasActiveFilters
                            ? "bg-red-50 text-red-600 border-red-200 cursor-pointer hover:bg-red-100"
                            : "text-[#A8A8A8] bg-[#F5F5F5] border-transparent cursor-not-allowed"
                            }`}
                        style={TYPOGRAPHY.heading}
                    >
                        <Trash className="w-4 h-4" /> <span className='px-2'>Clear</span>
                    </button>
                </div>
            </div>

            {/* Structured Ledger Layout */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#F0F0F0] text-[14px] text-[#1F1F1F]">
                            <th className="pb-3 pl-2 w-10"></th>
                            <th className="pb-3" style={TYPOGRAPHY.body}>Type</th>
                            <th className="pb-3" style={TYPOGRAPHY.body}>Description</th>
                            <th className="pb-3" style={TYPOGRAPHY.body}>Date</th>
                            <th className="pb-3 text-right" style={TYPOGRAPHY.body}>Amount</th>
                            <th className="pb-3 text-right" style={TYPOGRAPHY.body}>Fees</th>
                            <th className="pb-3 text-center" style={TYPOGRAPHY.body}>Status</th>
                            <th className="pb-3 text-center" style={TYPOGRAPHY.body}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F9F9F9] text-[15px]">

                        {filteredTransactions.map((tx) => {
                            const isPositive = tx.type === "Sell" || tx.type === "Deposit";
                            return (
                                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 pl-2">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 cursor-pointer"
                                            checked={isAllSelected}
                                            readOnly
                                        />
                                    </td>
                                    <td className="py-4">{getTypeBadge(tx.type)}</td>
                                    <td className="py-4 max-w-xs">
                                        <p className="font-medium text-[#1F1F1F] text-[16px] pb-2" style={TYPOGRAPHY.body}>{tx.description}</p>
                                        <p className="text-[12px] text-[#858585]" style={TYPOGRAPHY.body}>{tx.subDescription}</p>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-[#1A1C1E] font-medium text-[16px] pb-2">{tx.date}</p>
                                        <p className="text-[12px] text-[#858585]">{tx.timeStamp}</p>
                                    </td>
                                    <td className={`py-4 text-right text-[16px] ${isPositive ? 'text-[#45B424]' : 'text-[#D4001A]'}`} style={TYPOGRAPHY.body}>
                                        {isPositive ? `+₦${tx.amount.toLocaleString()}` : `-₦${tx.amount.toLocaleString()}`}
                                    </td>
                                    <td className="py-4 text-right text-[#1F1F1F]" style={TYPOGRAPHY.body}>
                                        {tx.fees ? `₦${tx.fees.toLocaleString()}` : ""}
                                    </td>
                                    <td className="py-4 text-center">
                                        <span className="px-1 py-0.5 text-[14px] text-white bg-[#22C55E] rounded-sm">
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex items-center justify-center gap-3 text-[#505050]">
                                            {tx.type !== "Deposit" && tx.type !== "Withdrawal" && (
                                                <button
                                                    className="hover:text-black transition-colors cursor-pointer"
                                                    onClick={() => router.push(`/balance-funding/invoice/${tx.id}`)}
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="hover:text-black transition-colors cursor-pointer">
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="flex items-center justify-end gap-2 mt-6">
                <button className="p-2 border border-[#EAEAEA] rounded-lg hover:bg-gray-50"><ChevronLeft className="w-4 h-4 text-[#505050]" /></button>
                <span className="px-4 py-1.5 border border-[#EAEAEA] bg-white rounded-lg text-[14px] font-medium text-[#1A1C1E]">1</span>
                <button className="p-2 border border-[#EAEAEA] rounded-lg hover:bg-gray-50"><ChevronRight className="w-4 h-4 text-[#505050]" /></button>
            </div>
        </div>
    );
}