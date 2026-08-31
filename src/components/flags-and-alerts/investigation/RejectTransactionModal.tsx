"use client";

import { useState, type FormEvent } from "react";
import { X, ChevronDown } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface RejectTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        reason: string;
        narrative: string;
        sendNotification: boolean;
    }) => void;
    transactionId?: string;
    amount?: string;
    entityName?: string;
    entityId?: string;
    destination?: string;
    defaultReason?: string;
    defaultNarrative?: string;
}

const REJECTION_REASONS = [
    "Compliance Violation - High Risk Source",
    "AML Proxy Match",
    "Unverified Identity / KYC Failure",
    "Suspicious Activity Detected",
];


export function RejectTransactionModal({
    isOpen,
    onClose,
    onConfirm,
    transactionId = "TXN-928583",
    amount = "NGN2,500,000",
    entityName = "John Doe",
    entityId = "INV-89344",
    destination = "GTBank *3747",
    defaultReason = "Complaince Violation - High Risk Source",
    defaultNarrative = "Transactin rejected due to OFAC sanctions proxy match. Funds are beng returned to the original source account pending further investigation",
}: RejectTransactionModalProps) {
    const [reason, setReason] = useState<string>(defaultReason);
    const [narrative, setNarrative] = useState<string>(defaultNarrative);
    const [sendNotification, setSendNotification] = useState<boolean>(true);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onConfirm({ reason, narrative, sendNotification });
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
                        Reject Transaction & Refund
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
                    <p className="text-[14px] leading-relaxed text-[#64748B]">
                        You are about to reject transaction{" "}
                        <strong className="font-semibold text-[#11110F]">
                            {transactionId}
                        </strong>{" "}
                        and initiate a refund of{" "}
                        <strong className="font-semibold text-[#11110F]">
                            {amount}
                        </strong>{" "}
                        back to the original funding source
                    </p>

                    {/* Entity & Destination Detail Box */}
                    <div className="rounded-xl border border-[#EAEAEA] bg-[#FCFCFC] p-4 grid grid-cols-2 gap-2">
                        <div>
                            <span className="block text-[14px] text-[#858585] mb-1">
                                Entity
                            </span>
                            <span className="block text-[16px] text-[#11110F]">
                                {entityName} ({entityId})
                            </span>
                        </div>
                        <div>
                            <span className="block text-[14px] text-[#858585] mb-1">
                                Destination
                            </span>
                            <span className="block text-[16px] text-[#11110F]">
                                {destination}
                            </span>
                        </div>
                    </div>

                    {/* Rejection Reason Dropdown */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] font-medium text-[#11110F]">
                            Rejection Reason
                        </label>
                        <div className="relative">
                            <select
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-[14px] text-[#11110F] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] cursor-pointer pr-10"
                            >
                                {REJECTION_REASONS.map((res) => (
                                    <option key={res} value={res}>
                                        {res}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
                        </div>
                    </div>

                    {/* Detail Narrative */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] font-medium text-[#11110F]">
                            Detail Narrative (For Regular)
                        </label>
                        <textarea
                            rows={4}
                            value={narrative}
                            onChange={(e) => setNarrative(e.target.value)}
                            placeholder="Enter detail narrative..."
                            className="w-full rounded-lg border border-[#E2E8F0] bg-white p-3 text-[14px] leading-relaxed text-[#11110F] placeholder-[#858585] outline-none focus:border-[#042E27] focus:ring-1 focus:ring-[#042E27] transition-all resize-none"
                        />
                    </div>

                    {/* Checkbox */}
                    <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            checked={sendNotification}
                            onChange={(e) => setSendNotification(e.target.checked)}
                            className="w-4 h-4 rounded border-[#E2E8F0] text-[#042E27] focus:ring-[#042E27] cursor-pointer accent-[#042E27]"
                        />
                        <span className="text-[14px] text-[#11110F]">
                            Send automated notification to user
                        </span>
                    </label>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0 "
                        />

                        <OnboardingButton
                            type="submit"
                            label="Proceed"
                            className=" my-0 border-[#858585]"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}