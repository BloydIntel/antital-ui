"use client";

import React, { useState } from "react";
import { CheckCircle2, X, ChevronDown, Check } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface ClearFlagModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { category: string; notes: string }) => void;
    flagId: string;
    entityName: string;
    entityId: string;
    defaultCategory?: string;
    defaultNotes?: string;
}

const RESOLUTION_CATEGORIES = [
    "Verified IP Ownership / Travel",
    "Verified Identity / Secondary KYC",
    "Legitimate High-Volume Transaction",
    "Known Safe Whitelist Proxy",
];

export function ClearFlagModal({
    isOpen,
    onClose,
    onConfirm,
    flagId,
    entityName,
    entityId,
    defaultCategory = "Verified IP Ownership / Travel",
    defaultNotes = "User provided documentation confirming travel to Moscow, Russia. Secondary KYC passed successfully. The transaction is legitimate.",
}: ClearFlagModalProps) {
    const [category, setCategory] = useState<string>(defaultCategory);
    const [notes, setNotes] = useState<string>(defaultNotes);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ category, notes });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="w-full max-w-[520px] rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-6.5 border-b border-[#E2E8F0]">
                    <div className="flex items-center gap-2.5 text-[#11110F]">
                        <CheckCircle2 className="w-5 h-5 shrink-0 text-[#11110F]" />
                        <h2 className="text-[18px] font-semibold text-[#11110F]">
                            Clear Flag
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-[#858585] hover:text-[#11110F] transition-colors p-1 rounded-md cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="pt-4 px-6 pb-6 space-y-5">
                    {/* Warning / Description */}
                    <p className="text-[14px] leading-relaxed text-[#64748B]">
                        You are marking{" "}
                        <strong className="font-semibold text-[#11110F]">{flagId}</strong>{" "}
                        as a false positive. This will close the investigation, restore normal
                        transaction flow, and clear any associated locks on{" "}
                        <strong className="font-semibold text-[#11110F]">
                            {entityName} ({entityId})
                        </strong>
                        .
                    </p>

                    {/* Resolution Category Dropdown */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Resolution Category
                        </label>
                        <div className="relative">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[14px] text-[#11110F] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] cursor-pointer pr-10"
                            >
                                {RESOLUTION_CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    {/* Investigation Notes */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Investigation Notes (Required)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                            rows={4}
                            className="w-full rounded-lg border border-[#E2E8F0] bg-white p-3 text-[14px] leading-relaxed text-[#64748B] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] resize-none"
                            placeholder="Provide details for clearing this flag..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0"
                        />

                        <OnboardingButton
                            type="submit"
                            label={
                                <span className="relative inline-flex items-center justify-center">

                                    <span className="absolute left-0 -translate-x-full opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-[20px] flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                    </span>

                                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-2.5">
                                        Confirm
                                    </span>
                                </span>
                            }
                            className="group my-0 border-white bg-[#042E27] hover:bg-[#074037]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}