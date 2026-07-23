"use client"

import React from 'react'
import { Clock, ThumbsUp } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'

interface UpdateItem {
    id: string
    title: string
    content: string
    date: string
    likes: number
    status?: 'draft' | 'published'
}

interface PublishedUpdatesProps {
    updates?: UpdateItem[]
    isLoading?: boolean
}

export function PublishedUpdates({ updates = [], isLoading = false }: PublishedUpdatesProps) {
    return (
        <div className="w-full max-w-[620px] h-[517px] bg-white rounded-xl border border-[#F4F5F7] px-6 py-4 overflow-y-auto">
            <h3 className="text-[#051635] text-[16px] tracking-tight pb-4 border-b border-[#F4F5F7]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                Campaign Updates
            </h3>

            {isLoading ? (
                <p className="pt-6 text-sm text-[#858585]">Loading updates...</p>
            ) : updates.length === 0 ? (
                <p className="pt-6 text-sm text-[#858585]">No updates yet. Publish your first campaign update.</p>
            ) : (
                <div className="divide-y divide-[#F4F5F7]">
                    {updates.map((update) => (
                        <div key={update.id} className="py-2 lg:py-6 first:pt-2 lg:first:pt-6 last:pb-0 space-y-2">
                            <div className="flex items-center gap-2">
                                <h4 className="text-[#1B1B1B] text-base tracking-tight" style={{ ...TYPOGRAPHY.body, fontWeight: 500 }}>
                                    {update.title}
                                </h4>
                                {update.status === 'draft' ? (
                                    <span className="rounded-sm bg-[#F4F5F7] px-2 py-0.5 text-[11px] uppercase tracking-wide text-[#666666]">
                                        Draft
                                    </span>
                                ) : null}
                            </div>

                            <p className="text-sm text-[#858585] leading-relaxed">
                                {update.content}
                            </p>

                            <div className="flex items-center gap-5 pt-1 text-[#999999] text-xs font-normal">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 stroke-[1.75]" />
                                    <span>{update.date}</span>
                                </div>
                                {update.status !== 'draft' ? (
                                    <div className="flex items-center gap-1.5 text-sky-600 font-medium">
                                        <ThumbsUp className="w-3.5 h-3.5 fill-current" />
                                        <span className="text-[#999999] font-normal">{update.likes} likes</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
