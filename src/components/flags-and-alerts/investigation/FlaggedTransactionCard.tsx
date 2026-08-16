import React from "react";
import { DollarSign } from "lucide-react";

export interface FlaggedTransactionData {
    transactionId: string;
    amount: string;
    destinationCampaign: string;
    paymentMethod: string;
}

interface FlaggedTransactionCardProps {
    data: FlaggedTransactionData;
}

export function FlaggedTransactionCard({ data }: FlaggedTransactionCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-5">
                <DollarSign className="w-4 h-4 text-[#64748B]" />
                <h2 className="text-[16px] font-semibold text-[#11110F]">
                    Flagged Transaction
                </h2>
            </div>

            <div className="divide-y divide-[#F1F5F9] text-[14px]">
                <div className="py-3 flex justify-between items-center">
                    <span className="text-[#64748B]">Transaction ID</span>
                    <span className="text-[#11110F] font-medium">{data.transactionId}</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                    <span className="text-[#64748B]">Amount</span>
                    <span className="text-[#849C14] font-bold text-[16px]">
                        {data.amount}
                    </span>
                </div>
                <div className="py-3 flex justify-between items-center">
                    <span className="text-[#64748B]">Destination Campaign</span>
                    <span className="text-[#11110F] font-medium">
                        {data.destinationCampaign}
                    </span>
                </div>
                <div className="py-3 flex justify-between items-center">
                    <span className="text-[#64748B]">Payment Method</span>
                    <span className="text-[#11110F] font-medium">
                        {data.paymentMethod}
                    </span>
                </div>
            </div>
        </div>
    );
}