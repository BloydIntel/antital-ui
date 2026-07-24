"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"
import type { FundraiserDocumentCategory } from "@/types/fundraiser-documents-api"

const CATEGORIES: FundraiserDocumentCategory[] = [
  "Core",
  "Financial",
  "Analytics",
  "Regulatory",
]

interface UploadDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isSubmitting?: boolean
  onSubmit: (input: {
    file: File
    title: string
    category: FundraiserDocumentCategory
  }) => void
}

export function UploadDocumentDialog({
  open,
  onOpenChange,
  isSubmitting = false,
  onSubmit,
}: UploadDocumentDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<FundraiserDocumentCategory>("Core")

  useEffect(() => {
    if (!open) {
      setFile(null)
      setTitle("")
      setCategory("Core")
    }
  }, [open])

  const handleFileChange = (next: File | null) => {
    setFile(next)
    if (next && !title.trim()) {
      setTitle(next.name)
    }
  }

  const canSubmit = Boolean(file && title.trim() && !isSubmitting)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload New Document</DialogTitle>
          <DialogDescription>
            Upload a PDF, Word, Excel, CSV, or image file for your offering.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <label className="block space-y-1.5 text-sm">
            <span className="text-[#505050]">File</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*"
              className="block w-full text-sm text-[#1B1B1B] file:mr-3 file:rounded-md file:border-0 file:bg-[#EFF4E4] file:px-3 file:py-2 file:text-sm file:font-medium"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
            />
          </label>

          <label className="block space-y-1.5 text-sm">
            <span className="text-[#505050]">Document title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-sm text-[#1B1B1B] outline-none focus:border-[#B9C65B]"
              placeholder="Offering Memorandum.pdf"
            />
          </label>

          <label className="block space-y-1.5 text-sm">
            <span className="text-[#505050]">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FundraiserDocumentCategory)}
              className="w-full rounded-lg border border-[#EAEAEA] bg-white px-3 py-2 text-sm text-[#1B1B1B] outline-none focus:border-[#B9C65B]"
            >
              {CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <OnboardingButton
            label="Cancel"
            variant="plain"
            className="my-0"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          />
          <OnboardingButton
            label={isSubmitting ? "Uploading..." : "Upload"}
            className="my-0"
            disabled={!canSubmit}
            onClick={() => {
              if (!file || !title.trim()) return
              onSubmit({ file, title: title.trim(), category })
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
