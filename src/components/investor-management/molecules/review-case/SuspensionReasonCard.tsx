"use client";

import { TYPOGRAPHY } from "@/constants/styles";
import { Camera, ExternalLink, FileText, X } from "lucide-react";

interface SuspensionReasonCardProps {
    reason: string;
    description: string;
    systemFlags: string[];
}

export function SuspensionReasonCard({ reason, description, systemFlags }: SuspensionReasonCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#EAEAEA]">

            <h2 className="text-[16px] text-[#11110F] border-b border-[#EAEAEA] p-4" style={{ ...TYPOGRAPHY.body, fontWeight: '500' }}>{reason}</h2>

            <div className="px-4 py-2 space-y-2">
                <p className="text-[14px] text-[#858585] leading-relaxed">{description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="border border-[#EAEAEA] rounded-lg p-2 bg-[#FCFCFC] space-y-2">
                        <p className="text-[14px] text-[#2C2C2C] uppercase tracking-wider">
                            System Flags
                        </p>
                        <div className="space-y-2">
                            {systemFlags.map((flag, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[14px] text-[#D4001A]">
                                    <X className="w-4 h-4 shrink-0" />
                                    <span>{flag}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-[#EAEAEA] rounded-lg p-2 bg-[#FFFFFF] space-y-2">
                        <p className="text-[14px] text-[#2C2C2C] uppercase tracking-wider">
                            Review Actions
                        </p>
                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => console.log("View ID")}
                                className="w-full flex items-center justify-between p-2 rounded border border-[#EAEAEA] text-[14px] text-[#505050] hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 shrink-0" />
                                    <span>View submitted ID</span>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-[#858585]" />
                            </button>
                            <button
                                type="button"
                                onClick={() => console.log("View Selfie")}
                                className="w-full flex items-center justify-between p-2 rounded border border-[#EAEAEA] text-[14px] text-[#505050] hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Camera className="w-4 h-4 shrink-0" />
                                    <span>View selfie liveness</span>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-[#858585]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}