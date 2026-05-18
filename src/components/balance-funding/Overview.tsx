import { BalanceSection } from "@/components/balance-funding/BalanceSection";
import { TYPOGRAPHY } from "@/constants/styles";
import { ShieldAlert } from "lucide-react";
import { RecentActivitySection } from "@/components/balance-funding/RecentActivitySection";

const userData = {
    availableBalance: 5325400,
    recentActivity: [
        {
            type: "Deposit",
            description: "Bank transfer received",
            amount: 100000,
            date: "2026-05-14",
            timeStamp: "10:00 AM"
        },
        {
            type: "Investment",
            description: "Investment in GreenTech Solutions",
            amount: 75000,
            date: "2026-05-14",
            timeStamp: "10:00 AM"
        },
        {
            type: "Fee",
            description: "Investment processing fee",
            amount: 1850,
            date: "2026-05-14",
            timeStamp: "10:00 AM"
        }
    ]
}

export function Overview() {
    return (
        <div>
            <BalanceSection userData={userData} />

            <div className="mt-12 pt-4 pl-4 border border-[#EAEAEA]">
                <div className="flex text-[#1F1F1F] gap-2 items-center">
                    <ShieldAlert className="w-5 h-5" />
                    <p className="text-[20px]">Security Notice:</p>
                </div>
                <p className="text-[14px] text-[#505050] py-2" style={TYPOGRAPHY.body}>
                    Your funds are securely held with our partner bank, First Bank of Nigeria, not directly with Antital. All transactions are protected by bank-grade security and Nigerian banking regulations.
                </p>
            </div>

            <RecentActivitySection userRecentActivityData={userData.recentActivity} />
        </div>
    )
}
