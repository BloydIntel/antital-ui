"use client";

import { Investor } from "@/types/investor";
import { InvestorStatusBadge } from "./InvestorStatusBadge";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface InvestorTableProps {
    investors: Investor[];
    onViewProfile: (investor: Investor) => void;
    onReviewDocument: (investor: Investor) => void;
    onReviewCase: (investor: Investor) => void;
}

export function InvestorTable({
    investors,
    onViewProfile,
    onReviewDocument,
    onReviewCase,
}: InvestorTableProps) {
    const renderActionButton = (investor: Investor) => {
        if (investor.status === "Active") {
            return (
                <OnboardingButton
                    label="View Profile"
                    variant="plain"
                    onClick={() => onViewProfile(investor)}
                    className="my-0 max-w-[150px] !py-1.5 !px-4 text-[14px] font-normal"
                />
            );
        }

        if (investor.status === "Pending KYC") {
            return (
                <OnboardingButton
                    label="Review Document"
                    variant="plain"
                    onClick={() => onReviewDocument(investor)}
                    className="my-0 max-w-[150px] !py-1.5 !px-4 text-[14px] font-normal"
                />
            );
        }

        return (
            <OnboardingButton
                label="Review Case"
                variant="plain"
                onClick={() => onReviewCase(investor)}
                className="my-0 max-w-[150px] !py-1.5 !px-4 text-[14px] font-normal"
            />
        );
    };

    return (
        <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left text-[14px] border-collapse">
                <thead>
                    <tr className="border-b border-[#EAEAEA] text-[#858585] font-normal">
                        <th className="py-3.5 px-4 font-normal whitespace-nowrap">Investor</th>
                        <th className="py-3.5 px-4 font-normal whitespace-nowrap text-right">Wallet Balance</th>
                        <th className="py-3.5 px-4 font-normal whitespace-nowrap text-center">Joined Date</th>
                        <th className="py-3.5 px-4 font-normal whitespace-nowrap text-center">Status</th>
                        <th className="py-3.5 px-4 font-normal whitespace-nowrap text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] text-[#2C2C2C]">
                    {investors.map((investor) => (
                        <tr key={investor.id} className="hover:bg-[#FAFAFA]/60">
                            {/* Investor Identity Column */}
                            <td className="py-4 px-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#EAEAEA] text-[#1B1B1B] font-medium flex items-center justify-center text-[16px] shrink-0">
                                        {investor.initials}
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[#11110F] text-[14px]">{investor.name}</p>
                                        <p className="text-[14px] text-[#858585]">
                                            {investor.id} • {investor.email}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            {/* Wallet Balance */}
                            <td className="py-4 px-4 text-right text-[#11110F] text-[14px] whitespace-nowrap">
                                {investor.walletBalance}
                            </td>

                            {/* Joined Date */}
                            <td className="py-4 px-4 text-[#505050] text-[14px] whitespace-nowrap text-center">
                                {investor.joinedDate}
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 whitespace-nowrap text-center">
                                <InvestorStatusBadge status={investor.status} />
                            </td>

                            {/* Action Button */}
                            <td className="py-4 px-4 whitespace-nowrap flex justify-center">
                                {renderActionButton(investor)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}