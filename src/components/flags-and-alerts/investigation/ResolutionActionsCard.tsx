import { useState } from "react";
import { Check, FileText, X } from "lucide-react";
import { TYPOGRAPHY } from "@/constants/styles";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";

interface ResolutionActionsCardProps {
    onAction: (action: "clear" | "str" | "reject", notes: string) => void;
}

export function ResolutionActionsCard({ onAction }: ResolutionActionsCardProps) {
    const [notes, setNotes] = useState("");

    return (
        <div className="bg-white rounded-xl border border-[#E2E8F0] py-6 px-4">
            <h2 className="text-[18px] text-[#0F172A] mb-4" style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}>
                Resolution actions
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-[14px] text-[#2C2C2C] mb-2">
                        Investigation Notes
                    </label>
                    <textarea
                        rows={4}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter findings or justification here..."
                        className="w-full rounded-lg border border-[#E2E8F0] p-3 text-[14px] text-[#11110F] placeholder-[#858585] outline-none focus:border-[#A8BD27] focus:ring-2 focus:ring-[#A8BD27]/20 transition-all resize-none bg-[#EDF0F5]"
                    />
                </div>

                <div className="space-y-2.5 pt-1">

                    <OnboardingButton
                        variant="plain"
                        label="Clear Flag (False Positive)"
                        onClick={() => onAction("clear", notes)}
                        icon={<Check className="w-4 h-4" />}
                        className="my-0 border-[#C8E69E] text-[#526B2F] hover:text-black"
                    />

                    <OnboardingButton
                        variant="plain"
                        label="File STR (Suspicious Txn)"
                        onClick={() => onAction("str", notes)}
                        icon={<FileText className="w-4 h-4 text-[#2C2C2C]" />}
                        className="border-[#A8A8A8] text-[#2C2C2C] hover:text-black"
                    />

                    <OnboardingButton
                        variant="plain"
                        label="Reject & Refund"
                        onClick={() => onAction("reject", notes)}
                        icon={<X className="w-4 h-4 text-[#D4001A] group-hover:text-[#D4001A]" />}
                        className="group border-[#D4001A] text-[#D4001A] bg-[#FFF5F6] hover:text-black hover:border-none"
                    />

                </div>
            </div>
        </div>
    );
}