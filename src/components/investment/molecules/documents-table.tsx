import React from 'react'
import Link from 'next/link'

interface DocumentItem {
  title: string
  description: string
  action: {
    type: 'link' | 'text' | 'empty'
    label?: string
    href?: string
  }
}

export function DocumentsTable() {
  const documents: DocumentItem[] = [
    {
      title: 'Official Prospectus',
      description: 'The complete legal document detailing the offering, terms, and full risk disclosure.',
      action: {
        type: 'link',
        label: 'Download PDF',
        href: '#',
      },
    },
    {
      title: 'Full Business Plan',
      description: '5-year operational roadmap, detailed competitive analysis, and Go-to-Market strategy',
      action: {
        type: 'link',
        label: 'Download PDF',
        href: '#',
      },
    },
    {
      title: 'Financial Model (XLSX)',
      description: 'Interactive spreadsheet model showing assumptions for revenue and cost projections.',
      action: {
        type: 'link',
        label: 'Download XLSX',
        href: '#',
      },
    },
    {
      title: 'Corporate Status',
      description: 'Incorporated in Delaware, USA (C-Corp) in 2023',
      action: {
        type: 'text',
        label: 'Registration ID: NEX-AI-700421',
      },
    },
    {
      title: 'Previous Series',
      description: 'Pre-Seed Round: Closed Q1 2023. Total Raised: ₦750,000,000 from Angel Investors.',
      action: {
        type: 'empty',
      },
    },
  ]

  return (
    <div className="w-full overflow-x-auto" style={{ maxWidth: '816px' }}>
      <table
        className="w-full"
        style={{
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: '1px solid #EAEAEA',
            }}
          >
            <th
              className="text-left py-3 px-4 text-muted-foreground"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              Document Title
            </th>
            <th
              className="text-left py-3 px-4 text-muted-foreground"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              Description
            </th>
            <th
              className="text-left py-3 px-4 text-muted-foreground"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '-0.01em',
              }}
            >
              Action/Link
            </th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index < documents.length - 1 ? '1px solid #EAEAEA' : 'none',
              }}
            >
              <td
                className="py-3 px-4 text-foreground"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  verticalAlign: 'top',
                }}
              >
                {doc.title}
              </td>
              <td
                className="py-3 px-4 text-foreground"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  verticalAlign: 'top',
                }}
              >
                {doc.description}
              </td>
              <td
                className="py-3 px-4 text-foreground"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  verticalAlign: 'top',
                }}
              >
                {doc.action.type === 'link' && doc.action.href && (
                  <Link
                    href={doc.action.href}
                    className="text-[#7A6FF0] hover:underline"
                    style={{
                      fontFamily: 'var(--font-dm-sans)',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '21px',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {doc.action.label}
                  </Link>
                )}
                {doc.action.type === 'text' && (
                  <span>{doc.action.label}</span>
                )}
                {doc.action.type === 'empty' && <span></span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

