"use client";

import React, { use, useState } from "react";
import { InvestigationHeader } from "@/components/flags-and-alerts/investigation/InvestigationHeader";
import { TriggerContextCard, TriggerContextData } from "@/components/flags-and-alerts/investigation/TriggerContextCard";
import { EntityDetailsCard, EntityDetailsData } from "@/components/flags-and-alerts/investigation/EntityDetailsCard";
import { FlaggedTransactionCard, FlaggedTransactionData } from "@/components/flags-and-alerts/investigation/FlaggedTransactionCard";
import { ResolutionActionsCard } from "@/components/flags-and-alerts/investigation/ResolutionActionsCard";
import { AuditTrailCard, AuditTrailItem } from "@/components/flags-and-alerts/investigation/AuditTrailCard";
import { FreezeAccountModal } from "@/components/flags-and-alerts/investigation/FreezeAccountModal";
import { ClearFlagModal } from "@/components/flags-and-alerts/investigation/ClearFlagModal";
import { ReassignInvestigationModal } from "@/components/flags-and-alerts/investigation/ReassignInvestigationModal";
import { RejectTransactionModal } from "@/components/flags-and-alerts/investigation/RejectTransactionModal";
import { FileStrModal } from "@/components/flags-and-alerts/investigation/FileStrModal";

export interface InvestigationDetail {
    flagId: string;
    title: string;
    triggerContext: TriggerContextData;
    entityDetails: EntityDetailsData;
    flaggedTransaction: FlaggedTransactionData;
    auditTrail: AuditTrailItem[];
}

const ALERTS_DATABASE: Record<string, InvestigationDetail> = {
    "FLG-1092": {
        flagId: "FLG-1092",
        title: "Large transaction from blacklisted IP address detected.",
        triggerContext: {
            flagType: "AML / Fraud",
            timeDetected: "Oct 24, 2023 – 14:32:01 UTC",
            sourceIp: "192.168.1.100",
            ipNote: "(Known Proxy)",
            location: "Moscow, Russia",
            systemNote:
                "System flagged this transaction due to a high–risk IP address matching our OFAC sanctions proxy list. The transaction volume is also 400% higher than the user's historical average.",
        },
        entityDetails: {
            name: "John Doe",
            avatarInitials: "JD",
            entityId: "INV-8921",
            type: "Retail Investor",
            kycVerified: true,
            totalInvested: "₦450,000",
            accountAge: "14 Months",
            previousFlags: 0,
        },
        flaggedTransaction: {
            transactionId: "TXN-99382100",
            amount: "₦2,500,000",
            destinationCampaign: "AgriGrow Fund Series B (CMP-104)",
            paymentMethod: "Bank Transfer (GTBank *4431)",
        },
        auditTrail: [
            {
                id: "1",
                event: "Investigation Opened",
                details: "By Sarah Jenkins (Super Admin)",
                time: "Today, 14:45 UTC",
                color: "blue" as const,
            },
            {
                id: "2",
                event: "Flag Triggered by System",
                details: "Rule: High-risk IP match",
                time: "Today, 14:32 UTC",
                color: "red" as const,
            },
        ],
    },
};

interface InvestigationPageProps {
    params: Promise<{ flagId: string }>;
}

export default function InvestigationPage({ params }: InvestigationPageProps) {

    const { flagId } = use(params);

    const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isStrModalOpen, setIsStrModalOpen] = useState(false);

    const data = ALERTS_DATABASE[flagId] || {
        ...ALERTS_DATABASE["FLG-1092"],
        flagId: flagId,
        title: `Investigation details for flag ${flagId}`,
    };

    const handleConfirmFreeze = (formData: { reason: string; notes: string; notifyUser: boolean }) => {
        console.log("Account Frozen with payload:", formData);
        setIsFreezeModalOpen(false);
    };

    const handleConfirmClear = (formData: { category: string; notes: string }) => {
        console.log(`Flag ${flagId} cleared with payload:`, formData);
        setIsClearModalOpen(false);
    };

    const handleConfirmReject = (formData: {
        reason: string;
        narrative: string;
        sendNotification: boolean;
    }) => {
        console.log("Transaction rejected & refunded:", formData);
        setIsRejectModalOpen(false);
    };

    const handleConfirmStr = (formData: {
        indicator: string;
        narrative: string;
        includeAttachments: boolean;
    }) => {
        console.log("STR Filed successfully:", formData);
        setIsStrModalOpen(false);
    };

    const handleResolutionAction = (action: "clear" | "str" | "reject") => {
        if (action === "clear") {
            setIsClearModalOpen(true);
        } else if (action === "str") {
            setIsStrModalOpen(true);
        } else if (action === "reject") {
            setIsRejectModalOpen(true);
        }
    };

    const handleConfirmReassign = (formData: { assignee: string; note: string }) => {
        console.log(`Reassigned ${data.flagId} with payload:`, formData);
        setIsReassignModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#11110F]">
            <InvestigationHeader
                flagId={data.flagId}
                title={data.title}
                onReassign={() => setIsReassignModalOpen(true)}
                onFreezeAccount={() => setIsFreezeModalOpen(true)}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-8 space-y-6">
                    <TriggerContextCard data={data.triggerContext} />
                    <EntityDetailsCard
                        data={data.entityDetails}
                        onViewProfile={() => console.log("View profile clicked")}
                    />
                    <FlaggedTransactionCard data={data.flaggedTransaction} />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-4 space-y-6">
                    <ResolutionActionsCard onAction={handleResolutionAction} />
                    <AuditTrailCard items={data.auditTrail} />
                </div>
            </div>

            <FreezeAccountModal
                isOpen={isFreezeModalOpen}
                onClose={() => setIsFreezeModalOpen(false)}
                onConfirm={handleConfirmFreeze}
                entityName="John Doe"
                entityId="INV-8921"
            />

            <ClearFlagModal
                isOpen={isClearModalOpen}
                onClose={() => setIsClearModalOpen(false)}
                onConfirm={handleConfirmClear}
                flagId={data.flagId}
                entityName={data.entityDetails.name}
                entityId={data.entityDetails.entityId}
            />

            <ReassignInvestigationModal
                isOpen={isReassignModalOpen}
                onClose={() => setIsReassignModalOpen(false)}
                onConfirm={handleConfirmReassign}
                flagId={data.flagId}
            />

            <RejectTransactionModal
                isOpen={isRejectModalOpen}
                onClose={() => setIsRejectModalOpen(false)}
                onConfirm={handleConfirmReject}
                transactionId={data.flaggedTransaction.transactionId}
                amount={data.flaggedTransaction.amount}
                entityName={data.entityDetails.name}
                entityId={data.entityDetails.entityId}
                destination={data.flaggedTransaction.paymentMethod}
            />

            <FileStrModal
                isOpen={isStrModalOpen}
                onClose={() => setIsStrModalOpen(false)}
                onConfirm={handleConfirmStr}
                entityName={data.entityDetails.name}
                entityId={data.entityDetails.entityId}
                transactionId={data.flaggedTransaction.transactionId}
            />
        </div>
    );
}