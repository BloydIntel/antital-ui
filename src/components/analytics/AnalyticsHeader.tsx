"use client"

import { FileText, Download } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'
import { OnboardingButton } from '../onboarding/molecules/OnboardingButton'

export function AnalyticsHeader() {

    return (
        <div className="w-full bg-transparent py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-sans border-b border-[#F4F5F7] mb-6">

            {/* Title and Description Labels */}
            <div className="space-y-1">

                <h1 className="text-[20px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Advanced Analytics
                </h1>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    Comprehensive campaign performance and performance insights.
                </p>

            </div>

            {/* Action Button Controls Toolbar */}
            <div className="flex items-center gap-3">

                {/* Export PDF Secondary Action Option Button */}

                <OnboardingButton
                    variant='plain'
                    label='Export PDF'
                    icon={<FileText className="w-4 h-4 text-[#333333]" />}
                    className='my-0 w-fit border-[#EAEAEA] text-[14px] font-normal bg-white'

                />

                <OnboardingButton
                    label='Export CSV'
                    icon={<Download className="w-4 h-4 text-white" />}
                    className='my-0 w-fit text-[14px] font-normal'

                />

            </div>

        </div>
    )
}