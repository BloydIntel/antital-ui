import React from 'react'
import { DealTermItem } from '@/components/investment/molecules/deal-term-item'
import { ActionButton } from '@/components/investment/molecules/action-button'

export function DealTermsSection() {
  return (
    <div className="w-full lg:w-auto">
      <div
        className="flex flex-col items-start bg-white border border-[#EAEAEA] rounded overflow-hidden"
        style={{
          width: '400px',
          height: 'auto',
          padding: '16px',
          gap: '32px',
          boxShadow: '0px 4px 0px #042E27',
          borderRadius: '4px',
        }}
      >
        {/* Deal Terms Heading */}
        <h3
          style={{
            fontFamily: 'var(--font-rethink-sans)',
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '34px',
            letterSpacing: '-0.01em',
            color: '#2C2C2C',
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
          width="368px"
          height="48px"
        />
      </div>
    </div>
  )
}

