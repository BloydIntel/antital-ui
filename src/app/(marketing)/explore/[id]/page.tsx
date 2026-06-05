import { InvestmentDetailPageClient } from './investment-detail-page-client'

interface InvestmentDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function InvestmentDetailPage({ params }: InvestmentDetailPageProps) {
  const { id } = await params
  return <InvestmentDetailPageClient idOrSlug={id} />
}
