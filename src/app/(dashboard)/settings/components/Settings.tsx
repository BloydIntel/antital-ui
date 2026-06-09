import { TYPOGRAPHY } from '@/constants/styles'
import React from 'react'

export function Settings() {
    return (
        <div className='flex justify-between items-center'>
            <div>
                <h3 className="text-[28px] text-[#1F1F1F]" style={TYPOGRAPHY.heading}>
                    Settings
                </h3>
                <p className="text-[16px] text-[#505050] mb-8" style={TYPOGRAPHY.body}>
                    Manage your account preferences and security
                </p>
            </div>
            <span className="text-[16px] text-[#1F1F1F] bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg px-2 py-1.5" style={TYPOGRAPHY.heading}>
                Ordinary Investor
            </span>
        </div>
    )
}
