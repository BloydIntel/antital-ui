import React from "react";
import { AlertTriangle } from "lucide-react";

export interface TriggerContextData {
    flagType: string;
    timeDetected: string;
    sourceIp: string;
    ipNote?: string;
    location: string;
    systemNote: string;
}

interface TriggerContextCardProps {
    data: TriggerContextData;
}

export function TriggerContextCard({ data }: TriggerContextCardProps) {
    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-5">
                <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
                <h2 className="text-[16px] font-semibold text-[#11110F]">
                    Trigger Context
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-[13px]">
                <div>
                    <p className="text-[#94A3B8] font-medium uppercase text-[11px] tracking-wider mb-1">
                        Flag Type
                    </p>
                    <p className="text-[#11110F] font-medium">{data.flagType}</p>
                </div>

                <div>
                    <p className="text-[#94A3B8] font-medium uppercase text-[11px] tracking-wider mb-1">
                        Time Detected
                    </p>
                    <p className="text-[#11110F] font-medium">{data.timeDetected}</p>
                </div>

                <div>
                    <p className="text-[#94A3B8] font-medium uppercase text-[11px] tracking-wider mb-1">
                        Source IP
                    </p>
                    <p className="text-[#11110F] font-medium">
                        <span className="text-[#DC2626]">{data.sourceIp}</span>{" "}
                        {data.ipNote && (
                            <span className="text-[#94A3B8] font-normal">{data.ipNote}</span>
                        )}
                    </p>
                </div>

                <div>
                    <p className="text-[#94A3B8] font-medium uppercase text-[11px] tracking-wider mb-1">
                        Location
                    </p>
                    <p className="text-[#11110F] font-medium">{data.location}</p>
                </div>
            </div>

            <div className="mt-5 p-4 rounded-lg bg-[#FEF2F2] border border-[#FEE2E2]">
                <p className="text-[13px] text-[#DC2626] leading-relaxed">
                    {data.systemNote}
                </p>
            </div>
        </div>
    );
}