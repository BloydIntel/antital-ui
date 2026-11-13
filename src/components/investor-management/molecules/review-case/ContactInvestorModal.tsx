"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
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

type NotificationChannel = "email" | "in-app" | "sms";

interface ContactInvestorModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        investorId: string;
        email: string;
        phone?: string;
    };
}

const TEMPLATE_OPTIONS = [
    { value: "Suspension Notice - ID Verification Required", label: "Suspension Notice - ID Verification Required" },
    { value: "Account Reinstatement Notice", label: "Account Reinstatement Notice" },
    { value: "Request for Additional Documentation", label: "Request for Additional Documentation" },
];

const CHANNEL_OPTIONS: { id: NotificationChannel; label: string }[] = [
    { id: "email", label: "Email" },
    { id: "in-app", label: "In App" },
    { id: "sms", label: "SMS" },
];

export function ContactInvestorModal({ isOpen, onClose, user }: ContactInvestorModalProps) {
    const [sendVia, setSendVia] = useState<NotificationChannel[]>(["email", "in-app"]);
    const [messageTemplate, setMessageTemplate] = useState(TEMPLATE_OPTIONS[0].value);
    const [subject, setSubject] = useState("Important: Your account has been temporarily suspended - action required");
    const [messageBody, setMessageBody] = useState(
        `Dear Aisha, your account (INV-3457) has been temporarily suspended following a routine identity verification review. Our system flagged an issue with the submitted ID document. To restore full access, please re-submit a clear, unobstructed scan of a valid government-issued ID via your profile settings. If you believe this is an error or need assistance, please reply to this email or contact our support team at support@platform.ng. We aim to resolve verified cases within 2 business days.`
    );
    const [isEditingMessage, setIsEditingMessage] = useState(false);
    const [ccEmail,] = useState("Compliance@platform.ng");
    const [optionsState, setOptionsState] = useState({
        logToNotes: true,
        sendCopyToOfficer: true,
        readReceipt: true,
    });
    const handleToggleChannel = (channelId: NotificationChannel, checked: boolean) => {
        setSendVia((prev) =>
            checked
                ? [...prev, channelId]
                : prev.filter((id) => id !== channelId)
        );
    };

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
                        Contact Investor
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close contact investor modal"
                        className="text-[#858585] hover:text-[#11110F] transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-3 lg:p-6 space-y-4">
                    {/* User Summary Card */}
                    <div className="flex items-center justify-between rounded-lg border border-[#EAEAEA] px-2 lg:px-4 py-2.5 lg:py-5">
                        <div className="flex items-center gap-3">
                            <UserAvatar name={user.name} size={55} />
                            <div>
                                <p className="font-medium text-[18px] text-[#11110F]">{user.name}</p>
                                <p className="text-[14px] text-[#858585]">
                                    {user.email} {user.phone ? `• ${user.phone}` : ""}
                                </p>
                            </div>
                        </div>
                        <span className="text-xs px-2.5 py-1 rounded-md border bg-[#FCFCFC] border-[#EAEAEA] text-[#D4001A]">
                            Suspended
                        </span>
                    </div>


                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">Send Via</label>
                        <div className="grid grid-cols-3 gap-3">
                            {CHANNEL_OPTIONS.map((channel) => {
                                const isSelected = sendVia.includes(channel.id);
                                return (
                                    <label
                                        key={channel.id}
                                        className={`flex items-center gap-2.5 px-4 h-[48px] rounded-lg border text-sm font-normal transition-colors cursor-pointer ${isSelected
                                            ? "border-[#365852] bg-[#F4F6F5] text-[#2C2C2C]"
                                            : "border-[#EAEAEA] bg-white text-[#858585] hover:border-[#CCCCCC]"
                                            }`}
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked) =>
                                                handleToggleChannel(channel.id, Boolean(checked))
                                            }
                                            className="data-[state=checked]:bg-[#30534C] data-[state=checked]:border-[#30534C]"
                                        />
                                        <span className="text-[#11110F]">{channel.label}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Message Template Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">Message Template</label>
                        <Select value={messageTemplate} onValueChange={setMessageTemplate}>
                            <SelectTrigger className="w-full h-[48px] px-4 rounded-lg border border-[#EAEAEA] bg-white text-[14px] font-normal text-[#1A1A1A] focus:ring-1 focus:ring-[#0F3D2E] focus:outline-none cursor-pointer shadow-none">
                                <SelectValue placeholder="Select message template" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-[#EAEAEA] rounded-lg shadow-lg z-50">
                                {TEMPLATE_OPTIONS.map((option) => (
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

                    {/* Subject Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">Subject</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full h-[48px] px-4 rounded-lg border border-[#EAEAEA] bg-white text-sm text-[#11110F] focus:outline-none focus:border-[#11110F]"
                        />
                    </div>

                    {/* Message Body */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">Message Body</label>
                        <textarea
                            rows={6}
                            disabled={!isEditingMessage}
                            value={messageBody}
                            onChange={(e) => setMessageBody(e.target.value)}
                            className={`w-full rounded-lg border px-4 py-3 text-[14px] text-[#2C2C2C] focus:outline-none focus:border-[#11110F] scrollbar-hide transition-colors ${isEditingMessage ? "bg-white border-[#11110F]" : "bg-[#F8F9FA] border-[#EAEAEA] cursor-not-allowed"
                                }`}
                        />
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsEditingMessage(!isEditingMessage)}
                                className="text-xs text-[#30534C] hover:underline font-medium cursor-pointer"
                            >
                                {isEditingMessage ? "Save" : "Edit message"}
                            </button>
                        </div>
                    </div>

                    {/* CC Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-medium text-[#1B1B1B]">CC</label>
                        <div className="flex items-center gap-2 w-full h-[48px] px-4 rounded-lg border border-[#EAEAEA] bg-white">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F4F5F7] text-xs font-medium text-[#2C2C2C]">
                                {ccEmail}
                            </span>
                            <button type="button" className="text-[#858585] hover:text-[#11110F]">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Checkbox Options List */}
                    <div className="space-y-2 pt-1">
                        {[
                            { key: "logToNotes", label: "Log this message in the case investigation notes" },
                            { key: "sendCopyToOfficer", label: "Send copy to assigned compliance officer (Sarah Mitchell)" },
                            { key: "readReceipt", label: "Request read receipt" },
                        ].map((item) => {
                            const isChecked = optionsState[item.key as keyof typeof optionsState];
                            return (
                                <label
                                    key={item.key}
                                    className="flex items-center gap-2.5 text-xs font-medium text-[#11110F] cursor-pointer"
                                >
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) =>
                                            setOptionsState((prev) => ({
                                                ...prev,
                                                [item.key]: Boolean(checked),
                                            }))
                                        }
                                        className="data-[state=checked]:bg-[#30534C] data-[state=checked]:border-[#30534C]"
                                    />
                                    <span>{item.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-3 p-3 lg:p-6 border-t border-[#EAEAEA]">
                    <button
                        type="button"
                        onClick={() => console.log("Request previous messages...")}
                        className="text-xs font-medium text-[#505050] hover:text-[#11110F] transition-colors underline"
                    >
                        Request previous messages (2)
                    </button>
                    <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
                        <OnboardingButton
                            variant="plain"
                            label="Cancel"
                            onClick={onClose}
                            className="my-0 border-[#EAEAEA]"
                        />
                        <OnboardingButton
                            label="Submit listings"
                            onClick={() => {
                                console.log("Submitting message...");
                                onClose();
                            }}
                            className="my-0 bg-[#365852]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}