import React from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'
import type { CorporateProfile, OfferingDocument } from '@/types/investment'

interface DocumentsSectionProps {
  documents: OfferingDocument[]
  corporateProfile?: CorporateProfile | null
}

export function DocumentsSection({ documents, corporateProfile }: DocumentsSectionProps) {
  const primaryDocument = documents[0]

  return (
    <div className="flex flex-col items-start w-full" style={{ maxWidth: '816px', gap: '32px' }}>
      <h2
        className="text-foreground"
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
        }}
      >
        Prospectus & Corporate Information
      </h2>

      {primaryDocument && (
        <div className="flex flex-col items-start w-full gap-4">
          <p className="w-full text-muted-foreground font-dm-sans text-base">
            Prospectus (Downloadable PDF): Full legal document outlining the investment instrument, company structure, and risk disclosures.
          </p>
          <Link
            href={primaryDocument.fileUrl}
            className="flex flex-row items-center justify-center gap-2 px-4 py-3 bg-white border border-[#A8A8A8] text-foreground rounded hover:bg-[#A7B832] hover:text-[#11110F] hover:border-[#A7B832] transition-colors font-dm-sans font-medium text-base"
          >
            <Download className="w-5 h-5" />
            <span>
              Download {primaryDocument.title}
              {primaryDocument.pageCount ? ` (${primaryDocument.pageCount} Pages)` : ''}
            </span>
          </Link>
        </div>
      )}

      {corporateProfile && (
        <p className="w-full text-muted-foreground font-dm-sans text-base">
          Corporate Information: {corporateProfile.entityType} in {corporateProfile.jurisdiction} ({corporateProfile.incorporationYear}). Registration ID: {corporateProfile.registrationId}.
          {corporateProfile.additionalNotes ? ` ${corporateProfile.additionalNotes}` : ''}
        </p>
      )}
    </div>
  )
}
