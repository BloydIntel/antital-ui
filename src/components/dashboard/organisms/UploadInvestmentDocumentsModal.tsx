"use client"

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { TYPOGRAPHY } from "@/constants/styles"
import { UploadBusinessDocument } from '@/components/onboarding/organisms/fundraiser/UploadBusinessDocument'
import { AddNewInvestmentFormPayload } from '@/types/investment'

interface UploadInvestmentDocumentsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UploadInvestmentDocumentsModal({
    isOpen,
    onClose,
}: UploadInvestmentDocumentsModalProps) {

    const [localFormData, setLocalFormData] = useState<AddNewInvestmentFormPayload>({
        founderAndTeamIntroduction: null,
        fundraisingDeck: null,
        investmentMemo: null,
        termsOfOffering: null,
        productDemo: null,
        businessDescription: '',
        businessSector: '',
        instrumentType: '',
        businessSize: '',
        fundingTarget: '',
        investmentRound: '',
    });

    if (!isOpen) return null;

    const handleUpdateFormData = (fieldsToUpdate: Partial<AddNewInvestmentFormPayload>) => {
        setLocalFormData((prev) => ({ ...prev, ...fieldsToUpdate }));
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Area */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer"
                onClick={onClose}
            />

            <div className="lg:px-[80px] xl:px-[236px] bg-white w-full md:w-[80vw] max-w-[1000px] h-full rounded-none md:rounded-l-md border-l border-[#EAEAEA] shadow-2xl relative z-10 flex flex-col animate-in slide-in-from-right duration-300 focus-visible:outline-none">

                {/* Header Context Section */}
                <div className="pt-6 px-6 md:pt-8 md:px-0 relative shrink-0">
                    <button
                        onClick={onClose}
                        type="button"
                        className="absolute right-2 lg:-right-15 xl:-right-55 top-4 p-2 rounded-md border border-[#EAEAEA] text-[#1B1B1B] hover:bg-gray-50 transition-colors cursor-pointer focus-visible:outline-none"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <h3 className="text-[24px] md:text-[28px] text-[#1B1B1B] font-medium tracking-tight mb-2" style={TYPOGRAPHY.heading}>
                        Upload Business Documents
                    </h3>
                    <p className="text-[14px] md:text-[16px] text-[#717171]" style={TYPOGRAPHY.body}>
                        These documents verify your company&apos;s legal status and compliance
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto pt-16 px-6 md:px-0 layer-scroller scrollbar-hide">
                    <UploadBusinessDocument
                        isModalVariant={true}
                        externalFormData={localFormData}
                        externalUpdateFormData={handleUpdateFormData}
                        onCancelCallback={onClose}
                        onSuccessCallback={onClose}
                    />
                </div>
            </div>
        </div>
    )
}