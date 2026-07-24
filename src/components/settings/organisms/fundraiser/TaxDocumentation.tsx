'use client';

import React, { useState } from 'react';
import { TYPOGRAPHY } from '@/constants/styles';
import { TaxDocumentCard, TaxDocumentItem } from '@/components/settings/organisms/fundraiser/tax-documentation/TaxDocumentCard';

const INITIAL_TAX_DOCUMENTS: TaxDocumentItem[] = [
    {
        id: '1',
        title: 'W-9 Form',
        date: 'Jan 12, 2024',
        status: 'VERIFIED',
    },
    {
        id: '2',
        title: 'VAT Registration',
        date: 'Jan 15, 2024',
        status: 'VERIFIED',
    },
    {
        id: '3',
        title: 'Certificate of Incorporation',
        date: 'Jan 19, 2024',
        status: 'VERIFIED',
    },
    {
        id: '4',
        title: 'Tax Clearance Certificate',
        date: 'Dec 30, 2023',
        status: 'UNVERIFIED',
    },
];

export function TaxDocumentation() {
    const [documents] = useState<TaxDocumentItem[]>(INITIAL_TAX_DOCUMENTS);

    const handleDownload = (doc: TaxDocumentItem) => {
        console.log(`Downloading document: ${doc.title}`);
    };

    return (
        <div className="w-full font-sans space-y-6">

            {/* Header Title Section */}
            <div>
                <h2 className="text-[24px] lg:text-[28px] text-[#1B1B1B]" style={TYPOGRAPHY.heading}>
                    Tax Documentation
                </h2>
                <p className="text-[14px] lg:text-[16px] text-[#505050] mt-0.5" style={TYPOGRAPHY.body}>
                    Manage your tax compliance documents and history.
                </p>
            </div>

            {/* Required Documents Grid Container */}
            <div className="bg-white border border-[#F4F5F7] rounded-lg p-3 lg:p-6 space-y-6">
                <h3 className="text-[16px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                    Required Documents
                </h3>

                <div className="grid xl:grid-cols-2 gap-4">
                    {documents.map((doc) => (
                        <TaxDocumentCard
                            key={doc.id}
                            document={doc}
                            onDownload={handleDownload}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}