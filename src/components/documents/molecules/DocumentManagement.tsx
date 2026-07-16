"use client"

import React, { useState } from 'react'
import { ApplicationStatus } from '@/components/documents/molecules/ApplicationStatus'
import { DocumentSearchBar } from '@/components/documents/molecules/DocumentSearchBar'
import { DocumentTable, DocumentItem } from '@/components/documents/molecules/DocumentTable'

export default function DocumentManagement() {
    const [searchQuery, setSearchQuery] = useState('')

    const mockDocuments: DocumentItem[] = [
        { name: "Offering Memorandum.Pdf", size: "2.4 MB", category: "Core", status: "Approved", lastUpdated: "Aug 16, 2025" },
        { name: "Financial Audit Report 2024.pdf", size: "5.1 MB", category: "Financial", status: "Approved", lastUpdated: "Jun 12, 2025" },
        { name: "Projected Valuation Model.xlsx", size: "1.2 MB", category: "Analytics", status: "Pending Approval", lastUpdated: "May 12, 2025" },
        { name: "Environmental Impact Study.pdf", size: "1.4 MB", category: "Analytics", status: "Pending Approval", lastUpdated: "May 12, 2025" },
        { name: "Offering Memorandum.Pdf", size: "8.4 MB", category: "Regulatory", status: "Revision Requested", lastUpdated: "Feb 08, 2025" },
    ]

    // Filter list matching active search queries inputs
    const filteredDocs = mockDocuments.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="w-full grid xl:grid-cols-8 gap-4 font-sans items-start">

            {/* Left-hand Tracker Column Module component mount */}
            <div className='xl:col-span-2 w-full h-full'>
                <ApplicationStatus onRespondToQueries={() => console.log("Routing query dashboard overlay...")} />
            </div>

            <div className="xl:col-span-6 w-full min-w-0 bg-white border border-[#F4F5F7] rounded-xl p-4 flex flex-col justify-between">

                <div>
                    <DocumentSearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onHistoryClick={() => console.log("Displaying file event streams logs...")}
                    />
                    <DocumentTable
                        documents={filteredDocs}
                        onDownload={(doc) => console.log(`Triggering direct asset system fetching stream pipeline for: ${doc.name}`)}
                    />
                </div>

                {/* Dynamic Structural Summary Table Info Footer Module metadata line */}
                <div className="flex items-center justify-between text-xs text-[#999999] pt-4 mt-4">
                    <span>Total {filteredDocs.length} Documents</span>
                    <span>Updated 2 Hours Ago</span>
                </div>

            </div>

        </div>
    )
}