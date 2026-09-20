"use client";

import { PositionTransactionRecord } from "@/types/position-detail";

interface PositionTransactionHistoryTableProps {
    transactions: PositionTransactionRecord[];
}

export function PositionTransactionHistoryTable({ transactions }: PositionTransactionHistoryTableProps) {

    const getStatusColorClass = (status: string) => {
        const normalized = status.trim().toLowerCase();

        switch (normalized) {
            case "settled":
            case "completed":
            case "successful":
                return "text-[#16A34A]"; // Green
            case "pending":
            case "processing":
            case "hold":
                return "text-[#D97706]"; // Amber/Yellow
            case "failed":
            case "cancelled":
            case "rejected":
                return "text-[#DC2626]"; // Red
            default:
                return "text-[#666666]"; // Neutral Gray
        }
    };

    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 overflow-hidden">
            <h2 className="text-[16px] font-medium text-[#040C17] border-b border-[#EAEAEA] p-4 -mx-4">Position Transaction History</h2>

            <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left text-[14px] border-collapse">
                    <thead>
                        <tr className="border-b border-[#EAEAEA] text-[#666666] font-normal">
                            <th className="py-3 px-4 font-normal">Reference</th>
                            <th className="py-3 px-4 font-normal">Type</th>
                            <th className="py-3 px-4 font-normal">Date</th>
                            <th className="py-3 px-4 font-normal whitespace-nowrap">Payment method</th>
                            <th className="py-3 px-4 font-normal text-right">Amount</th>
                            <th className="py-3 px-4 font-normal text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAEAEA] text-[#2C2C2C]">
                        {transactions.map((tx, idx) => (
                            <tr key={idx} className="hover:bg-[#FAFAFA]/60">
                                <td className="py-3 px-4 text-[#2C2C2C] whitespace-nowrap">{tx.reference}</td>
                                <td className="py-3 px-4 text-[#2C2C2C] whitespace-nowrap">{tx.type}</td>
                                <td className="py-3 px-4 text-[#2C2C2C] whitespace-nowrap">{tx.date}</td>
                                <td className="py-3 px-4 text-[#2C2C2C] whitespace-nowrap">{tx.paymentMethod}</td>
                                <td className="py-3 px-4 text-right font-medium whitespace-nowrap">{tx.amount}</td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                    <span className={`font-medium ${getStatusColorClass(tx.status)}`}>
                                        {tx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}