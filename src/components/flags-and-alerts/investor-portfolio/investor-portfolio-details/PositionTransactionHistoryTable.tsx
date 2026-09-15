"use client";

import { PositionTransactionRecord } from "@/types/position-detail";

interface PositionTransactionHistoryTableProps {
    transactions: PositionTransactionRecord[];
}

export function PositionTransactionHistoryTable({ transactions }: PositionTransactionHistoryTableProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA] px-4 overflow-hidden">
            <h2 className="text-[16px] font-medium text-[#040C17] border-b border-[#EAEAEA] p-4 -mx-4">Position Transaction History</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-[14px] border-collapse">
                    <thead>
                        <tr className="border-b border-[#EAEAEA] text-[#666666] font-normal">
                            <th className="py-3 px-4 font-normal">Reference</th>
                            <th className="py-3 px-4 font-normal">Type</th>
                            <th className="py-3 px-4 font-normal">Date</th>
                            <th className="py-3 px-4 font-normal">Payment method</th>
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
                                    <span className="text-[#16A34A]">{tx.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}