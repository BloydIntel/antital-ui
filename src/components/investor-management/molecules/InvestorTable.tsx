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
                    className="my-0 !py-1.5 !px-4 text-[14px] font-normal"
                />
            );
        }

        if (investor.status === "Pending KYC") {
            return (
                <OnboardingButton
                    label="Review Document"
                    variant="plain"
                    onClick={() => onReviewDocument(investor)}
                    className="my-0 !py-1.5 !px-4 text-[14px] font-normal"
                />
            );
        }

        return (
            <OnboardingButton
                label="Review Case"
                variant="plain"
                onClick={() => onReviewCase(investor)}
                className="my-0 !py-1.5 !px-4 text-[14px] font-normal"
            />
        );
    };

    return (
        <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left text-[14px] border-collapse">
                <thead>
                    <tr className="border-b border-[#EAEAEA] text-[#858585] font-normal">
                        <th className="py-3.5 px-4 font-normal">Investor</th>
                        <th className="py-3.5 px-4 font-normal text-right">Wallet Balance</th>
                        <th className="py-3.5 px-4 font-normal">Joined Date</th>
                        <th className="py-3.5 px-4 font-normal">Status</th>
                        <th className="py-3.5 px-4 font-normal text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] text-[#2C2C2C]">
                    {investors.map((investor) => (
                        <tr key={investor.id} className="hover:bg-[#FAFAFA]/60">
                            {/* Investor Identity Column */}
                            <td className="py-4 px-4 whitespace-nowrap">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#EAEAEA] text-[#444444] font-medium flex items-center justify-center text-[14px] shrink-0">
                                        {investor.initials}
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#11110F]">{investor.name}</p>
                                        <p className="text-[13px] text-[#858585]">
                                            {investor.id} • {investor.email}
                                        </p>
                                    </div>
                                </div>
                            </td>

                            {/* Wallet Balance */}
                            <td className="py-4 px-4 text-right font-medium text-[#11110F] whitespace-nowrap">
                                {investor.walletBalance}
                            </td>

                            {/* Joined Date */}
                            <td className="py-4 px-4 text-[#505050] whitespace-nowrap">
                                {investor.joinedDate}
                            </td>

                            {/* Status */}
                            <td className="py-4 px-4 whitespace-nowrap">
                                <InvestorStatusBadge status={investor.status} />
                            </td>

                            {/* Action Button */}
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                                {renderActionButton(investor)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}