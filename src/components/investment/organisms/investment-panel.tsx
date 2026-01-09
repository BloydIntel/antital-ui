import React from 'react'
import { Gauge, Bookmark } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ActionButton } from '@/components/investment/molecules/action-button'

export function InvestmentPanel() {
  return (
    <div className="w-full lg:w-auto">
      {/* Investment Card */}
      <div
        className="flex flex-col items-start bg-white dark:bg-white border border-[#EAEAEA] dark:border-[#404040] rounded"
        style={{
          width: '400px',
          height: 'auto',
          minHeight: '369px',
          padding: '16px',
          boxShadow: '0px 4px 0px #042E27',
          borderRadius: '4px',
        }}
      >
        {/* Top Section - Invest */}
        <div
          className="flex flex-col items-start w-full"
          style={{
            width: '368px',
            gap: '24px',
          }}
        >
          {/* Target Section */}
            <div
            className="flex flex-col items-start w-full border-b border-[#EAEAEA] dark:border-[#404040]"
            style={{
              gap: '24px',
              paddingBottom: '16px',
            }}
          >
            {/* Target Header */}
            <div className="flex flex-row justify-between items-center w-full">
              <span
                className="text-[#2C2C2C]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px',
                  letterSpacing: '-0.01em',
                }}
              >
                Target
              </span>
              <div className="flex flex-row items-center gap-2">
                <Gauge className="w-6 h-6" style={{ color: '#A4D65E' }} />
                <span
                  className="text-[#000000]"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '24px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  4.5
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-1.5 bg-[#EDF7DF] rounded-lg overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#A4D65E] rounded-lg"
                style={{
                  width: '48%', // Approximate based on CSS (176px / 368px)
                }}
              />
            </div>

            {/* Amount Raised */}
            <div className="flex flex-col items-start gap-2">
              <span
                className="text-[#2C2C2C]"
                style={{
                  fontFamily: 'var(--font-rethink-sans)',
                  fontWeight: 500,
                  fontSize: '24px',
                  lineHeight: '29px',
                  letterSpacing: '-0.01em',
                }}
              >
                ₦7,381,254
              </span>
              <span
                className="text-[#858585]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '17px',
                  letterSpacing: '-0.01em',
                }}
              >
                raised from 341+ investors
              </span>
            </div>
          </div>

          {/* Invest Section */}
          <div
            className="flex flex-row justify-between items-center w-full"
            style={{
              gap: '111px',
              width: '368px',
              height: '53px',
            }}
          >
            {/* Invest Header */}
            <div
              className="flex flex-col items-start"
              style={{
                gap: '8px',
                width: '107px',
              }}
            >
              <span
                className="text-[#2C2C2C]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px',
                  letterSpacing: '-0.01em',
                }}
              >
                Invest
              </span>
              <span
                className="text-[#858585]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '21px',
                  letterSpacing: '0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                1 share = ₦720
              </span>
            </div>

            {/* Input Field */}
            <div className="relative" style={{ width: '176px', height: '44px' }}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <span
                  className="text-[#858585]"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '21px',
                    letterSpacing: '0.01em',
                  }}
                >
                  ₦
                </span>
              </div>
              <Input
                type="number"
                placeholder="0"
                className="w-full h-11 border border-[#B9CCFF] rounded pl-8 pr-3 text-[#2A2A2A] bg-white dark:bg-white"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '24px',
                  letterSpacing: '-0.01em',
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col w-full"
            style={{
              gap: '8px',
              width: '368px',
              marginBottom: '24px',
            }}
          >
            <ActionButton
              text="Start trading"
              variant="primary"
              width="368px"
              height="48px"
            />
            <ActionButton
              text="Add to watchlist"
              variant="outline"
              icon={Bookmark}
              iconPosition="left"
              width="368px"
              height="48px"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

