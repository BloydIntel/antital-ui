"use client";

import React, { useState } from "react";
import { X, ChevronDown, LockKeyhole } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface FreezeAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { reason: string; notes: string; notifyUser: boolean }) => void;
    entityName: string;
    entityId: string;
    defaultReason?: string;
    defaultNotes?: string;
}

const REASON_OPTIONS = [
    "AML / Fraud Suspicion (FLG-1092)",
    "Sanctions & OFAC Match",
    "Unusual High-Volume Activity",
    "Manual Compliance Request",
];

export function FreezeAccountModal({
    isOpen,
    onClose,
    onConfirm,
    entityName,
    entityId,
    defaultReason = "AML / Fraud Suspicion (FLG-1092)",
    defaultNotes = "System flagged transaction due to a high-risk IP address matching our OFAC sanctions proxy list. Freezing account to prevent further unauthorized activity pending full compliance review",
}: FreezeAccountModalProps) {
    const [reason, setReason] = useState<string>(defaultReason);
    const [notes, setNotes] = useState<string>(defaultNotes);
    const [notifyUser, setNotifyUser] = useState<boolean>(true);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onConfirm({ reason, notes, notifyUser });
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
                    <div className="flex items-center gap-2.5 text-[#D4001A]">
                        <LockKeyhole className="w-5 h-5 shrink-0" />
                        <h2 className="text-[18px] font-semibold text-[#D4001A]">
                            Freeze Account
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
                    {/* Warning Description */}
                    <p className="text-[14px] leading-relaxed text-[#64748B]">
                        You are about to suspend all platform activities for{" "}
                        <strong className="font-semibold text-[#11110F]">
                            {entityName} ({entityId})
                        </strong>
                        . This action will halt any pending transactions, secondary market
                        trades, and withdrawals. Active escrow funds remain secured.
                    </p>

                    {/* Reason Dropdown */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Reason for Freeze
                        </label>
                        <div className="relative">
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[14px] text-[#11110F] outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] cursor-pointer pr-10"
                            >
                                {REASON_OPTIONS.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    {/* Internal Notes */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Internal Notes (Required)
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                            rows={4}
                            className="w-full rounded-lg border border-[#E2E8F0] bg-white p-3 text-[14px] leading-relaxed text-[#64748B] outline-none focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] resize-none"
                            placeholder="Provide reason for account freeze..."
                        />
                    </div>

                    {/* Checkbox Notification */}
                    <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            checked={notifyUser}
                            onChange={(e) => setNotifyUser(e.target.checked)}
                            className="w-4 h-4 rounded border-[#E2E8F0] text-[#042E27] focus:ring-0 cursor-pointer accent-[#042E27]"
                        />
                        <span className="text-[14px] text-[#64748B]">
                            Notify user via email about this suspension
                        </span>
                    </label>

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
                                <span className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-x-[24px]">
                                    Confirm Freeze
                                </span>
                            }
                            icon={
                                <span className="inline-flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:translate-x-[120px]">
                                    <LockKeyhole className="w-4 h-4" />
                                </span>
                            }
                            className="group my-0 border-white bg-[#D4001A]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}