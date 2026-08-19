"use client";

import { useState, type FormEvent } from "react";
import { X, ChevronDown } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface FileStrModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        indicator: string;
        narrative: string;
        includeAttachments: boolean;
    }) => void;
    entityName?: string;
    entityId?: string;
    transactionId?: string;
    defaultIndicator?: string;
    defaultNarrative?: string;
}

const SUSPICION_INDICATORS = [
    "Transactions involving high-risk jurisdictions",
    "Structuring / Smurfing Pattern",
    "Unusual or Unexplained Account Activity",
    "OFAC Sanctions / Watchlist Match",
];

export function FileStrModal({
    isOpen,
    onClose,
    onConfirm,
    entityName = "John Doe",
    entityId = "INV-89344",
    transactionId = "TXN-37828489",
    defaultIndicator = "Transactions involving high-risk jurisdictions",
    defaultNarrative = "User attempted to transfer NGN 2,500,000 from an IP address resolving to a known proxy in Moscow, Russia. The transaction volume significantly deviates from the historical activity",
}: FileStrModalProps) {
    const [indicator, setIndicator] = useState<string>(defaultIndicator);
    const [narrative, setNarrative] = useState<string>(defaultNarrative);
    const [includeAttachments, setIncludeAttachments] = useState<boolean>(true);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onConfirm({ indicator, narrative, includeAttachments });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="w-full max-w-[520px] rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
                    <h2 className="text-[18px] font-semibold text-[#11110F]">
                        File Suspicious Transaction Report
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#64748B] hover:text-[#11110F] transition-colors p-1 rounded-md cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Red Warning Banner */}
                    <div className="rounded-xl bg-[#FB2C360D] border border-[#FB2C3633] p-4 text-[14px] leading-relaxed text-[#D4001A]">
                        Submitting this form will automatically generate an STR packet formatted
                        to NFIU guidelines and attach it to the regulatory queue.{" "}
                        <strong className="font-semibold block mt-0.5">
                            This action cannot be undone
                        </strong>
                    </div>

                    {/* Entity & Transaction ID Summary Grid */}
                    <div className="grid grid-cols-2 gap-4 px-1">
                        <div>
                            <span className="block text-[14px] text-[#858585] mb-1">
                                Entity
                            </span>
                            <span className="block text-[16px]  text-[#11110F]">
                                {entityName} ({entityId})
                            </span>
                        </div>
                        <div>
                            <span className="block text-[14px] text-[#858585] mb-1">
                                Transaction Id
                            </span>
                            <span className="block text-[16px] text-[#11110F]">
                                {transactionId}
                            </span>
                        </div>
                    </div>

                    {/* Primary Suspicion Indicator */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Primary suspicion Indicator
                        </label>
                        <div className="relative">
                            <select
                                value={indicator}
                                onChange={(e) => setIndicator(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[14px] text-[#11110F] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] cursor-pointer pr-10"
                            >
                                {SUSPICION_INDICATORS.map((ind) => (
                                    <option key={ind} value={ind}>
                                        {ind}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    {/* Detail Narrative Textarea */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Detail Narrative (For Regular)
                        </label>
                        <textarea
                            rows={4}
                            value={narrative}
                            onChange={(e) => setNarrative(e.target.value)}
                            placeholder="Enter narrative details..."
                            className="w-full rounded-lg border border-[#E2E8F0] bg-white p-3 text-[14px] leading-relaxed text-[#11110F] placeholder-[#858585] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] transition-all resize-none"
                        />
                    </div>

                    {/* Include Attachments Checkbox */}
                    <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            checked={includeAttachments}
                            onChange={(e) => setIncludeAttachments(e.target.checked)}
                            className="w-4 h-4 rounded border-[#E2E8F0] text-[#042E27] focus:ring-[#042E27] cursor-pointer accent-[#042E27]"
                        />
                        <span className="text-[14px] text-[#11110F]">
                            Include Attachements
                        </span>
                    </label>

                    {/* Action Buttons using exact requested styling */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0 "
                        />

                        <OnboardingButton
                            type="submit"
                            label="Submit"
                            className=" my-0 border-[#858585]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}