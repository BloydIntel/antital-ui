import { MoveDownRight, Settings, TrendingUp } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";
import { useRouter } from "next/navigation";

interface ActivityItem {
    type: string;
    description: string;
    amount: number;
    date: string;
    timeStamp: string;
}

// Helper function to render the correct icon based on activity type
const getActivityIcon = (type: string) => {
    switch (type) {
        case "Deposit":
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <MoveDownRight className="w-5 h-5 text-[#16A34A]" />
                </div>
            );
        case "Investment":
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <TrendingUp className="w-5 h-5 text-[#16A34A]" />
                </div>
            );
        case "Charges":
        default:
            return (
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                    <Settings className="w-5 h-5 text-[#1A1C1E]" />
                </div>
            );
    }
};

// Helper function to format amount signs (+/-)
const getAmountString = (type: string, amount: number) => {
    const formatted = `₦${amount.toLocaleString()}`;
    return type === "Deposit" ? `+${formatted}` : `-${formatted}`;
};

export function RecentActivitySection({ userRecentActivityData }: { userRecentActivityData: ActivityItem[] }) {

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
                {userRecentActivityData.map((activity, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-4 py-6 bg-white rounded-lg border border-[#EAEAEA]"
                    >
                        {/* Left Side: Icon & Details */}
                        <div className="flex items-center gap-4">
                            {getActivityIcon(activity.type)}
                            <div>
                                <p
                                    className="text-[18px] text-[#1F1F1F] font-medium"
                                    style={TYPOGRAPHY.body}
                                >
                                    {activity.description}
                                </p>
                                <p
                                    className="text-[14px] text-[#858585] mt-0.5"
                                    style={TYPOGRAPHY.body}
                                >
                                    {activity.date}, {activity.timeStamp}
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Amount & Status Badge */}
                        <div className="flex flex-col items-end gap-1.5">
                            <span
                                className="text-[20px] text-[#2C2C2C]"
                                style={TYPOGRAPHY.body}
                            >
                                {getAmountString(activity.type, activity.amount)}
                            </span>
                            <span
                                className="px-1 py-0.5 text-[12px] text-white bg-[#45B424] rounded-md"
                                style={TYPOGRAPHY.body}
                            >
                                Completed
                            </span>
                        </div>
                    </div>
                ))}
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
