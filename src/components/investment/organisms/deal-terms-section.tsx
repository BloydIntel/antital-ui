import React from 'react'
import { DealTermItem } from '@/components/investment/molecules/deal-term-item'
import { ActionButton } from '@/components/investment/molecules/action-button'

export function DealTermsSection() {
  return (
    <div className="w-full max-w-full lg:w-auto lg:max-w-[400px]">
      <div
        className="flex flex-col items-start bg-white dark:bg-[#1A1A1A] border border-[#EAEAEA] dark:border-[#404040] rounded overflow-hidden w-full max-w-full lg:w-[400px]"
        style={{
          height: 'auto',
          padding: '16px',
          gap: '32px',
          boxShadow: '0px 4px 0px #042E27',
          borderRadius: '4px',
        }}
      >
        {/* Deal Terms Heading */}
        <h3
          className="text-[#2C2C2C] dark:text-white"
          style={{
            fontFamily: 'var(--font-rethink-sans)',
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '34px',
            letterSpacing: '-0.01em',
            width: '100%',
          }}
        >
          Deal terms
        </h3>

        {/* Deal Terms List */}
        <div
          className="flex flex-col items-start w-full"
          style={{
            width: '100%',
          }}
        >
          <DealTermItem 
            label="Total shares offered" 
            value="99,431,817" 
            description="The smallest investment amount that Nexus AI is accepting."
          />
          <DealTermItem 
            label="Price per share" 
            value="₦75" 
            description="Price of a share"
            showInfo 
          />
          <DealTermItem 
            label="Minimum Investment" 
            value="₦5,000" 
            description="The smallest investment amount that Nexus AI is accepting."
            showInfo 
          />
          <DealTermItem 
            label="Maximum Investment" 
            value="₦250,000" 
            description="The largest investment amount that Nexus AI is accepting."
            showInfo 
          />
          <DealTermItem 
            label="Minimum threshold" 
            value="₦15M" 
            description="The minimum amount the offering can raise."
            showInfo 
          />
          <DealTermItem 
            label="Funding goal" 
            value="₦25M" 
            description="The maximum amount the offering can raise."
            showInfo 
          />
          <DealTermItem 
            label="Deadline" 
            value="October 21, 2025" 
            description="Nexus AI needs to reach their minimum funding goal before the deadline ( October 21, 2025 at 7:59 AM WAT). If they don't, all investments will be refunded."
            showInfo 
            isLast 
          />
        </div>

        {/* Start Trading Button at Bottom */}
        <ActionButton
          text="Start trading"
          variant="primary"
          width="100%"
          height="48px"
        />
      </div>
    </div>
  )
}

