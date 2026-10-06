"use client";

import { Check, CheckCircle2 } from "lucide-react";
import { OcrFieldMatch } from "@/types/admin-investor-kyc";

interface OcrExtractedDataProps {
    fields: OcrFieldMatch[];
}

export function OcrExtractedData({ fields }: OcrExtractedDataProps) {
    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA]">
            <div className="flex flex-col gap-3 lg:flex-row items-center justify-between py-5 px-4 border-b border-[#EAEAEA]">
                <h3 className="font-bold text-[16px] text-[#11110F]">OCR Extracted Data</h3>
                <span className="flex items-center gap-2 bg-[#EFFFEB] text-[#45B424] text-[14px] px-2 py-3.5 rounded-md font-bold border border-[#EFFFEB]">
                    <CheckCircle2 className="w-4 h-4" /> All Field Match Submitted Data
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className="bg-[#FCFCFC] p-4 rounded-lg border border-[#EAEAEA] flex items-center justify-between"
                    >
                        <div>
                            <p className="text-[14px] text-[#858585]">{field.label}</p>
                            <p className="text-[16px] font-bold text-[#11110F] mt-1">
                                {field.extractedValue}
                            </p>
                            <p className="text-[14px] text-[#858585] mt-1">
                                Submitted: {field.submittedValue}
                            </p>
                        </div>
                        {field.isMatched && <Check className="w-4 h-4 text-[#45B424]" />}
                    </div>
                ))}
            </div>
        </div>
    );
}