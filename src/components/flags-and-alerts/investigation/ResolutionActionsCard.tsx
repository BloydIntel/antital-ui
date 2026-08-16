import React, { useState } from "react";
import { Check, FileText, X } from "lucide-react";

interface ResolutionActionsCardProps {
    onAction: (action: "clear" | "str" | "reject", notes: string) => void;
}

export function ResolutionActionsCard({ onAction }: ResolutionActionsCardProps) {
    const [notes, setNotes] = useState("");

    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-xs">
            <h2 className="text-[16px] font-semibold text-[#11110F] mb-4">
                Resolution actions
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-[13px] text-[#64748B] mb-2 font-medium">
                        Investigation Notes
                    </label>
                    <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter findings or justification here..."
                        className="w-full rounded-lg border border-[#E2E8F0] p-3 text-[14px] text-[#11110F] placeholder-[#A0AEC0] outline-none focus:border-[#A8BD27] focus:ring-2 focus:ring-[#A8BD27]/20 transition-all resize-none bg-[#F8FAFC]"
                    />
                </div>

                <div className="space-y-2.5 pt-1">
                    <button
                        type="button"
                        onClick={() => onAction("clear", notes)}
                        className="w-full py-2.5 px-4 rounded-lg border border-[#849C14] text-[#849C14] hover:bg-[#F7F9EC] transition-colors font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <Check className="w-4 h-4" />
                        Clear Flag (False Positive)
                    </button>

                    <button
                        type="button"
                        onClick={() => onAction("str", notes)}
                        className="w-full py-2.5 px-4 rounded-lg border border-[#E2E8F0] text-[#11110F] hover:bg-gray-50 transition-colors font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <FileText className="w-4 h-4 text-[#64748B]" />
                        File STR (Suspicious Txn)
                    </button>

                    <button
                        type="button"
                        onClick={() => onAction("reject", notes)}
                        className="w-full py-2.5 px-4 rounded-lg border border-[#FCA5A5] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors font-medium text-[14px] flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                        Reject & Refund
                    </button>
                </div>
            </div>
        </div>
    );
}