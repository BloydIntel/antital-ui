import React from 'react'
import { Gauge, Bookmark } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ActionButton } from '@/components/investment/molecules/action-button'
import { useRouter } from "next/navigation"
import type { OfferingFunding } from '@/types/investment'
import { formatNaira, formatNumber } from '@/lib/investment-mappers'

interface InvestmentPanelProps {
  funding: OfferingFunding
}

export function InvestmentPanel({ funding }: InvestmentPanelProps) {
  const router = useRouter()

  const handleStartTrading = () => {
    router.push("/sign-in?from=trading")
  }

  return (
    <div className="w-full max-w-full lg:w-auto lg:max-w-[400px]">
      <div
        className="flex flex-col items-start bg-white dark:bg-white border border-[#EAEAEA] dark:border-[#404040] rounded w-full max-w-full lg:w-[400px]"
        style={{
          height: 'auto',
          minHeight: '369px',
          padding: '16px',
          boxShadow: '0px 4px 0px #042E27',
          borderRadius: '4px',
        }}
      >
        <div className="flex flex-col items-start w-full gap-6">
          <div className="flex flex-col items-start w-full border-b border-[#EAEAEA] dark:border-[#404040] gap-6 pb-4">
            <div className="flex flex-row justify-between items-center w-full">
              <span className="text-[#2C2C2C] font-dm-sans text-xl">Target</span>
              <div className="flex flex-row items-center gap-2">
                <Gauge className="w-6 h-6 text-[#A4D65E]" />
                <span className="text-black font-dm-sans text-xl">
                  {funding.targetRating ?? '—'}
                </span>
              </div>
            </div>

            <div className="relative w-full h-1.5 bg-[#EDF7DF] rounded-lg overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#A4D65E] rounded-lg"
                style={{ width: `${Math.min(100, funding.fundingProgressPercent)}%` }}
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="text-[#2C2C2C] font-rethink-sans font-medium text-2xl">
                {formatNaira(funding.raisedAmount)}
              </span>
              <span className="text-[#858585] font-dm-sans text-sm">
                raised from {formatNumber(funding.investorCount)}+ investors
              </span>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center w-full gap-4 min-h-[53px]">
            <div className="flex flex-col items-start gap-2 min-w-[107px]">
              <span className="text-[#2C2C2C] font-dm-sans text-xl">Invest</span>
              <span className="text-[#858585] font-dm-sans text-base whitespace-nowrap">
                1 share = {formatNaira(funding.sharePrice)}
              </span>
            </div>

            <div className="relative flex-1 lg:max-w-[176px] h-11">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#858585] font-dm-sans">₦</div>
              <Input
                type="number"
                placeholder="0"
                className="w-full h-11 border border-[#B9CCFF] rounded pl-8 pr-3 text-[#2A2A2A] bg-white dark:bg-white font-dm-sans text-xl"
              />
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 mb-6">
            <ActionButton
              text="Start trading"
              variant="primary"
              width="100%"
              height="48px"
              onClick={handleStartTrading}
            />
            <ActionButton
              text="Add to watchlist"
              variant="outline"
              icon={Bookmark}
              iconPosition="left"
              width="100%"
              height="48px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
