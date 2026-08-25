"use client";

import React from "react";
import { X } from "lucide-react";
import { TransactionDetailsData } from "@/types/transaction";
import { DetailSection } from "@/components/flags-and-alerts/investor-transactions/investor-transaction-details/DetailSection";
import { DetailGridItem } from "@/components/flags-and-alerts/investor-transactions/investor-transaction-details/DetailGridItem";
import { TransactionTimeline } from "@/components/flags-and-alerts/investor-transactions/investor-transaction-details//TransactionTimeline";
import { TYPOGRAPHY } from "@/constants/styles";
import { StatusBadge } from "@/components/flags-and-alerts/atom/StatusBadge";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";


interface TransactionDetailsViewProps {
    data: TransactionDetailsData;
    onClose: () => void;
}

export function TransactionDetailsView({ data, onClose }: TransactionDetailsViewProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="relative w-full max-w-[746px] bg-white rounded-2xl border border-[#EAEAEA] shadow-xl my-8 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA]">
                    <h2 className="text-[16px] font-medium text-[#1B1B1B]">
                        Transaction Details
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded-md text-[#858585] hover:text-[#11110F] hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto scrollbar-hide">
                    {/* Main Title Banner */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h1 className="text-[24px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                                    {data.type}
                                </h1>
                                {data.flagged && (
                                    <span className="inline-flex items-center rounded-md bg-[#FCFCFC] border border-[#EAEAEA] px-2.5 py-1 text-[12px] text-[#D4001A]">
                                        Flagged
                                    </span>
                                )}
                            </div>
                            <p className="text-[14px] text-[#858585] font-normal">{data.id}</p>
                        </div>
                        <div className="text-right space-y-1">
                            <StatusBadge status={data.status} />
                            <p className="text-[14px] text-[#858585]">{data.date}</p>
                        </div>
                    </div>

                    {/* Section 1: Overview */}
                    <DetailSection title="Transaction Overview">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
                            <DetailGridItem label="Transaction Type" value={data.overview.type} />
                            <DetailGridItem
                                label="Transaction Status"
                                value={<StatusBadge status={data.overview.status} />}
                            />
                            <DetailGridItem label="Amount" value={data.overview.amount} />
                            <DetailGridItem label="Campaign" value={data.overview.campaign} />
                            <DetailGridItem label="Payment Method" value={data.overview.paymentMethod} />
                            <DetailGridItem label="Currency" value={data.overview.currency} />
                            <DetailGridItem label="Reference ID" value={data.overview.referenceId} />
                            <DetailGridItem label="Initiated By" value={data.overview.initiatedBy} />
                            <DetailGridItem label="Processed By" value={data.overview.processedBy} />
                            <DetailGridItem label="Date & Time" value={data.overview.dateTime} />
                            <DetailGridItem label="Channel" value={data.overview.channel} />
                            <DetailGridItem label="Source IP" value={data.overview.sourceIp} />
                        </div>
                    </DetailSection>

                    {/* Section 2: Information */}
                    <DetailSection title="Transaction Information">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
                            <DetailGridItem label="Transaction ID" value={data.information.transactionId} />
                            <DetailGridItem label="Investment ID" value={data.information.investmentId} />
                            <DetailGridItem label="Investor" value={data.information.investor} />
                            <DetailGridItem label="Investor Type" value={data.information.investorType} />
                            <DetailGridItem label="Campaign" value={data.information.campaign} />
                            <DetailGridItem label="Investment Amount" value={data.information.investmentAmount} />
                            <DetailGridItem label="Fee" value={data.information.fee} />
                            <DetailGridItem label="Net Amount" value={data.information.netAmount} />
                        </div>
                    </DetailSection>

                    {/* Section 3: Payment */}
                    <DetailSection title="Payment Information">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-6">
                            <DetailGridItem label="Payment Method" value={data.payment.paymentMethod} />
                            <DetailGridItem label="Bank Name" value={data.payment.bankName} />
                            <DetailGridItem label="Account Name" value={data.payment.accountName} />
                            <DetailGridItem label="Account Number" value={data.payment.accountNumber} />
                            <DetailGridItem label="Transaction Reference" value={data.payment.transactionReference} />
                            <DetailGridItem label="Payment Status" value={data.payment.paymentStatus} />
                            <DetailGridItem label="Payment Date" value={data.payment.paymentDate} />
                            <DetailGridItem label="Settlement Date" value={data.payment.settlementDate} />
                        </div>
                    </DetailSection>

                    {/* Section 4: Timeline */}
                    <DetailSection title="Transaction Timeline">
                        <TransactionTimeline events={data.timeline} />
                    </DetailSection>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[#EAEAEA]">
                        <OnboardingButton
                            variant="plain"
                            label="Close"
                            onClick={onClose}
                            className="my-0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}