"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReviewCaseHeader } from "@/components/investor-management/molecules/review-case/ReviewCaseHeader";
import { SuspensionReasonCard } from "@/components/investor-management/molecules/review-case/SuspensionReasonCard";
import { InvestigationNotes } from "@/components/investor-management/molecules/review-case/InvestigationNotes";
import { InvestorSnapshot } from "@/components/investor-management/molecules/review-case/InvestorSnapshot";
import { FinancialImpactCard } from "@/components/investor-management/molecules/review-case/FinancialImpactCard";
import { ArrowLeft } from "lucide-react";
import { EscalateStrModal } from "@/components/investor-management/molecules/review-case/EscalateStrModal";

interface ReviewCaseProps {
    investorId: string;
}

interface InvestigationNote {
    id: string;
    author: string;
    role: string;
    timestamp: string;
    content: string;
    isSystemAlert?: boolean;
}

const INITIAL_INVESTIGATION_DATA = {
    user: {
        name: "Aisha Bello",
        investorId: "INV-2849",
        status: "Suspended",
        suspendedDate: "Jan 15, 2026",
        email: "johndoe@gmailu.com",
        phone: "+234 7499 293 8293",
        residentialAddress: "NO 21, Lokogoma manu estate, Abuja",
    },
    reason: "Suspension Reason: Failed ID Verification (Forgery Suspected)",
    description:
        "The automated KYC system flagged the submitted international passport. OCR data extraction succeeded, but digital forgery detection analysis reported a 94% probability of manipulation on the MRZ zone and photo placement.",
    systemFlags: [
        "MRZ Checksum Mismatch",
        "Photo edge manipulation detected",
    ],
    financialImpact: {
        walletBalance: "₦185,000",
        activePositions: 0,
        pendingWithdrawals: "₦185,000",
        withdrawalBlocked: true,
    },
    notes: [
        {
            id: "1",
            author: "Sarah Mitchell",
            role: "Compliance",
            timestamp: "Jan 15, 2024, 14:32",
            content:
                "Reviewed the document manually. The font on the date of birth doesn't match standard issuer specifications, and the MRZ checksum for the document number is completely invalid. High confidence this is a fabricated identity.",
        },
        {
            id: "2",
            author: "System Auto-Lock",
            role: "System",
            timestamp: "Jan 15, 2024, 09:12",
            content: "Account automatically suspended pending manual review. Trigger: Smile Identity API returned 94% forgery confidence score.",
            isSystemAlert: true,
        },
    ] as InvestigationNote[],
};

export function ReviewCase({ investorId }: ReviewCaseProps) {
    const router = useRouter();
    const [data, setData] = useState(INITIAL_INVESTIGATION_DATA);
    const [newNote, setNewNote] = useState("");
    const [isStrModalOpen, setIsStrModalOpen] = useState(false);

    const handleAddNote = () => {
        if (!newNote.trim()) return;
        const note: InvestigationNote = {
            id: Date.now().toString(),
            author: "Current Officer",
            role: "Compliance",
            timestamp: "Just now",
            content: newNote.trim(),
        };
        setData((prev) => ({
            ...prev,
            notes: [note, ...prev.notes],
        }));
        setNewNote("");
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] space-y-6 font-sans text-[#11110F]">
            {/* Top Navigation Back */}
            <button
                onClick={() => router.back()}
                className="hidden lg:inline-flex items-center gap-2 text-[16px] text-[#858585] hover:text-[#11110F] transition-colors cursor-pointer mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Suspended Accounts</span>
            </button>

            {/* Header Component */}
            <ReviewCaseHeader
                user={data.user}
                investorId={investorId}
                onEscalateStr={() => setIsStrModalOpen(true)}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    <SuspensionReasonCard
                        reason={data.reason}
                        description={data.description}
                        systemFlags={data.systemFlags}
                    />
                    <InvestigationNotes
                        notes={data.notes}
                        newNote={newNote}
                        onNoteChange={setNewNote}
                        onSaveNote={handleAddNote}
                    />
                </div>

                {/* Right Column (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    <InvestorSnapshot user={data.user} />
                    <FinancialImpactCard financialImpact={data.financialImpact} />
                </div>
            </div>

            <EscalateStrModal
                isOpen={isStrModalOpen}
                onClose={() => setIsStrModalOpen(false)}
                user={data.user}
            />
        </div>
    );
}