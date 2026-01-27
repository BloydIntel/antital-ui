import { notFound } from 'next/navigation'
import { InvestmentDetailPageContent } from './investment-detail-page-content'
import { allInvestmentData } from '@/data/investments'

interface InvestmentDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return allInvestmentData.map((investment) => ({
    id: investment.id,
  }))
}

export default async function InvestmentDetailPage({ params }: InvestmentDetailPageProps) {
  const { id } = await params
  const investment = allInvestmentData.find((inv) => inv.id === id)

  if (!investment) {
    notFound()
  }

  return <InvestmentDetailPageContent investment={investment} />
}

