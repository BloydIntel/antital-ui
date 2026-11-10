"use client";

import { useState } from "react";
import { X, AlertCircle, AlertTriangle } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import { TYPOGRAPHY } from "@/constants/styles";

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
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white scrollbar-hide"
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
                    <div className="flex items-center justify-between rounded-lg border border-[#EAEAEA] p-3.5 bg-[#FAFAFA]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#30534C] text-white flex items-center justify-center font-bold text-sm">
                                {user.name[0]}
                            </div>
                            <div>
                                <p className="font-bold text-[14px] text-[#11110F]">{user.name}</p>
                                <p className="text-xs text-[#858585]">
                                    {user.investorId} • Suspended {user.suspendedDate} • {user.email}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-[#FFF5F5] border border-[#FED7D7] text-[#D4001A] font-medium">
                            Forgery Suspected
                        </span>
                    </div>

                    {/* Form Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="block text-xs font-semibold text-[#505050]">
                            Case Reference
                            <select
                                value={caseReference}
                                onChange={(e) => setCaseReference(e.target.value)}
                                className="mt-1.5 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm bg-white focus:outline-none focus:border-[#11110F]"
                            >
                                <option value="CASE-2024-863892">CASE-2024-863892</option>
                            </select>
                        </label>

                        <label className="block text-xs font-semibold text-[#505050]">
                            Suspension Date
                            <input
                                type="text"
                                value={suspensionDate}
                                onChange={(e) => setSuspensionDate(e.target.value)}
                                className="mt-1.5 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm bg-white focus:outline-none focus:border-[#11110F]"
                            />
                        </label>
                    </div>

                    <label className="block text-xs font-semibold text-[#505050]">
                        Message Template
                        <select
                            value={messageTemplate}
                            onChange={(e) => setMessageTemplate(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm bg-white focus:outline-none focus:border-[#11110F]"
                        >
                            <option value="Identity document forgery / fabricated KYC">
                                Identity document forgery / fabricated KYC
                            </option>
                        </select>
                    </label>

                    {/* System-Detected Evidence */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-[#505050] uppercase tracking-wider">
                            System-Detected Evidence (Auto-populated)
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-[#FED7D7] bg-[#FFF5F5] text-xs text-[#D4001A]">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <div>
                                    <p className="font-semibold">MRZ Checksum Mismatch</p>
                                    <p className="text-[11px] text-[#858585]">Docment number checksum failed ICAO 73684 validation</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-[#FED7D7] bg-[#FFF5F5] text-xs text-[#D4001A]">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <div>
                                    <p className="font-semibold">Photo Edge Manipulation (94% confidence)</p>
                                    <p className="text-[11px] text-[#858585]">Smile Identity forgery API Jan 15, 2024 09:12</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-[#FED7D7] bg-[#FFF5F5] text-xs text-[#D4001A]">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <div>
                                    <p className="font-semibold">Font anomaly on date of birth field</p>
                                    <p className="text-[11px] text-[#858585]">Manual review note by Sarah Mitchell • Compliance</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Narrative */}
                    <label className="block text-xs font-semibold text-[#505050]">
                        Detailed Narrative (For NFIU Regulator)
                        <textarea
                            rows={4}
                            value={detailedNarrative}
                            onChange={(e) => setDetailedNarrative(e.target.value)}
                            className="mt-1.5 w-full rounded-lg border border-[#EAEAEA] p-3 text-xs leading-relaxed focus:outline-none focus:border-[#11110F]"
                        />
                    </label>

                    {/* Attachments */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-[#505050]">Attach to Report</p>
                        <div className="space-y-2">
                            {[
                                { key: "systemTriggerLog", label: "System Trigger Log.pdf" },
                                { key: "submittedPassport", label: "Submitted Passport Scan.jpg" },
                                { key: "selfieLiveness", label: "Selfie Liveness Photo.jpg" },
                                { key: "kycProfile", label: "KYC Profile & Registration History.pdf" },
                            ].map((item) => (
                                <label
                                    key={item.key}
                                    className="flex items-center justify-between p-2.5 rounded-lg border border-[#EAEAEA] text-xs font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-[#11110F]">{item.label}</span>
                                    <input
                                        type="checkbox"
                                        checked={attachments[item.key as keyof typeof attachments]}
                                        onChange={(e) =>
                                            setAttachments((prev) => ({
                                                ...prev,
                                                [item.key]: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-[#30534C] accent-[#30534C]"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Keep account frozen checkbox */}
                    <label className="flex items-center gap-2.5 text-xs font-medium text-[#11110F] cursor-pointer pt-1">
                        <input
                            type="checkbox"
                            checked={keepFrozen}
                            onChange={(e) => setKeepFrozen(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-[#30534C] accent-[#30534C]"
                        />
                        Keep account frozen pending regulatory response
                    </label>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAEAEA]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-[#EAEAEA] px-5 py-2.5 text-sm font-medium text-[#2C2C2C] hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <OnboardingButton
                            label="Submit STR to NFIU"
                            onClick={() => {
                                console.log("Submitting STR...");
                                onClose();
                            }}
                            className="my-0 bg-[#365852] text-white hover:bg-[#25423C] px-5 py-2.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}