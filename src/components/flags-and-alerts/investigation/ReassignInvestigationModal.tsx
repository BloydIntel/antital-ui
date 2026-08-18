"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface ReassignInvestigationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { assignee: string; note: string }) => void;
    flagId: string;
    defaultAssignee?: string;
    defaultNote?: string;
}

const COMPLIANCE_OFFICERS = [
    "Sarah Michelle (Senior compliance officer)",
    "Alex Johnson (Compliance Analyst)",
    "David Chen (Risk Specialist)",
    "Elena Rostova (AML Lead)",
];

export function ReassignInvestigationModal({
    isOpen,
    onClose,
    onConfirm,
    flagId,
    defaultAssignee = "Sarah Michelle (Senior compliance officer)",
    defaultNote = "Hey sarah, I did the initial pass but need yur senior approval on the OFAC check before we clear this. Documents are attached",
}: ReassignInvestigationModalProps) {
    const [assignee, setAssignee] = useState<string>(defaultAssignee);
    const [note, setNote] = useState<string>(defaultNote);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ assignee, note });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="w-full max-w-[520px] rounded-2xl bg-white shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
                    <h2 className="text-[18px] font-semibold text-[#11110F]">
                        Reassign Investigation
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
                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-[#858585]">
                        You are reassigning investigation{" "}
                        <strong className="font-semibold text-[#2C2C2C]">{flagId}</strong> to
                        another compliance officer. They will be notified and this alert will be
                        moved to their queue.
                    </p>

                    {/* Select Assignee */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] font-medium text-[#11110F]">
                            Select assignee&apos;s
                        </label>
                        <div className="relative">
                            <select
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[14px] text-[#11110F] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] cursor-pointer pr-10"
                            >
                                {COMPLIANCE_OFFICERS.map((officer) => (
                                    <option key={officer} value={officer}>
                                        {officer}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    {/* Note for Assignee */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] font-medium text-[#11110F]">
                            Note for assignee (Optional)
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={4}
                            className="w-full rounded-lg border border-[#EAEAEA] bg-white p-3 text-[14px] leading-relaxed text-[#11110F] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] resize-none placeholder-[#858585]"
                            placeholder="Add a note for the assignee..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0"
                        />

                        <OnboardingButton
                            type="submit"
                            label="Confirm"
                            className="my-0 border-[#858585]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}