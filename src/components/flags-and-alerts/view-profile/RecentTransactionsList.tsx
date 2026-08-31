"use client";

import { AlertCircle } from "lucide-react";

export interface TransactionItem {
    id: string;
    title: string;
    txnCode: string;
    date: string;
    amount: string;
    status: "Hold" | "Completed" | string;
    isFlagged?: boolean;
    type: "debit" | "credit";
}

interface RecentTransactionsProps {
    items: TransactionItem[];
    onViewAll?: () => void;
}

export function RecentTransactionsList({ items, onViewAll }: RecentTransactionsProps) {
    return (
        <div className="bg-white rounded-md">
            {/* Header section with full-width bottom border */}
            <div className="flex items-center justify-between border-b border-[#EAEAEA] py-4 px-6">
                <h3 className="text-[16px] font-medium text-[#040C17]">Recent Transactions</h3>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-[16px] font-medium text-[#7BA147] hover:text-[#7BA147]/70 hover:underline transition-colors cursor-pointer"
                >
                    View all
                </button>
            </div>

            {/* List content section */}
            <div className="px-4 py-5 space-y-4">
                {items.map((txn) => {
                    const isCredit = txn.type === "credit";
                    return (
                        <div
                            key={txn.id}
                            className="flex items-center justify-between"
                        >
                            {/* Title and details */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[14px] lg:text-[16px] text-[#1F1F1F]">
                                        {txn.title}
                                    </span>
                                    {txn.isFlagged && (
                                        <AlertCircle className="w-4 lg:w-5 h-4 lg:h-5 text-[#D4001A]" />
                                    )}
                                </div>
                                <span className="block text-[12px] lg:text-[14px] text-[#858585]">
                                    {txn.txnCode} – {txn.date}
                                </span>
                            </div>

                            {/* Amount and Status */}
                            <div className="text-right space-y-2">
                                <span
                                    className={`block text-[14px] lg:text-[16px] font-bold ${isCredit
                                        ? "text-[#45B424]"
                                        : "text-[#D4001A]"
                                        }`}
                                >
                                    {isCredit ? `+${txn.amount}` : `-${txn.amount}`}
                                </span>
                                <span className="block text-[12px] lg:text-[14px] text-[#858585]">
                                    {txn.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}