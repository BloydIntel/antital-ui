"use client"

import { TYPOGRAPHY } from "@/constants/styles";
import { Button } from "@/components/ui/button";
import { ArrowDownRight, PiggyBank, Plus, RotateCw, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
    availableBalance: number;
    recentActivity: {
        type: string;
        description: string;
        amount: number;
        date: string;
        timeStamp: string;
        status: "Completed" | "Pending" | "Failed"
    }[];
}

const actionCards = [
    {
        title: "Invest",
        description: "Primary market opportunities",
        icon: <ArrowDownRight className="w-6 h-6 text-[#042E27]" />,
        path: "/marketplace?tab=primary"
    },
    {
        title: "Buy shares",
        description: "Secondary market trading",
        icon: <ShoppingCart className="w-6 h-6 text-[#042E27]" />,
        path: "/marketplace?tab=secondary"
    },
    {
        title: "Save",
        description: "Fixed-term savings",
        icon: <PiggyBank className="w-6 h-6 text-[#042E27]" />,
        path: "/fixed-savings"
    },
];

export function BalanceSection({ userData }: { userData: UserData }) {

    const router = useRouter()

    const [formattedDate, setFormattedDate] = useState<string | null>(null);

    useEffect(() => {
        const date = new Date();
        const str = date.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        setFormattedDate(str);
    }, []);

    return (
        <div className="bg-[#042E27] border rounded-lg px-4">
            <div className='flex justify-between items-center py-4'>
                <div>
                    <p className="text-[20px] text-[#F4F5F7]">
                        Total available balance
                    </p>
                    <p className='text-[16px] text-[#F4F5F7]' style={TYPOGRAPHY.body}>
                        Funds ready for investment
                    </p>
                </div>

                <Button
                    variant="outline"
                    className='text-[16px] h-full px-40 flex items-center gap-2 border-[#EAEAEA] text-[#1A1C1E] bg-white hover:bg-gray-50 rounded-md cursor-pointer'
                    style={TYPOGRAPHY.heading}
                >
                    <Plus className='w-5 h-5' />
                    Add Funds
                </Button>
            </div>

            <div className="py-12 text-center">
                <h3 className="text-[28px] text-[#F4F5F7] pb-1" style={TYPOGRAPHY.heading}> ₦{userData.availableBalance.toLocaleString()}.00</h3>
                <div className="flex gap-2 items-center justify-center">
                    <p className="text-[16px] text-[#EAEAEA]" style={TYPOGRAPHY.body}>
                        Last updated: {formattedDate || "Loading..."}
                    </p>
                    <button>
                        <RotateCw className="w-5 h-5 text-[#EAEAEA]" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-10">
                {actionCards.map((card, index) => (
                    <div
                        key={index}
                        className="group flex flex-col items-center justify-center p-8 bg-[#E6EAE9] rounded-xl cursor-pointer hover:bg-transparent transition-colors border border-transparent active:border-[#042E27]"
                        onClick={() => router.push(card.path)}
                    >
                        {/* Icon Container */}
                        <div className="mb-6 bg-[#E6EAE9] p-1">
                            {card.icon}
                        </div>

                        {/* Text Content */}
                        <h4
                            className="text-[20px] text-[#021310] mb-1 group-hover:text-[#E6EAE9]"
                            style={TYPOGRAPHY.body}
                        >
                            {card.title}
                        </h4>
                        <p
                            className="text-[14px] text-[#8C9F9C] text-center"
                            style={TYPOGRAPHY.body}
                        >
                            {card.description}
                        </p>
                    </div>
                ))}
            </div>

            <p className="text-[14px] text-[#F4F5F7] pt-7 pb-5" style={TYPOGRAPHY.body}>
                Powered by Big Bank of Nigeria
            </p>
        </div>
    )
}
