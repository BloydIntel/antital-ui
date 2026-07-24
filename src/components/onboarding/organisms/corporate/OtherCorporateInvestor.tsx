"use client"

import React, { useState, useMemo } from 'react'
import { useOnboardingStore, KYCData } from '@/store/onboardingStore'
import { CollapsibleUpload } from '@/components/onboarding/molecules/CollapsibleUpload'
import { useOnboardingFileUpload } from '@/hooks/onboarding/useOnboardingFileUpload'
import { hasOnboardingDocument } from '@/lib/onboarding-file-upload'

type CorporateDocField =
  | 'statusReport'
  | 'qiiLicense'
  | 'boardResolution'
  | 'incorporationCertificate'

const PATH_FIELD: Record<CorporateDocField, keyof KYCData> = {
  statusReport: 'statusReportPathOrKey',
  qiiLicense: 'qiiLicensePathOrKey',
  boardResolution: 'boardResolutionPathOrKey',
  incorporationCertificate: 'incorporationCertificatePathOrKey',
}

export function OtherCorporateInvestor({ showErrors }: { showErrors: boolean }) {
    const { formData } = useOnboardingStore();
    const data = formData.kycData;
    const categoryId = formData.selectedCategoryId;
    const { uploadKycDocument, isUploading } = useOnboardingFileUpload();

    const activeSections = useMemo(() => {
        if (categoryId === 'qii') {
            return [
                {
                    id: 'statusReport',
                    field: 'statusReport' as CorporateDocField,
                    title: 'Upload recent status report document',
                },
                {
                    id: 'qiiLicense',
                    field: 'qiiLicense' as CorporateDocField,
                    title: 'Evidence of QII registration/license',
                },
                {
                    id: 'resolution',
                    field: 'boardResolution' as CorporateDocField,
                    title: 'Board resolution authorising registration, investment and account representative',
                }
            ];
        }

        return [
            {
                id: 'certificate',
                field: 'incorporationCertificate' as CorporateDocField,
                title: 'Incorporation Certificate',
            },
            {
                id: 'statusReport',
                field: 'statusReport' as CorporateDocField,
                title: 'Upload recent status report document',
            },
            {
                id: 'resolution',
                field: 'boardResolution' as CorporateDocField,
                title: 'Board resolution authorising registration, investment and account representative',
            }
        ];
    }, [categoryId]);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        certificate: true,
        statusReport: true,
        resolution: true,
        qiiLicense: true
    });

    const toggleSection = (id: string) => {
        setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="flex flex-col">
            {activeSections.map((section) => {
                const pathField = PATH_FIELD[section.field];
                const pathOrKey = data[pathField] as string | null;
                const file = data[section.field] as File | null;

                return (
                    <CollapsibleUpload
                        key={section.id}
                        title={section.title}
                        isOpen={!!openSections[section.id]}
                        onToggle={() => toggleSection(section.id)}
                        onUpload={(nextFile) => {
                            void uploadKycDocument(
                                section.field,
                                pathField as
                                    | "statusReportPathOrKey"
                                    | "qiiLicensePathOrKey"
                                    | "boardResolutionPathOrKey"
                                    | "incorporationCertificatePathOrKey",
                                nextFile
                            );
                        }}
                        value={file}
                        uploadedUrl={pathOrKey}
                        uploading={isUploading(section.field)}
                        isError={showErrors && !hasOnboardingDocument(file, pathOrKey)}
                    />
                );
            })}
        </div>
    );
}
