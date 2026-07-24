"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { DocumentHeader } from "@/components/documents/molecules/DocumentHeader"
import DocumentManagement from "@/components/documents/molecules/DocumentManagement"
import { UploadDocumentDialog } from "@/components/documents/molecules/UploadDocumentDialog"
import {
  useFundraiserDocuments,
  useUploadFundraiserDocument,
} from "@/hooks/use-fundraiser-documents"
import { showApiErrorToast } from "@/lib/error-feedback"
import type { DocumentItem } from "@/components/documents/molecules/DocumentTable"
import type { FundraiserDocumentStatus } from "@/types/fundraiser-documents-api"

function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "—"
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "—"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function toStatus(value: string): FundraiserDocumentStatus {
  if (
    value === "Approved" ||
    value === "Pending Approval" ||
    value === "Revision Requested"
  ) {
    return value
  }
  return "Pending Approval"
}

export default function Documents() {
  const [uploadOpen, setUploadOpen] = useState(false)
  const documentsQuery = useFundraiserDocuments()
  const uploadMutation = useUploadFundraiserDocument()

  const data = documentsQuery.data
  const hasOffering = Boolean(data?.offeringId)
  const isLoading = documentsQuery.isLoading

  useEffect(() => {
    if (documentsQuery.isError) {
      showApiErrorToast(documentsQuery.error, "Unable to load documents.")
    }
  }, [documentsQuery.isError, documentsQuery.error])

  const documents: DocumentItem[] = useMemo(() => {
    return (data?.items ?? []).map((item) => ({
      id: item.id,
      name: item.title,
      size: formatFileSize(item.fileSizeBytes),
      category: item.category,
      status: toStatus(item.status),
      lastUpdated: formatDate(item.lastUpdatedAt),
      fileUrl: item.fileUrl,
    }))
  }, [data?.items])

  const latestUpdatedLabel = useMemo(() => {
    if (!data?.items?.length) return null
    const latest = data.items.reduce((max, item) => {
      const ts = new Date(item.lastUpdatedAt).getTime()
      return Number.isNaN(ts) ? max : Math.max(max, ts)
    }, 0)
    if (!latest) return null
    return formatDate(new Date(latest).toISOString())
  }, [data?.items])

  const handleDownload = (doc: DocumentItem) => {
    if (!doc.fileUrl) {
      toast.error("Download link unavailable.")
      return
    }
    window.open(doc.fileUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div>
      <DocumentHeader
        onUploadClick={
          hasOffering && !uploadMutation.isPending
            ? () => setUploadOpen(true)
            : undefined
        }
      />

      {!isLoading && data && !hasOffering ? (
        <div className="mb-6 rounded-xl border border-[#EAEAEA] bg-white p-6 text-sm text-[#505050]">
          No owned campaign found yet. Documents will appear once your offering is published.
        </div>
      ) : null}

      <DocumentManagement
        documents={documents}
        isLoading={isLoading}
        latestUpdatedLabel={latestUpdatedLabel}
        onDownload={handleDownload}
      />

      <UploadDocumentDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        isSubmitting={uploadMutation.isPending}
        onSubmit={({ file, title, category }) => {
          uploadMutation.mutate(
            { file, title, category },
            {
              onSuccess: () => setUploadOpen(false),
            }
          )
        }}
      />
    </div>
  )
}
