"use client"

import React, { useState } from 'react'
import { X, ChevronUp } from 'lucide-react'
import { TYPOGRAPHY } from "@/constants/styles"
import { UploadSection } from '@/components/onboarding/molecules/UploadSection'

interface UploadInvestmentDocumentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (documents: {
        founderIntro: File | null;
        pitchDeck: File | null;
        prospectus: File | null;
    }) => void;
}

// Explicit literal types for key mapping safety
type DocKey = 'founderIntro' | 'pitchDeck' | 'prospectus';

interface DocumentConfig {
    id: DocKey;
    label: string;
    value: File | null;
    setter: React.Dispatch<React.SetStateAction<File | null>>;
}

export function UploadInvestmentDocumentsModal({
    isOpen,
    onClose,
    onSubmit
}: UploadInvestmentDocumentsModalProps) {
    const [founderIntro, setFounderIntro] = useState<File | null>(null);
    const [pitchDeck, setPitchDeck] = useState<File | null>(null);
    const [prospectus, setProspectus] = useState<File | null>(null);

    // Track the open/collapsed state individually for each section key
    const [expandedSections, setExpandedSections] = useState<Record<DocKey, boolean>>({
        founderIntro: true,
        pitchDeck: true,
        prospectus: true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    // Unified configurations array mapping titles to the underlying component hooks
    const documentsConfig: DocumentConfig[] = [
        {
            id: 'founderIntro',
            label: "1. Founder and Team Introduction",
            value: founderIntro,
            setter: setFounderIntro,
        },
        {
            id: 'pitchDeck',
            label: "2. Fundraising deck (high-level pitch)",
            value: pitchDeck,
            setter: setPitchDeck,
        },
        {
            id: 'prospectus',
            label: "3. Investment memo/prospectus (thorough analysis)",
            value: prospectus,
            setter: setProspectus,
        },
    ];

    const toggleSection = (id: DocKey) => {
        setExpandedSections((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (onSubmit) {
                await onSubmit({ founderIntro, pitchDeck, prospectus });
            }
            onClose();
        } catch (err) {
            console.error("Failed to upload business compliance records:", err);
        } finally {
            setIsSubmitting(false);
        }
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
                <div className="p-6 md:p-8 relative shrink-0">
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

                {/* Scrollable Form Content Frame */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 layer-scroller scrollbar-hide">
                    {documentsConfig.map((doc) => {
                        const isExpanded = expandedSections[doc.id];

                        return (
                            <div key={doc.id} className="space-y-4">
                                {/* Clickable Accordion Accord Strip */}
                                <div
                                    className="flex justify-between items-center cursor-pointer group py-2"
                                    onClick={() => toggleSection(doc.id)}
                                >
                                    <h3 className="text-[20px] text-[#1B1B1B] font-medium" style={TYPOGRAPHY.body}>
                                        {doc.label}
                                    </h3>
                                    <div className="border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors">
                                        <ChevronUp
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!isExpanded ? "rotate-180" : ""}`}
                                        />
                                    </div>
                                </div>

                                {/* Animated Collapsible View Wrapper */}
                                <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                                    <div className="overflow-hidden">
                                        <UploadSection
                                            onUpload={doc.setter}
                                            value={doc.value}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Sticky Form Action Control Bar */}
                    <div className="flex gap-4 pt-6 border-t border-[#F4F4F4] shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 border border-[#EAEAEA] rounded-xl py-3 text-[14px] font-medium text-[#1B1B1B] hover:bg-gray-50 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-[#042E27] text-white rounded-xl py-3 text-[14px] font-medium hover:bg-[#03221C] transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {isSubmitting ? "Uploading Documents..." : "Submit for Verification"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}