"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useAdminAlert } from "@/hooks/use-admin-alert";
import service from "@/services/adminAlertsService";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { showApiErrorToast } from "@/lib/error-feedback";

export interface InvestigationDetail {
    flagId: string;
    title: string;
    triggerContext: TriggerContextData;
    entityDetails: EntityDetailsData;
    flaggedTransaction: FlaggedTransactionData;
    auditTrail: AuditTrailItem[];
}

interface InvestigationPageProps {
    flagId: string;
}

export default function InvestigationPage({ flagId }: InvestigationPageProps) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: alert, isLoading, isError } = useAdminAlert(flagId);

    const [isFreezeModalOpen, setIsFreezeModalOpen] = useState(false);
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isStrModalOpen, setIsStrModalOpen] = useState(false);

    const data: InvestigationDetail | undefined = alert ? {
        flagId: alert.flagId,
        title: alert.description,
        triggerContext: {
            flagType: alert.type,
            timeDetected: new Date(alert.occurredAtUtc).toUTCString(),
            sourceIp: "Unavailable",
            ipNote: "",
            location: "Unavailable",
            systemNote: `${alert.severity} severity alert with status ${alert.status}.`,
        },
        entityDetails: {
            name: alert.entityAffected,
            avatarInitials: alert.entityAffected.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
            entityId: alert.entityAffected,
            type: alert.type,
            kycVerified: false,
            totalInvested: "Unavailable",
            accountAge: "Unavailable",
            previousFlags: 0,
        },
        flaggedTransaction: {
            transactionId: alert.flagId,
            amount: "Unavailable",
            destinationCampaign: "Unavailable",
            paymentMethod: "Unavailable",
        },
        auditTrail: [{
            id: String(alert.id),
            event: "Flag Triggered by System",
            details: `${alert.severity} severity · ${alert.status}`,
            time: new Date(alert.occurredAtUtc).toUTCString(),
            color: alert.severity === "CRITICAL" ? "red" : "blue",
        }],
    } : undefined;

    const handleConfirmFreeze = async (formData: { reason: string; notes: string; notifyUser: boolean }) => {
        try {
            await service.updateAlert(flagId, { status: "Acknowledged", resolutionNote: `${formData.reason}: ${formData.notes}` });
            await queryClient.invalidateQueries({ queryKey: ["admin-flag", flagId] });
            setIsFreezeModalOpen(false);
            toast.success("Account freeze recorded.");
        } catch (error) {
            showApiErrorToast(error, "Unable to freeze this account.");
        }
    };

    const handleConfirmClear = async (formData: { category: string; notes: string }) => {
        try {
            await service.updateAlert(flagId, { status: "Dismissed", resolutionNote: `${formData.category}: ${formData.notes}` });
            await queryClient.invalidateQueries({ queryKey: ["admin-flag", flagId] });
            setIsClearModalOpen(false);
            toast.success("Flag cleared.");
        } catch (error) {
            showApiErrorToast(error, "Unable to clear this flag.");
        }
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

    const handleConfirmReassign = async (formData: { assignee: string; note: string }) => {
        try {
            const assigneeUserId = Number(formData.assignee);
            await service.updateAlert(flagId, { ...(Number.isInteger(assigneeUserId) ? { assigneeUserId } : {}), resolutionNote: formData.note });
            await queryClient.invalidateQueries({ queryKey: ["admin-flag", flagId] });
            setIsReassignModalOpen(false);
            toast.success("Investigation reassigned.");
        } catch (error) {
            showApiErrorToast(error, "Unable to reassign this investigation.");
        }
    };

    const handleViewProfile = () => {
        if (!data) return;
        router.push(`/investor-profile/${data.entityDetails.entityId}?from=investigation`);
    };

    if (isLoading) return <div className="rounded-xl border border-[#E6E6E6] bg-white p-8 text-[#666]">Loading investigation details…</div>;
    if (isError || !data) return <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-red-700">Unable to load this flag. It may no longer exist.</div>;

    return (
        <div className="min-h-screen font-sans text-[#11110F]">
            <InvestigationHeader
                flagId={data.flagId}
                title={data.title}
                onReassign={() => setIsReassignModalOpen(true)}
                onFreezeAccount={() => setIsFreezeModalOpen(true)}
            />

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Column */}
                <div className="xl:col-span-8 space-y-6">
                    <TriggerContextCard data={data.triggerContext} />
                    <EntityDetailsCard
                        data={data.entityDetails}
                        onViewProfile={handleViewProfile}
                    />
                    <FlaggedTransactionCard data={data.flaggedTransaction} />
                </div>

                {/* Right Column */}
                <div className="xl:col-span-4 space-y-6">
                    <ResolutionActionsCard onAction={handleResolutionAction} />
                    <AuditTrailCard items={data.auditTrail} />
                </div>
            </div>

            <FreezeAccountModal
                isOpen={isFreezeModalOpen}
                onClose={() => setIsFreezeModalOpen(false)}
                onConfirm={handleConfirmFreeze}
                entityName={data.entityDetails.name}
                entityId={data.entityDetails.entityId}
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
