"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
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

const APPROVALLOG = {
    refNo: "KYC-REV-2024-78234"
}

const REQUEST_INFORMATION_OPTIONS = [
    "Clearer copy of government-issued ID",
    "Proof of address (utility bill or bank statement less than 3 months old)",
    "Updated selfie with ID held next to face",
    "Source of funds declaration",
    "Director / beneficial ownership documents",
];

export function KycReviewPage({ investorId }: KycReviewPageProps) {
    const [data, setData] = useState<KycVerificationData>({
        ...INITIAL_KYC_DATA,
        user: {
            ...INITIAL_KYC_DATA.user,
            investorId: investorId,
        },
    });
    const [showBanner, setShowBanner] = useState<boolean>(false);
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [selectedInfoRequests, setSelectedInfoRequests] = useState<string[]>([
        REQUEST_INFORMATION_OPTIONS[0],
        REQUEST_INFORMATION_OPTIONS[1],
    ]);
    const [responseDeadline, setResponseDeadline] = useState("7");
    const [requestMessage, setRequestMessage] = useState(
        `Dear ${data.user.name}, we reviewed your KYC submission and need the selected information before we can proceed.`
    );
    const [notificationChannels, setNotificationChannels] = useState<string[]>(["Email", "In App"]);

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

    const handleToggleInfoRequest = (value: string) => {
        setSelectedInfoRequests((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value]
        );
    };

    const handleToggleNotificationChannel = (value: string) => {
        setNotificationChannels((current) =>
            current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value]
        );
    };

    const handleSendRequest = () => {
        setIsRequestModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] space-y-4 font-sans text-[#11110F]">
            <KycHeader
                user={data.user}
                onApprove={handleApprove}
                onRequestMoreInfo={() => setIsRequestModalOpen(true)}
            />

            {isApproved && showBanner && (
                <div className="bg-[#FFFFFF] border border-[#45B424] p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#C1F0B2] flex items-center justify-center">
                            <div className="h-3.5 w-3.5 rounded-full bg-[#45B424]"><Check className="w-3.5 h-3.5 text-white" /></div>
                        </div>

                        <div>
                            <p className="font-medium text-[18px] text-[#36861E]">KYC Approved successfully</p>
                            <p className="text-[#858585] mt-2 text-[14px]">
                                {data.user.name} KYC has been approved and an approval notification has been queued. Review log saved as <span className="uppercase underline font-medium">{APPROVALLOG.refNo}</span> .
                            </p>
                        </div>
                    </div>
                    <button onClick={() => setShowBanner(false)} className="text-[#2C2C2C]">
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

            {isRequestModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Request More Information</h2>
                            <button
                                type="button"
                                onClick={() => setIsRequestModalOpen(false)}
                                aria-label="Close request information"
                                className="text-[#2C2C2C]"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-[#666]">
                            Select the information required before KYC can proceed.
                        </p>

                        <div className="mt-5 space-y-3">
                            {REQUEST_INFORMATION_OPTIONS.map((item) => (
                                <label
                                    key={item}
                                    className="flex items-center gap-3 rounded-lg border border-[#EAEAEA] p-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedInfoRequests.includes(item)}
                                        onChange={() => handleToggleInfoRequest(item)}
                                    />
                                    {item}
                                </label>
                            ))}
                        </div>

                        <label className="mt-5 block text-sm font-medium">
                            Response deadline
                            <select
                                value={responseDeadline}
                                onChange={(event) => setResponseDeadline(event.target.value)}
                                className="mt-2 w-full rounded-lg border border-[#EAEAEA] p-3"
                            >
                                <option value="3">3 days</option>
                                <option value="7">7 days</option>
                                <option value="14">14 days</option>
                            </select>
                        </label>

                        <label className="mt-4 block text-sm font-medium">
                            Message to investor
                            <textarea
                                value={requestMessage}
                                onChange={(event) => setRequestMessage(event.target.value)}
                                className="mt-2 min-h-24 w-full rounded-lg border border-[#EAEAEA] p-3"
                            />
                        </label>

                        <div className="mt-4">
                            <p className="text-sm font-medium">Notify investor</p>
                            <div className="mt-2 flex gap-4">
                                {["Email", "In App", "SMS"].map((channel) => (
                                    <label key={channel} className="flex items-center gap-2 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={notificationChannels.includes(channel)}
                                            onChange={() => handleToggleNotificationChannel(channel)}
                                        />
                                        {channel}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <p className="mt-4 rounded-lg bg-[#FFF8E7] p-3 text-sm text-[#795C00]">
                            Sending this request changes the KYC status to Info Requested and sets a {responseDeadline}-day response window.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsRequestModalOpen(false)}
                                className="rounded-lg border border-[#EAEAEA] px-4 py-2 text-sm font-medium text-[#2C2C2C]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSendRequest}
                                disabled={!selectedInfoRequests.length || !requestMessage.trim() || !notificationChannels.length}
                                className="rounded-lg bg-[#365852] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}