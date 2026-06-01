'use client'

import { notFound } from 'next/navigation'
import { InvestmentDetailPageContent } from './investment-detail-page-content'
import { useInvestmentDetail } from '@/hooks/use-investment-detail'

interface InvestmentDetailPageClientProps {
  idOrSlug: string
}

export function InvestmentDetailPageClient({ idOrSlug }: InvestmentDetailPageClientProps) {
  const { data, isLoading, isError } = useInvestmentDetail(idOrSlug)

  if (isLoading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 py-24 text-center text-muted-foreground font-dm-sans">
        Loading investment details...
      </div>
    )
  }

  if (isError || !data) {
    notFound()
  }

  return <InvestmentDetailPageContent detail={data} />
}
