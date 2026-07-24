"use client"

import React from 'react'
import { FileText, Download } from 'lucide-react'

export interface DocumentItem {
    id: number
    name: string
    size: string
    category: string
    status: 'Approved' | 'Pending Approval' | 'Revision Requested'
    lastUpdated: string
    fileUrl: string
}

interface DocumentTableProps {
    documents: DocumentItem[]
    onDownload?: (doc: DocumentItem) => void
}

export function DocumentTable({ documents, onDownload }: DocumentTableProps) {

    const getStatusStyles = (status: DocumentItem['status']) => {
        switch (status) {
            case 'Approved':
                return { text: 'text-[#22C55E]', dot: 'bg-[#22C55E]' }
            case 'Pending Approval':
                return { text: 'text-[#D97706]', dot: 'bg-[#D97706]' }
            case 'Revision Requested':
                return { text: 'text-[#EF4444]', dot: 'bg-[#EF4444]' }
            default:
                return { text: 'text-[#717171]', dot: 'bg-[#D1D5DB]' }
        }
    }

    return (
        /* The container handles the responsive horizontal scroll layout */
        <div className="w-full overflow-x-auto scrollbar-hide">
            {/* Setting a min-width ensures the table forces horizontal scrolling on narrow screens */}
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">

                {/* Table Headers Column Setup */}
                <thead>
                    <tr className="border-b border-[#EAEAEA] text-[#999999] font-medium text-xs">
                        <th className="pb-3 font-normal">Document Name</th>
                        <th className="pb-3 font-normal">Category</th>
                        <th className="pb-3 font-normal">Status</th>
                        <th className="pb-3 font-normal">Last Updated</th>
                        <th className="pb-3 font-normal text-right">Action</th>
                    </tr>
                </thead>

                {/* Data Rows Iterator Stack Block */}
                <tbody className="divide-y divide-[#F2F2F2]">
                    {documents.map((doc) => {
                        const statusStyle = getStatusStyles(doc.status)
                        const isDownloadDisabled = !onDownload

                        return (
                            <tr key={doc.id} className="hover:bg-[#F9FAFB]/50 transition-colors">

                                {/* File Details Identity Meta Cell */}
                                <td className="py-1.5 pr-4 flex items-center gap-3">
                                    <div className="w-9 h-9 bg-[#EFF4E4] rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-4 h-4 text-[#3B82F6]" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="font-medium text-[#1B1B1B] block max-w-xs truncate">{doc.name}</span>
                                        <span className="text-xs text-[#999999] block">{doc.size}</span>
                                    </div>
                                </td>

                                {/* File Section Classification Tab */}
                                <td className="py-1.5 pr-4 text-[#717171] font-normal">
                                    {doc.category}
                                </td>

                                {/* Operational Progress Badge Status Pillar */}
                                <td className="py-1.5 pr-4 font-medium">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle?.dot}`} />
                                        <span className={statusStyle?.text}>{doc.status}</span>
                                    </div>
                                </td>

                                {/* Dynamic Updated Time Marker */}
                                <td className="py-1.5 pr-4 text-[#717171]">
                                    {doc.lastUpdated}
                                </td>

                                {/* Row Command Anchor Triggers */}
                                <td className="py-1.5 text-right">
                                    <button
                                        type="button"
                                        onClick={() => onDownload?.(doc)}
                                        disabled={isDownloadDisabled}
                                        aria-label={`Download ${doc.name}`}
                                        className="p-2 text-[#1B1B1B] rounded-lg transition-colors cursor-pointer hover:bg-[#EFF4E4] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                                    >
                                        <Download className="w-4 h-4" aria-hidden="true" />
                                    </button>
                                </td>

                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}