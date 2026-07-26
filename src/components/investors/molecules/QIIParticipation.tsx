"use client"

import React from 'react'
import { parseDateValue } from '@/lib/date'
import type { FundraiserQiiParticipationItem } from '@/types/fundraiser-investors-api'
import { RecordTableRowSkeleton } from '@/components/skeletons/table-skeletons'

interface QIIParticipationProps {
    records?: FundraiserQiiParticipationItem[]
    isLoading?: boolean
}

function formatCommitment(amount: number, currency: string) {
    const symbol = currency === 'NGN' || !currency ? '₦' : `${currency} `
    return `${symbol}${Math.round(amount).toLocaleString('en-NG')}`
}

function formatDate(value: string) {
    const date = parseDateValue(value)
    if (!date) return '—'
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

function toUiStatus(status: string): 'Confirmed' | 'Pending' {
    return status === 'confirmed' ? 'Confirmed' : 'Pending'
}

export function QIIParticipation({ records = [], isLoading = false }: QIIParticipationProps) {
    return (
        <div className="w-full bg-white rounded-md border border-[#F4F5F7] p-4 font-sans">
            <div className="mb-5 space-y-1">
                <h3 className="text-[#1A1A1A] text-[16px] font-medium tracking-tight">
                    QII Participation
                </h3>
                <p className="text-sm text-[#505050]">
                    Qualified Institutional Investors who have committed
                </p>
            </div>

            <div className="w-full overflow-x-auto rounded-md scrollbar-hide">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead>
                        <tr className="bg-[#EDF1D6] text-[#2D311B] font-medium">
                            <th className="py-3 px-4 rounded-l-lg font-semibold">Institution</th>
                            <th className="py-3 px-4 font-semibold">Type</th>
                            <th className="py-3 px-4 font-semibold">Commitment</th>
                            <th className="py-3 px-4 font-semibold">Date</th>
                            <th className="py-3 px-4 rounded-r-lg font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F4F5F7]">
                        {isLoading ? (
                            <RecordTableRowSkeleton />
                        ) : records.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 px-4 text-center text-[#717171]">
                                    No QII commitments yet.
                                </td>
                            </tr>
                        ) : (
                            records.map((record) => {
                                const uiStatus = toUiStatus(record.status)
                                const isPending = uiStatus === 'Pending'
                                return (
                                    <tr
                                        key={record.id}
                                        className={`transition-colors ${isPending ? 'bg-[#F4F5F7]/60' : 'hover:bg-gray-50/50'}`}
                                    >
                                        <td className={`py-4 px-4 font-medium text-[#2D311B] ${isPending ? 'rounded-l-lg' : ''}`}>
                                            {record.institution}
                                        </td>
                                        <td className="py-4 px-4 text-[#505050]">
                                            {record.type}
                                        </td>
                                        <td className="py-4 px-4 text-[#505050]">
                                            {formatCommitment(record.commitmentAmount, record.currency)}
                                        </td>
                                        <td className="py-4 px-4 text-[#505050]">
                                            {formatDate(record.committedAt)}
                                        </td>
                                        <td className={`py-4 px-4 ${isPending ? 'rounded-r-lg' : ''}`}>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`w-2 h-2 rounded-full shrink-0 ${isPending ? 'bg-[#D4A339]' : 'bg-[#22C55E]'
                                                        }`}
                                                />
                                                <span
                                                    className={`${isPending ? 'text-[#D4A339]' : 'text-[#22C55E]'
                                                        }`}
                                                >
                                                    {uiStatus}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
