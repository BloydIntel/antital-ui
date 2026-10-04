"use client";

import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { KycHeader } from "@/components/investor-management/molecules/kyc/KycHeader";
import { PersonalInformationCard } from "@/components/investor-management/molecules/kyc/PersonalInformationCard";
import { VerifiedSummaryCard } from "@/components/investor-management/molecules/kyc/VerifiedSummaryCard";
import { SubmittedDocuments } from "@/components/investor-management/molecules/kyc/SubmittedDocuments";
import { OcrExtractedData } from "@/components/investor-management/molecules/kyc/OcrExtractedData";
import { ApprovalDetailsCard } from "@/components/investor-management/molecules/kyc/ApprovalDetailsCard";
import { ApprovalAuditTrail } from "@/components/investor-management/molecules/kyc/ApprovalAuditTrail";
import { KycVerificationData } from "@/types/admin-investor-kyc";

interface KycReviewPageProps {
    investorId: string;
}

const INITIAL_KYC_DATA: KycVerificationData = {
    user: {
        id: "user-1",
        investorId: "INV-2849",
        name: "Emeka Ofor",
        email: "johndoe@example.com",
        submittedDate: "Oct 24, 2026",
        status: "pending",
    },
    personalInfo: {
        fullName: "John Doe",
        dateOfBirth: "March 12, 1988",
        gender: "MALE",
        phoneNumber: "+234 7499 293 8293",
        emailAddress: "johndoe@gmailu.com",
        residentialAddress: "NO 21, Lokogoma manu estate, Abuja",
    },
    bvnVerification: {
        bvnMatch: true,
        nameMatch: true,
        dobMatch: true,
        livenessCheck: true,
        livenessScore: 96,
    },
    ocrFields: [
        { label: "Last Name", extractedValue: "Doe", submittedValue: "Doe", isMatched: true },
        { label: "First Name", extractedValue: "Joe", submittedValue: "Joe", isMatched: true },
        { label: "Date of Birth", extractedValue: "15 Jan, 2000", submittedValue: "15 Jan, 2000", isMatched: true },
        { label: "Gender", extractedValue: "Male", submittedValue: "Male", isMatched: true },
        { label: "Nationality", extractedValue: "Nigerian", submittedValue: "Nigerian", isMatched: true },
        { label: "Expiry Date", extractedValue: "Jan 2029", submittedValue: "Jan 2029", isMatched: true },
    ],
    approvalRecord: {
        approvedBy: "Funmi Adeyemi (Compliance)",
        approvedDate: "Jan 18, 2024 • 11:04 AM",
        reviewReference: "KYC-REV-2024-6382",
        investmentLimit: "5 million per deal",
    },
    capabilitiesUnlocked: [
        "Can invest up to 5,000,000 per campaign",
        "Secondary market training enabled",
        "Access to debt and equity instrument",
        "Eligible for dividends payment",
        "Wallet deposit up to 10,000,000",
    ],
    auditTrail: [
        { id: "1", title: "KYC Approved", performedBy: "Funmi Adeyemi", timestamp: "Jan 18, 2025 • 11:04 am" },
        { id: "2", title: "Manual Document Review Complete", performedBy: "Funmi Adeyemi", timestamp: "Jan 18, 2025 • 10:04 am" },
        { id: "3", title: "OCR Extraction Complete - all fields matched", performedBy: "System", timestamp: "Jan 18, 2025 • 11:04 am" },
        { id: "4", title: "KYC Submission received - queued for review", performedBy: "System", timestamp: "Jan 18, 2025 • 11:04 am" },
    ],
};

export function KycReviewPage({ investorId }: KycReviewPageProps) {
    const [data, setData] = useState<KycVerificationData>({
        ...INITIAL_KYC_DATA,
        user: {
            ...INITIAL_KYC_DATA.user,
            investorId: investorId,
        },
    });
    const [showBanner, setShowBanner] = useState<boolean>(false);

    const isApproved = data.user.status === "approved";

    const handleApprove = () => {
        setData((prev) => ({
            ...prev,
            user: {
                ...prev.user,
                status: "approved",
                approvalDate: "Oct 24, 2026",
            },
        }));
        setShowBanner(true);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA space-y-4 font-sans text-[#11110F]">
            <KycHeader
                user={data.user}
                onApprove={handleApprove}
            />

            {isApproved && showBanner && (
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center justify-between text-xs text-green-900">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                        <div>
                            <p className="font-bold text-sm text-emerald-950">KYC Approved successfully</p>
                            <p className="text-[#858585] mt-0.5">
                                {data.user.name} KYC has been approved and an approval notification has been queued. Review log saved as KYC-REV-2024-78234.
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setShowBanner(false)} className="text-gray-400 hover:text-black">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Side Column */}
                <div className="lg:col-span-4 space-y-4">
                    {!isApproved ? (
                        <>
                            <PersonalInformationCard info={data.personalInfo} />
                            <VerifiedSummaryCard
                                title="BVN Verification"
                                items={[
                                    { label: "BVN Match", passed: true, value: "Verified" },
                                    { label: "Name Match", passed: true },
                                    { label: "DOB Match", passed: true },
                                    { label: "Liveness Check", passed: true, value: `Pass (${data.bvnVerification.livenessScore}%)` },
                                ]}
                            />
                        </>
                    ) : (
                        <>
                            {data.approvalRecord && (
                                <ApprovalDetailsCard
                                    record={data.approvalRecord}
                                    capabilities={data.capabilitiesUnlocked || []}
                                />
                            )}
                            <VerifiedSummaryCard
                                title="Verified Checked Summary"
                                items={[
                                    { label: "BVN Match", passed: true },
                                    { label: "Name Match", passed: true },
                                    { label: "DOB Match", passed: true },
                                    { label: "Liveness Check", passed: true },
                                    { label: "PEP/Sanctions", passed: true },
                                    { label: "Liveness (96%)", passed: true },
                                    { label: "Document Integrity", passed: true },
                                    { label: "OCR Data match", passed: true },
                                ]}
                            />
                        </>
                    )}
                </div>

                {/* Right Side Column */}
                <div className="lg:col-span-8 space-y-4">
                    <SubmittedDocuments />
                    <OcrExtractedData fields={data.ocrFields} />
                    {isApproved && data.auditTrail && (
                        <ApprovalAuditTrail trail={data.auditTrail} />
                    )}
                </div>
            </div>
        </div>
    );
}