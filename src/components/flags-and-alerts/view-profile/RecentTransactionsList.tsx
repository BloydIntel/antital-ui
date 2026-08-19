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
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <h3 className="text-[15px] font-bold text-[#11110F]">Recent Transactions</h3>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-[13px] font-medium text-[#858585] hover:text-[#11110F] transition-colors cursor-pointer"
                >
                    View All
                </button>
            </div>

            <div className="space-y-4 divide-y divide-[#F1F5F9]">
                {items.map((txn, index) => {
                    const isCredit = txn.type === "credit";
                    return (
                        <div
                            key={txn.id}
                            className={`flex items-center justify-between ${index !== 0 ? "pt-4" : ""
                                }`}
                        >
                            {/* Title and details */}
                            <div className="space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[14px] font-semibold text-[#11110F]">
                                        {txn.title}
                                    </span>
                                    {txn.isFlagged && (
                                        <AlertCircle className="w-4 h-4 text-[#D4001A]" />
                                    )}
                                </div>
                                <span className="block text-[12px] text-[#858585]">
                                    {txn.txnCode} – {txn.date}
                                </span>
                            </div>

                            {/* Amount and Status */}
                            <div className="text-right space-y-0.5">
                                <span
                                    className={`block text-[14px] font-bold ${isCredit
                                        ? "text-[#10B981]"
                                        : txn.isFlagged
                                            ? "text-[#D4001A]"
                                            : "text-[#D4001A]"
                                        }`}
                                >
                                    {isCredit ? `+${txn.amount}` : `-${txn.amount}`}
                                </span>
                                <span className="block text-[12px] text-[#858585]">
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