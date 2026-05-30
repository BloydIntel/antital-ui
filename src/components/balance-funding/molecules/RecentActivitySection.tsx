"use client"

import { MoveDownRight, MoveUpRight, Settings, TrendingUp } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";
import { useRouter } from "next/navigation";
import { StatusButton } from '@/components/balance-funding/atoms/StatusButton';
import { TransactionItem } from "@/data/transactionsMockData";

// Helper function to render the correct icon based on activity type
const getActivityIcon = (type: string) => {
    switch (type) {
        case "Deposit":
        case "Sell":
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <MoveDownRight className="w-5 h-5 text-[#16A34A]" />
                </div>
            );
        case "Investment":
        case "Buy":
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <TrendingUp className="w-5 h-5 text-[#16A34A]" />
                </div>
            );
        case "Withdrawal":
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <MoveUpRight className="w-5 h-5 text-[#D4001A]" />
                </div>
            );
        case "Fee":
        default:
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <Settings className="w-5 h-5 text-[#1A1C1E]" />
                </div>
            );
    }
};


export function RecentActivitySection({ userRecentActivityData }: { userRecentActivityData: TransactionItem[] }) {

    const router = useRouter()

    return (
        <div className="w-full bg-transparent mt-8">
            {/* Section Title */}
            <h3
                className="text-[20px] text-[#1A1C1E] mb-4 font-medium"
                style={TYPOGRAPHY.heading}
            >
                Recent Activity
            </h3>

            {/* Activity List Container */}
            <div className="space-y-3 mb-6">
                {userRecentActivityData.map((activity) => {
                    const isPositive = activity.type === "Deposit" || activity.type === "Sell";
                    const formattedAmount = `₦${activity.amount.toLocaleString()}`;

                    return (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between px-2 lg:px-4 py-3 lg:py-6 bg-white rounded-lg border border-[#EAEAEA]"
                        >
                            {/* Left Side: Icon & Details */}
                            <div className="flex items-center gap-2 lg:gap-4">
                                {getActivityIcon(activity.type)}
                                <div>
                                    <p
                                        className="text-[14px] lg:text-[18px] text-[#1F1F1F] font-medium"
                                        style={TYPOGRAPHY.body}
                                    >
                                        {activity.description}
                                    </p>
                                    <p
                                        className="text-[12px] lg:text-[14px] text-[#858585] mt-0.5"
                                        style={TYPOGRAPHY.body}
                                    >
                                        {activity.date}, {activity.timeStamp}
                                    </p>
                                </div>
                            </div>

                            {/* Right Side: Amount & Status Badge */}
                            <div className="flex flex-col items-end gap-1.5">
                                <span
                                    className="text-[14px] lg:text-[20px] text-[#2C2C2C]"
                                    style={TYPOGRAPHY.body}
                                >
                                    {isPositive ? `+${formattedAmount}` : `-${formattedAmount}`}
                                </span>
                                <StatusButton status={activity.status} />
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Footer Action Button */}
            <button
                className="w-full py-3 bg-[#042E27] text-[#F4F5F7] rounded-lg font-medium hover:bg-[#A7B832] hover:text-black transition-colors cursor-pointer text-[16px]"
                style={TYPOGRAPHY.heading}
                onClick={() => router.push('/balance-funding?tab=Transactions')}
            >
                View all transactions
            </button>
        </div>
    )
}
