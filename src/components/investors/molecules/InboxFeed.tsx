"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { MessageSquare, CornerUpLeft, EyeOff, Eye } from 'lucide-react'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'

interface MessageItem {
    id: string
    author: {
        name: string
        avatarUrl: string
    }
    timeAgo: string
    visibility: 'Public' | 'Private'
    question: string
    reply?: string
}

const initialMessages: MessageItem[] = [
    {
        id: "1",
        author: {
            name: "Ahmed Lawal",
            avatarUrl: "/dashboard/User-Avatar.png"
        },
        timeAgo: "1h ago",
        visibility: "Private",
        question: "What are your projected returns for the next 24 months?"
    },
    {
        id: "2",
        author: {
            name: "Kemi Johnson",
            avatarUrl: "/dashboard/User-Avatar.png"
        },
        timeAgo: "3h ago",
        visibility: "Public",
        question: "Will there be a secondary market for these units?"
    },
    {
        id: "3",
        author: {
            name: "David Nnamdi",
            avatarUrl: "/dashboard/User-Avatar.png"
        },
        timeAgo: "3h ago",
        visibility: "Private",
        question: "What is the minimum investment amount for this offering?",
        reply: "The minimum investment is 10M."
    }
]

export function InboxFeed() {
    const [messages] = useState<MessageItem[]>(initialMessages)
    const [filter, setFilter] = useState<'All' | 'Unanswered' | 'Answered'>('All')

    const filteredMessages = messages.filter(msg => {
        if (filter === 'All') return true
        if (filter === 'Answered') return !!msg.reply
        if (filter === 'Unanswered') return !msg.reply
        return true
    })

    return (
        <div className="w-full bg-white rounded-md border border-[#F4F5F7] font-sans overflow-hidden">

            {/* Top Header Filter Bar */}
            <div className="flex items-center justify-between px-3 lg:px-6 py-2 lg:py-5 border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 lg:w-5 h-4 lg:h-5 text-[#A7B832]" />
                    <h2 className="text-[#0A1B33] text-[14px] lg:text-[16px] font-medium tracking-tight">Inbox</h2>
                    <span className="bg-[#A7B832] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        2 New
                    </span>
                </div>

                {/* Filter Navigation Tabs */}
                <div className="flex items-center gap-4 text-[12px] lg:text-sm font-medium">
                    {(['All', 'Unanswered', 'Answered'] as const).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`transition-colors cursor-pointer ${filter === type ? 'text-[#A7B832] font-semibold' : 'text-[#717171] hover:text-[#0A1B33]'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Messages Stream Feed Container */}
            <div className="divide-y divide-[#EAEAEA]">
                {filteredMessages.map((msg) => (
                    <div key={msg.id} className="p-6 space-y-2.5">

                        {/* Author Meta Row Section */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 relative rounded-full overflow-hidden bg-gray-100">
                                    <Image
                                        src={msg.author.avatarUrl}
                                        alt={msg.author.name}
                                        fill
                                        className="object-cover"
                                        sizes="44px"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-[#1B1B1B] text-[18px] font-medium tracking-tight">
                                        {msg.author.name}
                                    </h4>
                                    <p className="text-xs text-[#999999]">{msg.timeAgo}</p>
                                </div>
                            </div>

                            {/* Status Visibility Pill Indicator */}
                            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${msg.visibility === 'Public'
                                ? 'bg-[#EBF7EE] text-[#22C55E]'
                                : 'bg-[#F4F5F7] text-[#717171]'
                                }`}>
                                {msg.visibility === 'Public' ? (
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

                        {/* Question Message Context Text */}
                        <p className="text-base text-[#858585] font-normal leading-relaxed">
                            {msg.question}
                        </p>

                        {/* Action Buttons Frame Grid OR Reply Content Panel Box */}
                        {!msg.reply ? (
                            <div className="flex items-center gap-3 pt-1">
                                <OnboardingButton
                                    label='Respond'
                                    icon={<CornerUpLeft className="w-4 h-4 stroke-[2.5]" />}
                                    className='w-fit text-[14px] text-white font-normal my-0 border-[#EAEAEA] hover:border-[#042E27] rounded-md bg-[#A7B832]'
                                />

                                <OnboardingButton
                                    label='Mark as Private'
                                    variant='plain'
                                    className='w-fit text-[14px] font-normal my-0 border-[#EAEAEA] rounded-md'
                                />

                            </div>
                        ) : (
                            <div className="space-y-2.5 pt-1">
                                {/* Visual Answer Quote Callout Box */}
                                <div className="border-l-[4px] rounded-l-md border-[#A2B133] bg-[#F8F9FA] rounded-r-md p-4">
                                    <p className="text-sm md:text-base text-[#333333] font-normal">
                                        {msg.reply}
                                    </p>
                                </div>
                                <OnboardingButton
                                    label='Edit Reply'
                                    variant='plain'
                                    className='w-fit text-[14px] font-normal my-0 border-[#EAEAEA] rounded-md'
                                />
                            </div>
                        )}

                    </div>
                ))}

                {filteredMessages.length === 0 && (
                    <div className="p-12 text-center text-sm text-[#717171]">
                        No messages found matching this status filter view.
                    </div>
                )}
            </div>
        </div>
    )
}