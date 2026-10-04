"use client";

import { Check, CheckCircle2 } from "lucide-react";
import { OcrFieldMatch } from "@/types/admin-investor-kyc";

interface OcrExtractedDataProps {
    fields: OcrFieldMatch[];
}

export function OcrExtractedData({ fields }: OcrExtractedDataProps) {
    return (
        <div className="bg-white p-5 rounded-lg border border-[#EAEAEA]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#11110F]">OCR Extracted Data</h3>
                <span className="flex items-center gap-1 bg-green-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium border border-green-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All Field Match Submitted Data
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className="bg-gray-50/70 p-3 rounded-lg border border-gray-100 flex items-start justify-between"
                    >
                        <div>
                            <p className="text-xs text-[#858585]">{field.label}</p>
                            <p className="text-sm font-semibold text-[#11110F] mt-0.5">
                                {field.extractedValue}
                            </p>
                            <p className="text-[11px] text-[#858585] mt-1">
                                Submitted: {field.submittedValue}
                            </p>
                        </div>
                        {field.isMatched && <Check className="w-4 h-4 text-emerald-600 mt-1" />}
                    </div>
                ))}
            </div>
        </div>
    );
}