"use client";

import { ExternalLink, XCircle } from "lucide-react";

interface SuspensionReasonCardProps {
    reason: string;
    description: string;
    systemFlags: string[];
}

export function SuspensionReasonCard({ reason, description, systemFlags }: SuspensionReasonCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA]">

            <p className="font-medium text-[16px] text-[#11110F] border-b border-[#EAEAEA] p-4">{reason}</p>

            <div className="px-4 py-2 space-y-4">
                <p className="text-[14px] text-[#505050] leading-relaxed">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="border border-[#EAEAEA] rounded-lg p-4 bg-[#FFFFFF] space-y-3">
                        <h3 className="text-xs font-bold text-[#858585] uppercase tracking-wider">
                            System Flags
                        </h3>
                        <div className="space-y-2">
                            {systemFlags.map((flag, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[13px] text-[#D4001A]">
                                    <XCircle className="w-4 h-4 shrink-0" />
                                    <span className="font-medium">{flag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-[#EAEAEA] rounded-lg p-4 bg-[#FFFFFF] space-y-3">
                        <h3 className="text-xs font-bold text-[#858585] uppercase tracking-wider">
                            Review Actions
                        </h3>
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => console.log("View ID")}
                                className="w-full flex items-center justify-between p-2.5 rounded border border-[#EAEAEA] text-xs font-medium text-[#11110F] hover:bg-gray-50 transition-colors"
                            >
                                <span>View submitted ID</span>
                                <ExternalLink className="w-3.5 h-3.5 text-[#858585]" />
                            </button>
                            <button
                                type="button"
                                onClick={() => console.log("View Selfie")}
                                className="w-full flex items-center justify-between p-2.5 rounded border border-[#EAEAEA] text-xs font-medium text-[#11110F] hover:bg-gray-50 transition-colors"
                            >
                                <span>View selfie liveness</span>
                                <ExternalLink className="w-3.5 h-3.5 text-[#858585]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}