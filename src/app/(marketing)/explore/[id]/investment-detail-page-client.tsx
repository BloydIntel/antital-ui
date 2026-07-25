'use client'

import { notFound } from 'next/navigation'
import { InvestmentDetailPageContent } from './investment-detail-page-content'
import { InvestmentDetailSkeleton } from '@/components/skeletons/investment-skeletons'
import { useInvestmentDetail } from '@/hooks/use-investment-detail'

interface InvestmentDetailPageClientProps {
  idOrSlug: string
}

export function InvestmentDetailPageClient({ idOrSlug }: InvestmentDetailPageClientProps) {
  const { data, isLoading, isError } = useInvestmentDetail(idOrSlug)

  if (isLoading) {
    return <InvestmentDetailSkeleton />
  }

  if (isError || !data) {
    notFound()
  }

  return <InvestmentDetailPageContent detail={data} />
}
