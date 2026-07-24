"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { MessageSquare, CornerUpLeft, EyeOff, Eye } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'
import type { FundraiserInvestorMessage } from '@/types/fundraiser-investors-api'
import { InboxFeedSkeleton } from '@/components/skeletons/table-skeletons'

type MessageFilter = 'All' | 'Unanswered' | 'Answered'

interface InboxFeedProps {
    messages?: FundraiserInvestorMessage[]
    newCount?: number
    isLoading?: boolean
    isSubmitting?: boolean
    filter?: MessageFilter
    onFilterChange?: (filter: MessageFilter) => void
    onReply?: (messageId: number, reply: string) => void
    onMarkPrivate?: (messageId: number) => void
}

function formatTimeAgo(value: string) {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    const diffMs = Date.now() - date.getTime()
    const minutes = Math.max(1, Math.round(diffMs / 60_000))
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.round(minutes / 60)
    if (hours < 48) return `${hours}h ago`
    const days = Math.round(hours / 24)
    return `${days}d ago`
}

export function InboxFeed({
    messages = [],
    newCount = 0,
    isLoading = false,
    isSubmitting = false,
    filter = 'All',
    onFilterChange,
    onReply,
    onMarkPrivate,
}: InboxFeedProps) {
    const [composingId, setComposingId] = useState<number | null>(null)
    const [draftReply, setDraftReply] = useState('')

    const startCompose = (messageId: number, existingReply?: string | null) => {
        setComposingId(messageId)
        setDraftReply(existingReply ?? '')
    }

    const cancelCompose = () => {
        setComposingId(null)
        setDraftReply('')
    }

    const submitReply = (messageId: number) => {
        const reply = draftReply.trim()
        if (!reply || !onReply) return
        onReply(messageId, reply)
        cancelCompose()
    }

    return (
        <div className="w-full bg-white rounded-md border border-[#F4F5F7] font-sans overflow-hidden">
            <div className="flex items-center justify-between px-3 lg:px-6 py-2 lg:py-5 border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 lg:w-5 h-4 lg:h-5 text-[#A7B832]" />
                    <h2 className="text-[#0A1B33] text-[14px] lg:text-[16px] font-medium tracking-tight">Inbox</h2>
                    {newCount > 0 && (
                        <span className="bg-[#A7B832] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {newCount} New
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-4 text-[12px] lg:text-sm font-medium">
                    {(['All', 'Unanswered', 'Answered'] as const).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => onFilterChange?.(type)}
                            className={`transition-colors cursor-pointer ${filter === type ? 'text-[#A7B832] font-semibold' : 'text-[#717171] hover:text-[#0A1B33]'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="divide-y divide-[#EAEAEA]">
                {isLoading ? (
                    <InboxFeedSkeleton />
                ) : messages.length === 0 ? (
                    <div className="p-12 text-center text-sm text-[#717171]">
                        No messages found matching this status filter view.
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isComposing = composingId === msg.id
                        const avatarUrl = msg.author.avatarUrl || '/dashboard/User-Avatar.png'

                        return (
                            <div key={msg.id} className="p-6 space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-11 h-11 relative rounded-full overflow-hidden bg-gray-100">
                                            <Image
                                                src={avatarUrl}
                                                alt={msg.author.displayName}
                                                fill
                                                className="object-cover"
                                                sizes="44px"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-[#1B1B1B] text-[18px] font-medium tracking-tight">
                                                {msg.author.displayName}
                                            </h4>
                                            <p className="text-xs text-[#999999]">{formatTimeAgo(msg.askedAt)}</p>
                                        </div>
                                    </div>

                                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${msg.visibility === 'public'
                                        ? 'bg-[#EBF7EE] text-[#22C55E]'
                                        : 'bg-[#F4F5F7] text-[#717171]'
                                        }`}>
                                        {msg.visibility === 'public' ? (
                                            <>
                                                <Eye className="w-3.5 h-3.5" />
                                                <span>Public</span>
                                            </>
                                        ) : (
                                            <>
                                                <EyeOff className="w-3.5 h-3.5" />
                                                <span>Private</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <p className="text-base text-[#858585] font-normal leading-relaxed">
                                    {msg.question}
                                </p>

                                {isComposing ? (
                                    <div className="space-y-3 pt-1">
                                        <textarea
                                            value={draftReply}
                                            onChange={(e) => setDraftReply(e.target.value)}
                                            rows={3}
                                            placeholder="Write your reply..."
                                            className="w-full rounded-md border border-[#EAEAEA] p-3 text-sm text-[#333333] outline-none focus:border-[#A7B832]"
                                            disabled={isSubmitting}
                                        />
                                        <div className="flex items-center gap-3">
                                            <OnboardingButton
                                                label="Send Reply"
                                                loading={isSubmitting}
                                                disabled={isSubmitting || !draftReply.trim()}
                                                onClick={() => submitReply(msg.id)}
                                                className="w-fit text-[14px] text-white font-normal my-0 border-[#EAEAEA] hover:border-[#042E27] rounded-md bg-[#A7B832]"
                                            />
                                            <OnboardingButton
                                                label="Cancel"
                                                variant="plain"
                                                disabled={isSubmitting}
                                                onClick={cancelCompose}
                                                className="w-fit text-[14px] font-normal my-0 border-[#EAEAEA] rounded-md"
                                            />
                                        </div>
                                    </div>
                                ) : !msg.reply ? (
                                    <div className="flex items-center gap-3 pt-1">
                                        <OnboardingButton
                                            label="Respond"
                                            icon={<CornerUpLeft className="w-4 h-4 stroke-[2.5]" />}
                                            disabled={isSubmitting}
                                            onClick={() => startCompose(msg.id)}
                                            className="w-fit text-[14px] text-white font-normal my-0 border-[#EAEAEA] hover:border-[#042E27] rounded-md bg-[#A7B832]"
                                        />

                                        {msg.visibility === 'public' && (
                                            <OnboardingButton
                                                label="Mark as Private"
                                                variant="plain"
                                                disabled={isSubmitting}
                                                onClick={() => onMarkPrivate?.(msg.id)}
                                                className="w-fit text-[14px] font-normal my-0 border-[#EAEAEA] rounded-md"
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-2.5 pt-1">
                                        <div className="border-l-[4px] rounded-l-md border-[#A2B133] bg-[#F8F9FA] rounded-r-md p-4">
                                            <p className="text-sm md:text-base text-[#333333] font-normal">
                                                {msg.reply}
                                            </p>
                                        </div>
                                        <OnboardingButton
                                            label="Edit Reply"
                                            variant="plain"
                                            disabled={isSubmitting}
                                            onClick={() => startCompose(msg.id, msg.reply)}
                                            className="w-fit text-[14px] font-normal my-0 border-[#EAEAEA] rounded-md"
                                        />
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
