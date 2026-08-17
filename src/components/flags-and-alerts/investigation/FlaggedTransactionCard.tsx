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
        <div className="bg-white rounded-xl border border-[#E2E8F0]  py-6 px-4">
            <div className="flex items-center gap-2 mb-5">
                <DollarSign className="w-4 h-4 text-[#11110F]" />
                <h2 className="text-[18px] font-semibold text-[#11110F]">
                    Flagged Transaction
                </h2>
            </div>

            <div className="divide-y divide-[#E2E8F0] text-[12px] lg:text-[14px]">

                <div className="py-3 grid grid-cols-3 items-center">
                    <span className="text-[#858585] col-span-1">Transaction ID</span>
                    <span className="text-[#11110F] text-[13px] lg:text-[16px] col-span-2">{data.transactionId}</span>
                </div>

                <div className="py-3 grid grid-cols-3 items-center">
                    <span className="text-[#858585] col-span-1">Amount</span>
                    <span className="text-[#7D8A26] text-[15px] lg:text-[18px] col-span-2">
                        {data.amount}
                    </span>
                </div>

                <div className="py-3 grid grid-cols-3 items-center">
                    <span className="text-[#858585] col-span-1">Destination Campaign</span>
                    <span className="text-[#11110F] text-[13px] lg:text-[16px] col-span-2">
                        {data.destinationCampaign}
                    </span>
                </div>

                <div className="py-3 grid grid-cols-3 items-center">
                    <span className="text-[#858585] col-span-1">Payment Method</span>
                    <span className="text-[#11110F] text-[13px] lg:text-[16px] col-span-2">
                        {data.paymentMethod}
                    </span>
                </div>
            </div>
        </div>
    );
}