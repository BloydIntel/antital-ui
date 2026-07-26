import React from 'react'
import { UpdateItem } from '@/components/investment/molecules/update-item'
import { parseDateValue } from '@/lib/date'
import type { OfferingUpdate } from '@/types/investment'

interface UpdatesSectionProps {
  updates: OfferingUpdate[]
}

function formatUpdateDate(isoDate: string): string {
  const date = parseDateValue(isoDate)
  if (!date) {
    return isoDate
  }
  const now = new Date()
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()

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
      className="flex flex-col items-start w-full relative pl-4 lg:pl-[120px] gap-8"
      style={{ maxWidth: '816px' }}
    >
      <div
        className="hidden lg:block absolute left-[120px] top-0 bottom-0 w-px bg-[#EAEAEA]"
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
  );
}
