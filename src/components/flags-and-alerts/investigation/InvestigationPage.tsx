"use client";

import React, { use } from "react";
import { InvestigationHeader } from "@/components/flags-and-alerts/investigation/InvestigationHeader";
import { TriggerContextCard, TriggerContextData } from "@/components/flags-and-alerts/investigation/TriggerContextCard";
import { EntityDetailsCard, EntityDetailsData } from "@/components/flags-and-alerts/investigation/EntityDetailsCard";
import { FlaggedTransactionCard, FlaggedTransactionData } from "@/components/flags-and-alerts/investigation/FlaggedTransactionCard";
import { ResolutionActionsCard } from "@/components/flags-and-alerts/investigation/ResolutionActionsCard";
import { AuditTrailCard, AuditTrailItem } from "@/components/flags-and-alerts/investigation/AuditTrailCard";

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
    // Unwrap Next.js dynamic params
    const { flagId } = use(params);

    // Fallback to FLG-1092 data if ID isn't explicitly matched
    const data = ALERTS_DATABASE[flagId] || {
        ...ALERTS_DATABASE["FLG-1092"],
        flagId: flagId,
        title: `Investigation details for flag ${flagId}`,
    };

    const handleResolutionAction = (action: string, notes: string) => {
        console.log(`Action [${action}] submitted for ${flagId}:`, { notes });
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] font-sans text-[#11110F]">
            <InvestigationHeader
                flagId={data.flagId}
                title={data.title}
                onReassign={() => console.log("Reassign clicked")}
                onFreezeAccount={() => console.log("Freeze clicked")}
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
        </div>
    );
}