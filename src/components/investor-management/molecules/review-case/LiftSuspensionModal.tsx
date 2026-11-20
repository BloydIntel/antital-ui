"use client";

import { useState } from "react";
import { X, AlertTriangle, Info, LockKeyhole } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";
import { UserAvatar } from "@/components/investor-management/organisms/UserAvatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface LiftSuspensionModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        investorId: string;
        suspendedDate: string;
        email: string;
        phone?: string;
    };
}

const REASON_OPTIONS = [
    { value: "Document re-submitted and verified as authentic", label: "Document re-submitted and verified as authentic" },
    { value: "False positive on biometric matching", label: "False positive on biometric matching" },
    { value: "Cleared via manual compliance interview", label: "Cleared via manual compliance interview" },
];

export function LiftSuspensionModal({ isOpen, onClose, user }: LiftSuspensionModalProps) {
    const [liftReason, setLiftReason] = useState(REASON_OPTIONS[0].value);
    const [resolutionNote, setResolutionNote] = useState(
        `Investor re-submitted a clearer scan of the same international passport. Re-ran through Smile Identity - forgery score dropped to 3%. MRZ checksum now validates correctly. Confirmed authentic. Lifting suspension and restoring full account access`
    );
    const [preLiftChecklist, setPreLiftChecklist] = useState({
        originalFlagResolved: true,
        documentsVerified: true,
        noActiveStr: false,
        investorNotified: false,
    });
    const [postLiftActions, setPostLiftActions] = useState({
        sendEmail: true,
        releaseWithdrawal: true,
        rerunKyc: false,
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 lg:p-4">
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-[90vh] w-full max-w-[718px] overflow-y-auto rounded-xl bg-white scrollbar-hide"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#EAEAEA] p-3 lg:p-6">
                    <h2
                        className="text-[16px] lg:text-[18px] text-[#11110F]"
                        style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}
                    >
                        Lift Account Suspension
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close lift suspension modal"
                        className="text-[#858585] hover:text-[#11110F] transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-3 lg:p-6 space-y-4">
                    {/* User Summary Card */}
                    <div className="flex items-center rounded-lg border border-[#EAEAEA] px-2 lg:px-4 py-2.5 lg:py-5 gap-3">

                        <UserAvatar name={user.name} size={55} />
                        <div className="w-full space-y-2">
                            <div className="flex justify-between">
                                <p className="font-medium text-[18px] text-[#11110F]">{user.name}</p>
                                <span className="text-xs px-2.5 py-1 rounded-md border bg-[#FCFCFC] border-[#EAEAEA] text-[#D4001A]">
                                    Suspended
                                </span>
                            </div>
                            <p className="text-[14px] text-[#858585]">
                                {user.investorId} • {user.email} {user.phone ? `• ${user.phone}` : ""} • Suspended {user.suspendedDate}
                            </p>
                        </div>

                    </div>

                    {/* Warning/Context Banner */}
                    <div className="flex items-start gap-3 rounded-lg border border-[#FBE3B3] bg-[#FEF8EC] p-2 lg:p-4 text-[16px] text-[#B78B32]">
                        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-[#B78B32]" />
                        <span>
                            <span className="font-medium">This account was suspended for: Failed ID Verification (Forgery Suspected). </span>
                            <span className="text-[#858585] block">MRZ checksum mismatch and 94% forgery confidence from Smile Identity. Ensure the original concern has been satisfactorily resolved before lifting.</span>
                        </span>
                    </div>

                    {/* Reason for Lifting Suspension */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">
                            Reason for Lifting Suspension
                        </label>
                        <Select value={liftReason} onValueChange={setLiftReason}>
                            <SelectTrigger className="w-full h-[48px] px-4 rounded-lg border border-[#EAEAEA] bg-white text-[14px] font-normal text-[#1A1A1A] focus:ring-1 focus:ring-[#0F3D2E] focus:outline-none cursor-pointer shadow-none">
                                <SelectValue placeholder="Select reason for lifting" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-lg shadow-lg z-50">
                                {REASON_OPTIONS.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className="text-sm cursor-pointer py-2.5"
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Pre-Lift Resolution Checklist */}
                    <div className="space-y-2">
                        <p className="text-[14px] font-medium text-[#505050]">Pre-Lift Resolution Checklist</p>
                        <div className="space-y-2">
                            {[
                                { key: "originalFlagResolved", label: "Original flag has been reviewed and resolved" },
                                { key: "documentsVerified", label: "Re-submitted documents verified by compliance officer" },
                                { key: "noActiveStr", label: "No active STR or regulatory hold on this account" },
                                { key: "investorNotified", label: "Investor notified of the reason for the original suspension" },
                            ].map((item) => {
                                const isChecked = preLiftChecklist[item.key as keyof typeof preLiftChecklist];
                                return (
                                    <label
                                        key={item.key}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#EAEAEA] text-[14px] cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={(checked) =>
                                                setPreLiftChecklist((prev) => ({
                                                    ...prev,
                                                    [item.key]: Boolean(checked),
                                                }))
                                            }
                                            className="data-[state=checked]:bg-[#30534C] data-[state=checked]:border-[#30534C]"
                                        />
                                        <span className="text-[#2C2C2C]">{item.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Internal Resolution Note */}
                    <label className="block text-[14px] font-medium text-[#1B1B1B]">
                        Internal Resolution Note
                        <textarea
                            rows={4}
                            value={resolutionNote}
                            onChange={(e) => setResolutionNote(e.target.value)}
                            className="mt-1.5 w-full rounded-md text-[#858585] font-normal border border-[#EAEAEA] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#11110F] scrollbar-hide"
                        />
                    </label>

                    {/* Post-Lift Actions */}
                    <div className="space-y-2">
                        <p className="text-[14px] font-medium text-[#505050]">Post-Lift Actions</p>
                        <div className="space-y-2">
                            {[
                                { key: "sendEmail", label: "Send account reinstatement email to investor" },
                                { key: "releaseWithdrawal", label: "Release blocked withdrawal (₦185,000)" },
                                { key: "rerunKyc", label: "Re-run full KYC check after reinstatement" },
                            ].map((item) => {
                                const isChecked = postLiftActions[item.key as keyof typeof postLiftActions];
                                return (
                                    <label
                                        key={item.key}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-md border border-[#EAEAEA] text-[14px] cursor-pointer hover:bg-gray-50 transition-colors"
                                    >

                                        <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={(checked) =>
                                                setPostLiftActions((prev) => ({
                                                    ...prev,
                                                    [item.key]: Boolean(checked),
                                                }))
                                            }
                                            className="data-[state=checked]:bg-[#30534C] data-[state=checked]:border-[#30534C]"
                                        />
                                        <span className="text-[#2C2C2C]">{item.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Info Notice Box */}
                    <div className="flex items-start gap-2.5 p-4 rounded-lg bg-[#FCFCFC] border border-[#A8A8A8] text-[14px] font-medium text-[#858585]">
                        <Info className="w-5 h-5 shrink-0 mt-0.5 text-[#858585]" />
                        <span>
                            Lifting the suspension will immediately restore full access including login, investments, and wallet transactions. This action will be logged with your credentials and timestamp.
                        </span>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-3 lg:p-6 border-t border-[#EAEAEA]">
                    <OnboardingButton
                        variant="plain"
                        label="Cancel"
                        onClick={onClose}
                        className="my-0 border-[#EAEAEA]"
                    />

                    <OnboardingButton
                        label={
                            <span className="relative inline-flex items-center justify-center">

                                <span className="absolute left-0 -translate-x-full opacity-0 scale-75 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-x-[20px] flex items-center justify-center">
                                    <LockKeyhole className="w-4 h-4 text-white" />
                                </span>

                                <span className="transition-transform duration-300 ease-out group-hover:translate-x-2.5">
                                    Confirm and lift suspension
                                </span>
                            </span>
                        }
                        className="group my-0 bg-[#365852]"
                        onClick={() => {
                            onClose();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}