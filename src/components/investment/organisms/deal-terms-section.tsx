import React from 'react'
import { DealTermItem } from '@/components/investment/molecules/deal-term-item'
import { ActionButton } from '@/components/investment/molecules/action-button'
import type { DealTerms } from '@/types/investment'
import { formatNaira, formatNumber } from '@/lib/investment-mappers'
import { useStartInvestmentCheckout } from '@/hooks/use-start-investment-checkout'

interface DealTermsSectionProps {
  dealTerms: DealTerms
  companyName: string
  offeringId: number
  slug: string
}

export function DealTermsSection({ dealTerms, companyName, offeringId, slug }: DealTermsSectionProps) {
  const startCheckout = useStartInvestmentCheckout()
  const deadline = new Date(dealTerms.deadline).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="w-full max-w-full lg:w-auto lg:max-w-[400px]">
      <div
        className="flex flex-col items-start bg-white dark:bg-[#1A1A1A] border border-[#EAEAEA] dark:border-[#404040] rounded overflow-hidden w-full max-w-full lg:w-[400px] p-4 gap-8"
        style={{ boxShadow: '0px 4px 0px #042E27', borderRadius: '4px' }}
      >
        <h3 className="text-[#2C2C2C] dark:text-white font-rethink-sans font-medium text-[28px] leading-[34px] w-full">
          Deal terms
        </h3>

        <div className="flex flex-col items-start w-full">
          <DealTermItem
            label="Total shares offered"
            value={formatNumber(dealTerms.totalSharesOffered)}
            description={`The total number of shares ${companyName} is offering.`}
          />
          <DealTermItem
            label="Price per share"
            value={formatNaira(dealTerms.pricePerShare)}
            description="Price of a share"
            showInfo
          />
          <DealTermItem
            label="Minimum Investment"
            value={formatNaira(dealTerms.minimumInvestment)}
            description={`The smallest investment amount that ${companyName} is accepting.`}
            showInfo
          />
          <DealTermItem
            label="Maximum Investment"
            value={formatNaira(dealTerms.maximumInvestment)}
            description={`The largest investment amount that ${companyName} is accepting.`}
            showInfo
          />
          <DealTermItem
            label="Minimum threshold"
            value={formatNaira(dealTerms.minimumThreshold)}
            description="The minimum amount the offering can raise."
            showInfo
          />
          <DealTermItem
            label="Funding goal"
            value={formatNaira(dealTerms.fundingGoal)}
            description="The maximum amount the offering can raise."
            showInfo
          />
          <DealTermItem
            label="Deadline"
            value={deadline}
            description={`${companyName} needs to reach their minimum funding goal before the deadline (${deadline}). If they don't, all investments will be refunded.`}
            showInfo
            isLast
          />
        </div>

        <ActionButton
          text="Start trading"
          variant="primary"
          width="100%"
          height="48px"
          onClick={() => startCheckout({ offeringId, slug })}
        />
      </div>
    </div>
  )
}
