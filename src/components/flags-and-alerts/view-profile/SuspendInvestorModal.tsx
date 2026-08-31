"use client";

import { useState, FormEvent } from "react";
import { X, ChevronDown } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface SuspendInvestorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: {
        reason: string;
        details: string;
        notifyUser: boolean;
        requirePasswordReset: boolean;
    }) => void;
    user: {
        name: string;
        id: string;
    };
}

const SUSPENSION_REASONS = [
    "Pending KYC Verification",
    "AML / Fraud Suspicion",
    "Compliance Review Required",
    "Administrative Hold",
];

export function SuspendInvestorModal({
    isOpen,
    onClose,
    onSubmit,
    user,
}: SuspendInvestorModalProps) {
    const [reason, setReason] = useState(SUSPENSION_REASONS[0]);
    const [details, setDetails] = useState("");
    const [notifyUser, setNotifyUser] = useState(true);
    const [requirePasswordReset, setRequirePasswordReset] = useState(true);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
                reason,
                details,
                notifyUser,
                requirePasswordReset,
            });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-[520px] rounded-2xl bg-white shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#EAEAEA] px-6 py-5">
                    <h2 className="text-[16px] font-medium text-[#11110F]">
                        Suspend Investor Account
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-[#11110F] hover:bg-[#F8F9FA] hover:text-[#858585] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Dynamic Warning Banner */}
                    <p className="text-[14px] leading-relaxed text-[#606060]">
                        You are about to suspend <span className="font-semibold text-[#11110F]">{user.name}</span> ({user.id}). This will prevent the user from making new investments, trading on the secondary market, and withdrawing funds. Active portfolio positions will remain intact.
                    </p>

                    {/* Reason Selector */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Reason for Suspension
                        </label>
                        <div className="relative">
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full appearance-none rounded-md border border-[#E2E8F0] bg-white px-4 py-3 text-[14px] text-[#323232] focus:border-[#11110F] focus:outline-none cursor-pointer"
                            >
                                {SUSPENSION_REASONS.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#858585]" />
                        </div>
                    </div>

                    {/* Details Input */}
                    <div className="space-y-1.5">
                        <label className="block text-[14px] font-medium text-[#11110F]">
                            Suspension Details (Required)
                        </label>
                        <textarea
                            rows={4}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="User failed to provide required proof of address..."
                            className="w-full resize-none rounded-md border border-[#E2E8F0] p-4 text-[14px] text-[#323232] placeholder-[#858585] focus:border-[#11110F] focus:outline-none"
                            required
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3 pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#11110F]">
                            <input
                                type="checkbox"
                                checked={notifyUser}
                                onChange={(e) => setNotifyUser(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#30534C] focus:ring-[#30534C] accent-[#30534C]"
                            />
                            Notify user via email immediately
                        </label>

                        <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#11110F]">
                            <input
                                type="checkbox"
                                checked={requirePasswordReset}
                                onChange={(e) => setRequirePasswordReset(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#30534C] focus:ring-[#30534C] accent-[#30534C]"
                            />
                            Require password reset on next login attempt
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0 col-span-1 text-[13px] lg:text-[16px]"
                        />
                        <OnboardingButton
                            type="submit"
                            label="Confirm Suspension"
                            className="my-0 col-span-1 bg-[#30534C] text-[#FFFFFF] hover:bg-[#25423C] text-[13px] lg:text-[16px]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}