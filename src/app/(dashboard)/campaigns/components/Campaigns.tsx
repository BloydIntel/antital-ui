import { CampaignSharingTools } from '@/components/campaigns/molecules/CampaignSharingTools'
import { CreateUpdateForm } from '@/components/campaigns/molecules/CreateUpdateForm'
import { OfferingPagePreview } from '@/components/campaigns/molecules/OfferingPagePreview'
import { PublishedUpdates } from '@/components/campaigns/molecules/PublishedUpdates'
import { TYPOGRAPHY } from '@/constants/styles'
import React from 'react'

export default function Campaign() {
    return (
        <div>
            <div>
                <h1 className="text-[24px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Campaign Preview, Sharing & Updates
                </h1>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    View your offering page and manage shareable links
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <OfferingPagePreview />
                <CampaignSharingTools />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <CreateUpdateForm />
                <PublishedUpdates />
            </div>
        </div>
    )
}
