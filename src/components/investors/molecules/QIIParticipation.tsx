"use client"

import React from 'react'

interface InvestorRecord {
    id: string
    institution: string
    type: string
    commitment: string
    date: string
    status: 'Confirmed' | 'Pending'
}

interface QIIParticipationProps {
    records?: InvestorRecord[]
}

const defaultRecords: InvestorRecord[] = [
    {
        id: "1",
        institution: "Stanbic IBTC Asset Mgmt",
        type: "Asset Manager",
        commitment: "₦40,000,000",
        date: "Jan 15, 2025",
        status: "Confirmed",
    },
    {
        id: "2",
        institution: "Coronation Merchant Bank",
        type: "Merchant Bank",
        commitment: "₦25,000,000",
        date: "Jan 22, 2025",
        status: "Confirmed",
    },
    {
        id: "3",
        institution: "ARM Investment Managers",
        type: "Fund Manager",
        commitment: "₦18,500,000",
        date: "Feb 3, 2025",
        status: "Pending",
    }
]

export function QIIParticipation({ records = defaultRecords }: QIIParticipationProps) {
    return (
        <div className="w-full bg-white rounded-md border border-[#F4F5F7] p-4 font-sans">
            {/* Header Block */}
            <div className="mb-5 space-y-1">
                <h3 className="text-[#1A1A1A] text-[16px] font-medium tracking-tight">
                    QII Participation
                </h3>
                <p className="text-sm text-[#505050]">
                    Qualified Institutional Investors who have committed
                </p>
            </div>

            {/* Table Window Container */}
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
                        {records.map((record) => {
                            const isPending = record.status === 'Pending';
                            return (
                                <tr
                                    key={record.id}
                                    className={`transition-colors ${isPending ? 'bg-[#F4F5F7]/60' : 'hover:bg-gray-50/50'}`}
                                >
                                    {/* Institution Title */}
                                    <td className={`py-4 px-4 font-medium text-[#2D311B] ${isPending ? 'rounded-l-lg' : ''}`}>
                                        {record.institution}
                                    </td>

                                    {/* Entity Classification */}
                                    <td className="py-4 px-4 text-[#505050]">
                                        {record.type}
                                    </td>

                                    {/* Hard Financial Commitment */}
                                    <td className="py-4 px-4 text-[#505050]">
                                        {record.commitment}
                                    </td>

                                    {/* Logged Date */}
                                    <td className="py-4 px-4 text-[#505050]">
                                        {record.date}
                                    </td>

                                    {/* Custom Validation Indicator Pill */}
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
                                                {record.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}