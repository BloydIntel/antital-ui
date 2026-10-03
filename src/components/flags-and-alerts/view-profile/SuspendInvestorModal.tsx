"use client";

import { useState, FormEvent } from "react";
import { X, ChevronDown, AlertTriangle, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

export interface SuspendInvestorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (data: {
        reason: string;
        details: string;
        notifyUser: boolean;
        requirePasswordReset: boolean;
        escalateToCompliance?: boolean;
    }) => void;
    user: {
        id: string;
        name: string;
        initials?: string;
        status?: string;
        tierLevel?: string;
        activePositionsCount?: number;
        investorCategory?: string
    };
    isInvestorManagement?: boolean; // Optional override prop
}

const SUSPENSION_REASONS = [
    "AML / Suspicious Activity",
    "Pending KYC Verification",
    "Compliance Review Required",
    "Administrative Hold",
];

export function SuspendInvestorModal(props: SuspendInvestorModalProps) {
    const searchParams = useSearchParams();

    // Auto-detect navigation source if prop isn't passed explicitly
    const isInvestorManagement =
        props.isInvestorManagement ??
        searchParams.get("from") === "investor-management";

    if (!props.isOpen) return null;

    // Render Modal based on source
    if (isInvestorManagement) {
        return <InvestorManagementSuspendModal {...props} />;
    }

    return <DefaultSuspendModal {...props} />;
}

/* ============================================================================
   1. INVESTOR MANAGEMENT MODAL DESIGN (560px Width)
   ============================================================================ */
function InvestorManagementSuspendModal({
    onClose,
    onSubmit,
    user,
}: SuspendInvestorModalProps) {
    const [reason, setReason] = useState(SUSPENSION_REASONS[0]);
    const [details, setDetails] = useState("");
    const [notifyUser, setNotifyUser] = useState(true);
    const [requirePasswordReset, setRequirePasswordReset] = useState(true);
    const [escalateToCompliance, setEscalateToCompliance] = useState(true);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit?.({
            reason,
            details,
            notifyUser,
            requirePasswordReset,
            escalateToCompliance,
        });
        onClose();
    };

    const userInitials =
        user.initials ??
        user.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

    const firstName = user.name.split(" ")[0];

    const categoryAndTier = [user.tierLevel, user.investorCategory]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 lg:p-4">
            <div className="w-full max-w-[520px] lg:max-h-[700px] rounded-2xl bg-white overflow-auto scrollbar-hide">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#EAEAEA] px-3 lg:px-6 py-4">
                    <h2 className="text-[18px] font-semibold text-[#D4001A]">
                        Suspend Investor Account
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-[#858585] hover:bg-[#F8F9FA] hover:text-[#11110F] transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-3 lg:p-6 space-y-5">
                    {/* User Profile Summary Box */}
                    <div className="border border-[#EAEAEA] rounded-xl p-4 flex items-center gap-4 bg-[#FFFFFF]">
                        <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[16px] font-semibold text-[#11110F] shrink-0">
                            {userInitials}
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[16px] font-semibold text-[#11110F]">
                                    {user.name}
                                </span>
                                {user.status && (
                                    <span className="px-2 py-0.5 text-[12px] font-medium text-[#45B424] bg-[#FCFCFC] rounded-md border border-[#EAEAEA]">
                                        {user.status}
                                    </span>
                                )}
                            </div>
                            <p className="text-[13px] text-[#707070]">
                                {user.id} {categoryAndTier ? `• ${categoryAndTier}` : ""}
                            </p>
                        </div>
                    </div>

                    {/* Warning Description */}
                    <p className="text-[14px] text-[#505050]">
                        Suspending this account will immediately prevent {firstName} from making new investments, trading on the secondary market, and withdrawing funds. Her {user.activePositionsCount ?? 12} active portfolio positions will remain intact but frozen.
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
                                className="w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-[14px] text-[#11110F] focus:border-[#11110F] focus:outline-none cursor-pointer"
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
                            Suspension Details<span className="text-[#D4001A]">*</span>
                        </label>
                        <textarea
                            rows={3}
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Describe the basis for suspension — include case reference numbers, flagged transactions, or regulatory instructions..."
                            className="w-full resize-none rounded-lg border border-[#E2E8F0] p-3 text-[14px] text-[#11110F] placeholder-[#909090] focus:border-[#11110F] focus:outline-none"
                            required
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-2.5 pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#333333]">
                            <input
                                type="checkbox"
                                checked={notifyUser}
                                onChange={(e) => setNotifyUser(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#11110F] accent-[#11110F]"
                            />
                            Notify investor via email immediately
                        </label>

                        <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#333333]">
                            <input
                                type="checkbox"
                                checked={requirePasswordReset}
                                onChange={(e) => setRequirePasswordReset(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#11110F] accent-[#11110F]"
                            />
                            Require password reset on next login
                        </label>

                        <label className="flex items-center gap-2.5 cursor-pointer text-[14px] text-[#333333]">
                            <input
                                type="checkbox"
                                checked={escalateToCompliance}
                                onChange={(e) => setEscalateToCompliance(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#11110F] accent-[#11110F]"
                            />
                            Escalate automatically to compliance officer
                        </label>
                    </div>

                    {/* Audit Notice Box */}
                    <div className="p-3.5 bg-[#FEF8EC] border border-[#FCE9C4] rounded-xl text-[16px] text-[#B78B32] flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-[#B78B32] shrink-0 mt-0.5" />
                        <span>
                            This action is logged in the immutable audit trail and will be visible to regulators. Ensure you have valid grounds before proceeding.
                        </span>
                    </div>

                    {/* Footer Actions */}
                    <div className="grid grid-cols-2 gap-2 lg:gap-3 pt-2 border-t border-[#EAEAEA]">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0 col-span-1"
                        />
                        <OnboardingButton
                            type="submit"
                            label={
                                <span className="relative inline-flex items-center justify-center">

                                    <span className="absolute left-0 -translate-x-full opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-[20px] flex items-center justify-center">
                                        <LockKeyhole className="w-4 h-4 text-white" />
                                    </span>

                                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-2.5">
                                        Confirm Suspension
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

/* ============================================================================
   2. DEFAULT / EXISTING SUSPEND MODAL DESIGN (520px Width)
   ============================================================================ */
function DefaultSuspendModal({
    onClose,
    onSubmit,
    user,
}: SuspendInvestorModalProps) {
    const [reason, setReason] = useState(SUSPENSION_REASONS[0]);
    const [details, setDetails] = useState("");
    const [notifyUser, setNotifyUser] = useState(true);
    const [requirePasswordReset, setRequirePasswordReset] = useState(true);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit?.({
            reason,
            details,
            notifyUser,
            requirePasswordReset,
        });
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
                    {/* Warning Banner */}
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
