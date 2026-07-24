'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { TYPOGRAPHY } from '@/constants/styles';

const COMPLIANCE_ITEMS = [
    { label: "Identity Verified", isComplete: true },
    { label: "Address Verified", isComplete: true },
    { label: "Business Registration Verified", isComplete: true },
];

export function VerificationStatusCard() {
    return (
        <div className="bg-white border border-[#F4F5F7] rounded-md px-4 py-6 space-y-5">
            <h3 className="text-[18px] text-[#1B1B1B]" style={{ ...TYPOGRAPHY.heading, fontWeight: 700 }}>
                Verification Status
            </h3>

            <div className="space-y-3">
                {COMPLIANCE_ITEMS.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-[#34C759] shrink-0" />
                        <span className="text-[14px] text-[#2C2C2C]" style={TYPOGRAPHY.body}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            <a
                href="#compliance-docs"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#B9C65B] hover:underline pt-2"
            >
                <span>View Compliance Docs</span>
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}