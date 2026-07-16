"use client"

import React from 'react'
import { Clock, Eye, ThumbsUp } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'

interface UpdateItem {
    id: string
    title: string
    content: string
    date: string
    views: number
    likes: number
}

interface PublishedUpdatesProps {
    updates?: UpdateItem[]
}

const defaultUpdates: UpdateItem[] = [
    {
        id: "1",
        title: "Minimum Threshold Reached 🎉",
        content: "We are thrilled to announce that we have successfully crossed our minimum funding threshold of 100M. Thank you to all our investors!",
        date: "Feb 10, 2025",
        views: 142,
        likes: 38,
    },
    {
        id: "2",
        title: "New Partnership Announcement",
        content: "We have signed a strategic partnership with a leading logistics firm to expand our distribution network across West Africa.",
        date: "Mar 22, 2025",
        views: 285,
        likes: 72,
    },
    {
        id: "3",
        title: "Campaign Launch",
        content: "Our Series A fundraising campaign is now live on Antital. We welcome all qualified investors to review our offering documents.",
        date: "Mar 22, 2025",
        views: 285,
        likes: 72,
    }
]

export function PublishedUpdates({ updates = defaultUpdates }: PublishedUpdatesProps) {
    return (
        <div className="w-full max-w-[620px] h-[517px] bg-white rounded-xl border border-[#F4F5F7] px-6 py-4">
            {/* Feed Header */}
            <h3 className="text-[#051635] text-[16px] tracking-tight pb-4 border-b border-[#F4F5F7]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                Published Updates
            </h3>

            {/* Updates Stream Container */}
            <div className="divide-y divide-[#F4F5F7]">
                {updates.map((update) => (
                    <div key={update.id} className="py-2 lg:py-6 first:pt-2 lg:first:pt-6 last:pb-0 space-y-2">
                        {/* Headline */}
                        <h4 className="text-[#1B1B1B] text-base tracking-tight" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                            {update.title}
                        </h4>

                        {/* Content Context Description */}
                        <p className="text-sm text-[#858585] leading-relaxed">
                            {update.content}
                        </p>

                        {/* Engagement Meta Row */}
                        <div className="flex items-center gap-5 pt-1 text-[#999999] text-xs font-normal">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
                                <span>{update.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Eye className="w-3.5 h-3.5 stroke-[1.75]" />
                                <span>{update.views} views</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sky-600 font-medium">
                                <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                                <span className="text-[#999999] font-normal">{update.likes} likes</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}