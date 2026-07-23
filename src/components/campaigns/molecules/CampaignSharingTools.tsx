"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'

interface CampaignSharingToolsProps {
    shareUrl: string
}

function openShare(platform: string, shareUrl: string) {
    const encoded = encodeURIComponent(shareUrl)
    const text = encodeURIComponent('Check out this investment opportunity on Antital')

    const urls: Record<string, string> = {
        'Twitter / X': `https://twitter.com/intent/tweet?url=${encoded}&text=${text}`,
        LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
        WhatsApp: `https://wa.me/?text=${text}%20${encoded}`,
        Email: `mailto:?subject=${encodeURIComponent('Investment opportunity on Antital')}&body=${text}%20${encoded}`,
    }

    const target = urls[platform]
    if (!target) return
    window.open(target, '_blank', 'noopener,noreferrer')
}

export function CampaignSharingTools({ shareUrl }: CampaignSharingToolsProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        if (!shareUrl) return
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy link: ', err)
        }
    }

    return (
        <div className="w-full max-w-[620px] bg-white rounded-xl border border-[#F4F5F7] py-4 pl-4 pr-1 ">
            <h3 className="text-[#051635] text-[16px] tracking-tight mb-6" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                Campaign Sharing Tools
            </h3>

            <div className="space-y-5">
                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">Direct Link</label>
                    <div className="flex items-center justify-between bg-[#F8F9FA] rounded-sm px-4 py-3 border border-transparent">
                        <span className="text-sm text-[#333333] break-all select-all pr-4">
                            {shareUrl || 'Share link unavailable'}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            disabled={!shareUrl}
                            className="bg-white hover:bg-gray-50 text-gray-700 font-medium border-gray-200 h-9 px-4 rounded-sm shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-green-600" />
                                    <span>Copied</span>
                                </>
                            ) : (
                                <span>Copy</span>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">Social Share</label>
                    <div className="flex flex-wrap gap-2">
                        {['Twitter / X', 'LinkedIn', 'WhatsApp', 'Email'].map((platform) => (
                            <Button
                                key={platform}
                                variant="outline"
                                disabled={!shareUrl}
                                className="bg-white hover:bg-gray-50 text-[#333333] border border-[#EAEAEA] rounded-sm px-4 py-2 text-sm font-normal transition-colors disabled:opacity-50"
                                onClick={() => openShare(platform, shareUrl)}
                            >
                                {platform}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">Custom Link</label>
                    <p className="text-sm text-[#858585]">
                        Custom vanity slugs are not available yet. Use the direct explore link above.
                    </p>
                </div>
            </div>
        </div>
    )
}
