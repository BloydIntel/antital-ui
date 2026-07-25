"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { CampaignSharingTools } from '@/components/campaigns/molecules/CampaignSharingTools'
import { CreateUpdateForm } from '@/components/campaigns/molecules/CreateUpdateForm'
import { OfferingPagePreview } from '@/components/campaigns/molecules/OfferingPagePreview'
import { PublishedUpdates } from '@/components/campaigns/molecules/PublishedUpdates'
import { TYPOGRAPHY } from '@/constants/styles'
import {
    useCreateFundraiserCampaignUpdate,
    useFundraiserCampaign,
    useFundraiserCampaignUpdates,
} from '@/hooks/use-fundraiser-campaign'
import { showApiErrorToast } from '@/lib/error-feedback'
import { CampaignPageSkeleton } from '@/components/skeletons/campaign-skeletons'

function buildAbsoluteShareUrl(publicPath: string | null | undefined, slug: string | null | undefined) {
    if (typeof window === 'undefined') {
        return publicPath ? publicPath : slug ? `/explore/${slug}` : ''
    }
    const path = publicPath || (slug ? `/explore/${slug}` : '')
    if (!path) return ''
    return `${window.location.origin}${path}`
}

function formatUpdateDate(value: string | null) {
    if (!value) return 'Draft'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return 'Draft'
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

export default function Campaign() {
    const [formResetToken, setFormResetToken] = useState(0)
    const campaignQuery = useFundraiserCampaign()
    const updatesQuery = useFundraiserCampaignUpdates('all', Boolean(campaignQuery.data?.offeringId))
    const createUpdate = useCreateFundraiserCampaignUpdate()

    const campaign = campaignQuery.data
    const hasOffering = Boolean(campaign?.offeringId && campaign.offeringSlug)
    const shareUrl = useMemo(
        () => buildAbsoluteShareUrl(campaign?.publicPath, campaign?.offeringSlug),
        [campaign?.publicPath, campaign?.offeringSlug]
    )

    const listedUpdates = useMemo(() => {
        const items = updatesQuery.data?.items ?? []
        return items.map((item) => ({
            id: String(item.id),
            title: item.title,
            content: item.body,
            date: formatUpdateDate(item.publishedAt),
            likes: item.likeCount,
            status: item.status,
        }))
    }, [updatesQuery.data?.items])

    useEffect(() => {
        if (campaignQuery.isError) {
            showApiErrorToast(campaignQuery.error, 'Unable to load campaign.')
        }
    }, [campaignQuery.isError, campaignQuery.error])

    useEffect(() => {
        if (updatesQuery.isError) {
            showApiErrorToast(updatesQuery.error, 'Unable to load campaign updates.')
        }
    }, [updatesQuery.isError, updatesQuery.error])

    const handleCreate = (data: { title: string; content: string }, publish: boolean) => {
        if (!hasOffering) {
            toast.error('No owned campaign available to update.')
            return
        }
        if (!data.title.trim() || !data.content.trim()) {
            toast.error('Title and content are required.')
            return
        }
        createUpdate.mutate(
            {
                title: data.title.trim(),
                body: data.content.trim(),
                publish,
            },
            {
                onSuccess: () => setFormResetToken((token) => token + 1),
            }
        )
    }

    return (
        <div>
            <div>
                <h1 className="text-[20px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Campaign Preview, Sharing & Updates
                </h1>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    View your offering page and manage shareable links
                </p>
            </div>

            {campaignQuery.isLoading ? (
                <CampaignPageSkeleton />
            ) : !hasOffering ? (
                <div className="mt-6 rounded-xl border border-[#EAEAEA] bg-white p-6 text-sm text-[#505050]">
                    No owned campaign found yet. Publish an offering to preview, share, and post updates.
                </div>
            ) : (
                <>
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <OfferingPagePreview idOrSlug={campaign!.offeringSlug!} />
                        <CampaignSharingTools shareUrl={shareUrl} />
                    </div>

                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <CreateUpdateForm
                            isSubmitting={createUpdate.isPending}
                            resetToken={formResetToken}
                            onPublish={(data) => handleCreate(data, true)}
                            onSaveDraft={(data) => handleCreate(data, false)}
                        />
                        <PublishedUpdates
                            isLoading={updatesQuery.isLoading}
                            updates={listedUpdates}
                        />
                    </div>
                </>
            )}
        </div>
    )
}
