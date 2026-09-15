"use client";

import React from "react";
import { Clock } from "lucide-react";

interface DistributionsCardProps {
    expectedDate?: string;
}

export function DistributionsCard({ expectedDate = "Mar 31, 2024" }: DistributionsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA]">
            <div className="flex items-center justify-between mb-8 border-b border-[#EAEAEA] p-4">
                <h2 className="text-[16px] font-medium text-[#040C17]">Distributions & Dividends</h2>
                <span className="text-[12px] text-[#A8A8A8]">No distributions yet for this position</span>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center">
                <Clock className="w-6 h-6 text-[#858585] mb-2" />
                <p className="text-[13px] text-[#666666]">
                    First distribution expected at campaign close ({expectedDate})
                </p>
            </div>
        </div>
    );
}