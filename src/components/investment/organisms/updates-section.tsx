import React from 'react'
import { UpdateItem } from '@/components/investment/molecules/update-item'
import type { OfferingUpdate } from '@/types/investment'

interface UpdatesSectionProps {
  updates: OfferingUpdate[]
}

function formatUpdateDate(isoDate: string): string {
  const date = new Date(isoDate)
  const now = new Date()
  const isToday =
    date.getUTCFullYear() === now.getUTCFullYear() &&
    date.getUTCMonth() === now.getUTCMonth() &&
    date.getUTCDate() === now.getUTCDate()

  if (isToday) {
    return 'Today'
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function UpdatesSection({ updates }: UpdatesSectionProps) {
  if (updates.length === 0) {
    return (
      <p className="text-muted-foreground font-dm-sans text-base">No updates yet.</p>
    )
  }

  return (
    <div
      className="flex flex-col items-start w-full relative"
      style={{ maxWidth: '816px', gap: '32px', paddingLeft: '120px' }}
    >
      <div
        className="absolute left-[120px] top-0 bottom-0"
        style={{ width: '1px', backgroundColor: '#EAEAEA' }}
      />

      {updates.map((update) => (
        <div key={update.id} className="w-full relative">
          <UpdateItem
            date={formatUpdateDate(update.publishedAt)}
            title={update.title}
            body={update.body}
            likeCount={update.likeCount}
          />
        </div>
      ))}
    </div>
  )
}
