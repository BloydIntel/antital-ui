import { InboxFeed } from '@/components/investors/molecules/InboxFeed'
import { QIIParticipation } from '@/components/investors/molecules/QIIParticipation'
import { ResponseAnalytics } from '@/components/investors/molecules/ResponseAnalytics'
import { TYPOGRAPHY } from '@/constants/styles'
import React from 'react'

export default function Investors() {
    return (
        <div>
            <div>
                <h1 className="text-[20px] lg:text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Investors
                </h1>
                <p className="text-[14px] lg:text-[16px] text-[#505050]" style={TYPOGRAPHY.body}>
                    Interact with investors
                </p>
            </div>

            <div className='pt-6'>
                <QIIParticipation />
            </div>

            <div className='pt-6 grid lg:grid-cols-12 gap-4'>
                <div className='order-last lg:order-0 lg:col-span-8'>
                    <InboxFeed />
                </div>

                <div className='order-first lg:order-0 lg:col-span-4'>
                    <ResponseAnalytics />
                </div>
            </div>
        </div>
    )
}
