"use client"

import React, { useState, useMemo } from 'react'
import { useOnboardingStore, KYCData } from '@/store/onboardingStore'
import { CollapsibleUpload } from '@/components/onboarding/molecules/CollapsibleUpload'

export function OtherCorporateInvestor({ showErrors }: { showErrors: boolean }) {
    const { formData, updateFormData } = useOnboardingStore();
    const data = formData.kycData;
    const categoryId = formData.selectedCategoryId;

    // Define the sections inside useMemo to switch based on categoryId
    const activeSections = useMemo(() => {
        if (categoryId === 'qii') {
            return [
                {
                    id: 'statusReport',
                    field: 'statusReport' as keyof KYCData,
                    title: 'Upload recent status report document',
                },
                {
                    id: 'qiiLicense',
                    field: 'qiiLicense' as keyof KYCData,
                    title: 'Evidence of QII registration/license',
                },
                {
                    id: 'resolution',
                    field: 'boardResolution' as keyof KYCData,
                    title: 'Board resolution authorising registration, investment and account representative',
                }
            ];
        }

        // Default to OCI sections
        return [
            {
                id: 'certificate',
                field: 'incorporationCertificate' as keyof KYCData,
                title: 'Incorporation Certificate',
            },
            {
                id: 'statusReport',
                field: 'statusReport' as keyof KYCData,
                title: 'Upload recent status report document',
            },
            {
                id: 'resolution',
                field: 'boardResolution' as keyof KYCData,
                title: 'Board resolution authorising registration, investment and account representative',
            }
        ];
    }, [categoryId]);

    // Track open states for each section ID
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        certificate: true,
        statusReport: true,
        resolution: true,
        qiiLicense: true
    });

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleFileChange = (field: keyof KYCData, value: File | null) => {
        updateFormData({
            kycData: { ...data, [field]: value }
        });
    };

    return (
        <div className="flex flex-col">
            {activeSections.map((section) => (
                <CollapsibleUpload
                    key={section.id}
                    title={section.title}
                    isOpen={!!openSections[section.id]}
                    onToggle={() => toggleSection(section.id)}
                    onUpload={(file) => handleFileChange(section.field, file)}
                    value={data[section.field] as File | null}
                    isError={showErrors && !data[section.field]}
                />
            ))}
        </div>
    );
}