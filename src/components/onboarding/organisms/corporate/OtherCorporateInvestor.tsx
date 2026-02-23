"use client"

import React, { useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { UploadSection } from '../../molecules/UploadSection'
import { useOnboardingStore, KYCData } from '@/store/onboardingStore'
import { TYPOGRAPHY } from '@/constants/styles'

interface CollapsibleProps {
    title: string;
    onUpload: (file: File | null) => void;
    isError: boolean;
    isOpen: boolean;
    onToggle: () => void;
    value: File | null;
}

const CollapsibleUpload = ({ title, onUpload, isError, isOpen, onToggle, value }: CollapsibleProps) => (
    <div className="space-y-1 pt-4 border-b border-gray-50">
        <div
            className="flex justify-between items-center cursor-pointer group"
            onClick={onToggle}
        >
            <h3 className="text-[16px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                {title}
            </h3>
            <div className='border border-[#EAEAEA] rounded p-1 group-hover:bg-gray-50 transition-colors'>
                <ChevronUp
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
                />
            </div>
        </div>

        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 invisible"
            }`}>
            <UploadSection
                value={value}
                onUpload={onUpload}
                isError={isError}
            />
        </div>
    </div>
);

export function OtherCorporateInvestor({ showErrors }: { showErrors: boolean }) {
    const { formData, updateFormData } = useOnboardingStore();
    const data = formData.kycData;

    // Local state to track which sections are open (defaulting all to true as per your images)
    const [openSections, setOpenSections] = useState({
        certificate: true,
        statusReport: true,
        resolution: true
    });

    const toggleSection = (section: keyof typeof openSections) => {
        setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleFileChange = (field: keyof KYCData, value: File | null) => {
        updateFormData({
            kycData: { [field]: value }
        });
    };

    const sections = [
        {
            id: 'certificate' as const,
            field: 'incorporationCertificate' as keyof KYCData,
            title: 'Incorporation Certificate',
            desc: 'Ensure the document is clear and all information is visible'
        },
        {
            id: 'statusReport' as const,
            field: 'statusReport' as keyof KYCData,
            title: 'Upload recent status report document',
            desc: 'Ensure the document is clear and all information is visible'
        },
        {
            id: 'resolution' as const,
            field: 'boardResolution' as keyof KYCData,
            title: 'Board resolution authorising registration, investment and account representative',
            desc: 'Authorising registration, investment and account representative'
        }
    ];

    return (
        <div >
            {sections.map((section) => (
                <CollapsibleUpload
                    key={section.id}
                    title={section.title}
                    isOpen={openSections[section.id]}
                    onToggle={() => toggleSection(section.id)}
                    onUpload={(file) => handleFileChange(section.field, file)}
                    value={data[section.field] as File | null}
                    isError={showErrors && !data[section.field]}
                />
            ))}
        </div>
    );
}