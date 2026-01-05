import React from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'

export function DocumentsSection() {
  return (
    <div
      className="flex flex-col items-start w-full"
      style={{
        maxWidth: '816px',
        gap: '32px',
      }}
    >
      {/* Section Heading */}
      <h2
        style={{
          fontFamily: 'var(--font-rethink-sans)',
          fontWeight: 500,
          fontSize: '36px',
          lineHeight: '43px',
          letterSpacing: '-0.01em',
          color: '#2C2C2C',
        }}
      >
        Prospectus & Corporate Information
      </h2>

      {/* Prospectus Information */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          gap: '16px',
        }}
      >
        <p
          className="w-full"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
            color: '#505050',
          }}
        >
          Prospectus (Downloadable PDF): Full legal document outlining the investment instrument, company structure, and risk disclosures.
        </p>

        {/* Download Button */}
        <Link
          href="#"
          className="flex flex-row items-center justify-center gap-2 px-4 py-3 bg-white border border-[#A8A8A8] text-foreground rounded hover:bg-[#A7B832] hover:text-[#11110F] hover:border-[#A7B832] transition-colors"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
            minWidth: 'fit-content',
          }}
        >
          <Download className="w-5 h-5" />
          <span>Download the Official Prospectus & Financial Model (45 Pages)</span>
        </Link>
      </div>

      {/* Corporate Information */}
      <div
        className="flex flex-col items-start w-full"
        style={{
          gap: '8px',
        }}
      >
        <p
          className="w-full"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '21px',
            letterSpacing: '0.01em',
            color: '#505050',
          }}
        >
          Corporate Information: Incorporated in Lagos, Nigeria (C-Corp) in 2024. Primary Jurisdiction: Nigeria. Corporate Registration ID: NEX-NG-800532.
        </p>
      </div>
    </div>
  )
}

