"use client"

import React from 'react'
import { UploadCloud } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import { TYPOGRAPHY } from '@/constants/styles'

interface DocumentHeaderProps {
    onUploadClick?: () => void
}

export function DocumentHeader({ onUploadClick }: DocumentHeaderProps) {
    return (
        <div className="w-full bg-transparent py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans border-b border-[#F4F5F7] mb-6">

            {/* Title Block Framework */}
            <div className="space-y-1">
                <h1 className="text-[20px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Document Management
                </h1>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    Offering documents repository and status tracker.
                </p>
            </div>

            {/* Action CTA Block - Upload Button */}
            <div className="flex items-center">

                <OnboardingButton
                    label='Upload New Document'
                    icon={<UploadCloud className="w-4 h-4 text-white" />}
                    className='my-0 w-fit '
                    onClick={onUploadClick}
                />
            </div>

        </div>
    )
}