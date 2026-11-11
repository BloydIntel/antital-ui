"use client";

import { useState } from "react";
import { X, AlertCircle, XCircle } from "lucide-react";
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
import { FileText, Images, Camera, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";


interface EscalateStrModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        investorId: string;
        suspendedDate: string;
        email: string;
    };
}

const CASE_REFERENCE_OPTIONS = [
    { value: "CASE-2024-863892", label: "CASE-2024-863892" },
    { value: "CASE-2024-863893", label: "CASE-2024-863893" },
];

const MESSAGE_TEMPLATE_OPTIONS = [
    { value: "Identity document forgery / fabricated KYC", label: "Identity document forgery / fabricated KYC" },
    { value: "Suspicious transaction pattern / structuring", label: "Suspicious transaction pattern / structuring" },
    { value: "Sanctions watchlist match confirmation", label: "Sanctions watchlist match confirmation" },
];

const SYSTEM_EVIDENCE_ITEMS = [
    {
        title: "MRZ Checksum Mismatch",
        description: "Docment number checksum failed ICAO 73684 validation",
    },
    {
        title: "Photo Edge Manipulation (94% confidence)",
        description: "Smile Identity forgery API Jan 15, 2024 09:12",
    },
    {
        title: "Font anomaly on date of birth field",
        description: "Manual review note by Sarah Mitchell • Compliance",
    },
];

export function EscalateStrModal({ isOpen, onClose, user }: EscalateStrModalProps) {
    const [caseReference, setCaseReference] = useState("CASE-2024-863892");
    const [suspensionDate, setSuspensionDate] = useState("Jan 15, 2024");
    const [messageTemplate, setMessageTemplate] = useState("Identity document forgery / fabricated KYC");
    const [detailedNarrative, setDetailedNarrative] = useState(
        `Account ${user.investorId} was automatically suspended on ${user.suspendedDate} AFTER Smile Identity returned a 94% forgery confidence score on the submitted international passport. Manual confidence review confirmed MRZ checksum mismatch and font anomalies on the date-of-birth field inconsistent with standard Nigerian Immigration Service Issuer specifications. Account was registered on Jan 12, 2024 AND HAD 50,200 deposited before the flag was triggered. No Investment were made`
    );
    const [attachments, setAttachments] = useState({
        systemTriggerLog: true,
        submittedPassport: true,
        selfieLiveness: true,
        kycProfile: true,
    });
    const [keepFrozen, setKeepFrozen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div
                role="dialog"
                aria-modal="true"
                className="max-h-[90vh] w-full max-w-[718px] overflow-y-auto rounded-xl bg-white scrollbar-hide"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#EAEAEA] p-6">
                    <h2 className="text-[18px] text-[#11110F]"
                        style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}
                    >
                        Escalate to Suspicious Transaction Report
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close STR modal"
                        className="text-[#858585] hover:text-[#11110F] transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    {/* Warning Banner */}
                    <div className="flex items-start gap-3 rounded-lg border border-[#FF7082] bg-[#FFEBED] p-4 text-[14px] text-[#D4001A]">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>
                            Submitting this STR will generate an NFIU-formatted report and add it to the regulatory dispatch queue.
                            <span className="font-medium"> This action is irreversible and will be logged against this case.</span>
                        </span>
                    </div>

                    {/* User Summary Card */}
                    <div className="flex items-center justify-between rounded-lg border border-[#EAEAEA] px-4 py-5">
                        <div className="flex items-center gap-3">
                            <UserAvatar name={user.name} size={55} />
                            <div>
                                <p className="font-medium text-[18px] text-[#11110F]">{user.name}</p>
                                <p className="text-[14px] text-[#858585]">
                                    {user.investorId} • Suspended {user.suspendedDate} • {user.email}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-md border bg-[#FCFCFC] border-[#EAEAEA] text-[#D4001A]">
                            Forgery Suspected
                        </span>
                    </div>

                    {/* Form Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Case Reference using your components/ui Select */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-medium text-[#1B1B1B]">
                                Case Reference
                            </label>
                            <Select value={caseReference} onValueChange={setCaseReference}>
                                <SelectTrigger className="w-full h-[48px] px-4 rounded-lg border border-[#EAEAEA] bg-white text-[14px] font-normal text-[#1A1A1A] focus:ring-1 focus:ring-[#0F3D2E] focus:outline-none cursor-pointer shadow-none">
                                    <SelectValue placeholder="Select case reference" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-[#EAEAEA] rounded-lg shadow-lg z-50">
                                    {CASE_REFERENCE_OPTIONS.map((option) => (
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

                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-medium text-[#1B1B1B]">
                                Suspension Date
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={suspensionDate}
                                    onChange={(e) => setSuspensionDate(e.target.value)}
                                    className="w-full h-[38px] px-4 rounded-lg border border-[#EAEAEA] bg-white text-sm text-[#11110F] focus:outline-none focus:border-[#11110F] cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">
                            Message Template
                        </label>
                        <Select value={messageTemplate} onValueChange={setMessageTemplate}>
                            <SelectTrigger className="w-full h-[48px] px-4 rounded-lg border border-[#EAEAEA] bg-white text-sm text-[#11110F] focus:ring-1 focus:ring-[#11110F] focus:outline-none">
                                <SelectValue placeholder="Select message template" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-lg shadow-lg z-50">
                                {MESSAGE_TEMPLATE_OPTIONS.map((option) => (
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

                    {/* System-Detected Evidence */}
                    <div className="space-y-2">
                        <p className="text-[14px] font-medium text-[#1B1B1B]">
                            System-Detected Evidence (Auto-populated)
                        </p>

                        <div className="space-y-4">
                            {SYSTEM_EVIDENCE_ITEMS.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2.5 px-4 py-2.5 rounded-md border border-[#F6ACB5] bg-white text-[14px]"
                                >
                                    <XCircle className="w-4 h-4 text-[#D4001A] shrink-0" />
                                    <div>
                                        <p className="font-medium text-[#2C2C2C]">{item.title}</p>
                                        <p className="text-[#858585]">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Detailed Narrative */}
                    <label className="block text-[14px] font-medium text-[#1B1B1B]">
                        Detailed Narrative (For NFIU Regulator)
                        <textarea
                            rows={5}
                            value={detailedNarrative}
                            onChange={(e) => setDetailedNarrative(e.target.value)}
                            className="mt-1.5 w-full rounded-md text-[#858585] border border-[#EAEAEA] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#11110F] scrollbar-hide"
                        />
                    </label>

                    {/* Attachments */}
                    <div className="space-y-2">
                        <p className="text-[14px] font-medium text-[#505050]">Attach to Report</p>
                        <div className="space-y-2">
                            {[
                                { key: "systemTriggerLog", label: "System Trigger Log.pdf", icon: FileText },
                                { key: "submittedPassport", label: "Submitted Passport Scan.jpg", icon: Images },
                                { key: "selfieLiveness", label: "Selfie Liveness Photo.jpg", icon: Camera },
                                { key: "kycProfile", label: "KYC Profile & Registration History.pdf", icon: User },
                            ].map((item) => {
                                const IconComponent = item.icon;
                                const isChecked = attachments[item.key as keyof typeof attachments];

                                return (
                                    <label
                                        key={item.key}
                                        className="flex items-center justify-between px-4 py-2.5 rounded-md border border-[#EAEAEA] text-[14px] cursor-pointer hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <IconComponent className="w-4 h-4 text-[#365852]" />
                                            <span className="text-[#2C2C2C]">{item.label}</span>
                                        </div>
                                        <Checkbox
                                            checked={isChecked}
                                            onCheckedChange={(checked) =>
                                                setAttachments((prev) => ({
                                                    ...prev,
                                                    [item.key]: Boolean(checked),
                                                }))
                                            }
                                            className="data-[state=checked]:bg-[#30534C] data-[state=checked]:border-[#30534C]"
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Keep account frozen checkbox */}
                    <label className="flex items-center gap-2.5 text-xs font-medium text-[#11110F] cursor-pointer pt-1">
                        <Checkbox
                            checked={keepFrozen}
                            onCheckedChange={(checked) => setKeepFrozen(Boolean(checked))}
                            className="data-[state=checked]:bg-[#30534C] data-[state=checked]:border-[#30534C]"
                        />
                        <span>Keep account frozen pending regulatory response</span>
                    </label>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-3 p-6 border-t border-[#EAEAEA] ">
                    <OnboardingButton
                        variant="plain"
                        label="Cancel"
                        onClick={onClose}
                        className="my-0 border-[#EAEAEA]"
                    />
                    <OnboardingButton
                        label="Submit STR to NFIU"
                        onClick={() => {
                            console.log("Submitting STR...");
                            onClose();
                        }}
                        className="my-0 bg-[#365852]"
                    />
                </div>
            </div>
        </div>
    );
}