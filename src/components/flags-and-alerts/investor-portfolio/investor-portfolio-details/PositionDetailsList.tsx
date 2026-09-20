"use client";

import { PositionInfo } from "@/types/position-detail";

interface PositionDetailsListProps {
    details: PositionInfo;
}

export function PositionDetailsList({ details }: PositionDetailsListProps) {
    const listItems = [
        { label: "Investment ID", value: details.investmentId },
        { label: "Campaign ID", value: details.campaignId },
        { label: "Asset Class", value: details.assetClass },
        { label: "Entry Price (NAV)", value: `${details.entryPriceNav} / unit` },
        { label: "Current NAV", value: `${details.currentNav} / unit` },
        { label: "Units Held", value: details.unitsHeld },
        { label: "Investment Date", value: details.investmentDate },
        { label: "Campaign Closes", value: details.campaignCloses },
        { label: "Holding period", value: details.holdingPeriod },
    ];

    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA] space-y-4">
            <h2 className="text-[16px] font-medium text-[#040C17] border-b border-[#EAEAEA] p-4">Position Details</h2>
            <div className="px-4">
                {listItems.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2.5 text-[14px]">
                        <span className="text-[#858585]">{item.label}</span>
                        <span className="font-medium text-[#858585]">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}