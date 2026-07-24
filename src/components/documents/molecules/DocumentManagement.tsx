"use client"

import React, { useMemo, useState } from "react"
import { ApplicationStatus } from "@/components/documents/molecules/ApplicationStatus"
import { DocumentSearchBar } from "@/components/documents/molecules/DocumentSearchBar"
import { DocumentTable, DocumentItem } from "@/components/documents/molecules/DocumentTable"

interface DocumentManagementProps {
  documents: DocumentItem[]
  isLoading?: boolean
  latestUpdatedLabel?: string | null
  onDownload?: (doc: DocumentItem) => void
}

export default function DocumentManagement({
  documents,
  isLoading = false,
  latestUpdatedLabel = null,
  onDownload,
}: DocumentManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocs = useMemo(
    () =>
      documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [documents, searchQuery]
  )

  return (
    <div className="w-full grid xl:grid-cols-8 gap-4 font-sans items-start">
      <div className="xl:col-span-2 w-full h-full">
        <ApplicationStatus />
      </div>

      <div className="xl:col-span-6 w-full min-w-0 bg-white border border-[#F4F5F7] rounded-xl p-4 flex flex-col justify-between">
        <div>
          <DocumentSearchBar value={searchQuery} onChange={setSearchQuery} />

          {isLoading ? (
            <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 text-sm text-[#505050]">
              Loading documents...
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="rounded-lg border border-[#EAEAEA] bg-[#FAFAFA] p-6 text-sm text-[#505050]">
              {searchQuery.trim()
                ? "No documents match your search."
                : "No documents uploaded yet."}
            </div>
          ) : (
            <DocumentTable documents={filteredDocs} onDownload={onDownload} />
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-[#999999] pt-4 mt-4">
          <span>Total {filteredDocs.length} Documents</span>
          <span>
            {latestUpdatedLabel ? `Updated ${latestUpdatedLabel}` : "—"}
          </span>
        </div>
      </div>
    </div>
  )
}
