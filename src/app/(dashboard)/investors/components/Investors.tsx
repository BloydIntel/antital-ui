"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { InboxFeed } from '@/components/investors/molecules/InboxFeed'
import { QIIParticipation } from '@/components/investors/molecules/QIIParticipation'
import { ResponseAnalytics } from '@/components/investors/molecules/ResponseAnalytics'
import { TYPOGRAPHY } from '@/constants/styles'
import {
    useFundraiserInvestorAnalytics,
    useFundraiserInvestorMessages,
    useFundraiserQiiParticipation,
    useReplyFundraiserInvestorMessage,
    useUpdateFundraiserInvestorMessage,
} from '@/hooks/use-fundraiser-investors'
import { showApiErrorToast } from '@/lib/error-feedback'

type MessageFilter = 'All' | 'Unanswered' | 'Answered'

function toApiStatus(filter: MessageFilter): 'all' | 'answered' | 'unanswered' {
    if (filter === 'Answered') return 'answered'
    if (filter === 'Unanswered') return 'unanswered'
    return 'all'
}

export default function Investors() {
    const [filter, setFilter] = useState<MessageFilter>('All')
    const apiStatus = toApiStatus(filter)

    const qiiQuery = useFundraiserQiiParticipation()
    const messagesQuery = useFundraiserInvestorMessages(apiStatus)
    const analyticsQuery = useFundraiserInvestorAnalytics()
    const replyMutation = useReplyFundraiserInvestorMessage()
    const updateMutation = useUpdateFundraiserInvestorMessage()

    const messages = useMemo(() => messagesQuery.data?.items ?? [], [messagesQuery.data?.items])
    const qiiRecords = useMemo(() => qiiQuery.data?.items ?? [], [qiiQuery.data?.items])
    const isSubmitting = replyMutation.isPending || updateMutation.isPending

    useEffect(() => {
        if (qiiQuery.isError) {
            showApiErrorToast(qiiQuery.error, 'Unable to load QII participation.')
        }
    }, [qiiQuery.isError, qiiQuery.error])

    useEffect(() => {
        if (messagesQuery.isError) {
            showApiErrorToast(messagesQuery.error, 'Unable to load investor inbox.')
        }
    }, [messagesQuery.isError, messagesQuery.error])

    useEffect(() => {
        if (analyticsQuery.isError) {
            showApiErrorToast(analyticsQuery.error, 'Unable to load response metrics.')
        }
    }, [analyticsQuery.isError, analyticsQuery.error])

    return (
        <div>
            <div>
                <h1 className="text-[20px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Investors
                </h1>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    Interact with investors
                </p>
            </div>

            <div className="pt-6">
                <QIIParticipation records={qiiRecords} isLoading={qiiQuery.isLoading} />
            </div>

            <div className="pt-6 grid lg:grid-cols-12 gap-4">
                <div className="order-last lg:order-0 lg:col-span-8">
                    <InboxFeed
                        messages={messages}
                        newCount={messagesQuery.data?.newCount ?? 0}
                        isLoading={messagesQuery.isLoading}
                        isSubmitting={isSubmitting}
                        filter={filter}
                        onFilterChange={setFilter}
                        onReply={(messageId, reply) => {
                            const existing = messages.find((m) => m.id === messageId)
                            if (existing?.reply) {
                                updateMutation.mutate({
                                    messageId,
                                    payload: { reply },
                                })
                            } else {
                                replyMutation.mutate({
                                    messageId,
                                    payload: { reply },
                                })
                            }
                        }}
                        onMarkPrivate={(messageId) => {
                            updateMutation.mutate({
                                messageId,
                                payload: { visibility: 'private' },
                            })
                        }}
                    />
                </div>

                <div className="order-first lg:order-0 lg:col-span-4">
                    <ResponseAnalytics
                        responseRate={analyticsQuery.data?.responseRate ?? 0}
                        averageResponseTimeHours={analyticsQuery.data?.averageResponseTimeHours ?? null}
                        isLoading={analyticsQuery.isLoading}
                    />
                </div>
            </div>
        </div>
    )
}
