"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Check } from 'lucide-react'
import { TYPOGRAPHY } from '@/constants/styles'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'

interface CampaignSharingToolsProps {
    defaultLink?: string
    onCustomSlugGenerate?: (slug: string) => void
}

export function CampaignSharingTools({
    defaultLink = "https://antital.com/offer/abc-corp-srries-a",
    onCustomSlugGenerate
}: CampaignSharingToolsProps) {
    const [copied, setCopied] = useState(false)
    const [customSlug, setCustomSlug] = useState("")

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(defaultLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy link: ", err)
        }
    }

    const handleGenerate = () => {
        if (onCustomSlugGenerate && customSlug.trim()) {
            onCustomSlugGenerate(customSlug.trim())
        }
    }

    return (
        <div className="w-full max-w-[620px] bg-white rounded-xl border border-[#F4F5F7] py-4 pl-4 pr-1 ">
            {/* Card Header Title */}
            <h3 className="text-[#051635] text-[16px] tracking-tight mb-6" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                Campaign Sharing Tools
            </h3>

            <div className="space-y-5">
                {/* Direct Link Section */}
                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">Direct Link</label>
                    <div className="flex items-center justify-between bg-[#F8F9FA] rounded-sm px-4 py-3 border border-transparent">
                        <span className="text-sm text-[#333333] break-all select-all pr-4">
                            {defaultLink}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className="bg-white hover:bg-gray-50 text-gray-700 font-medium border-gray-200 h-9 px-4 rounded-sm shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer"
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

                {/* Social Share Section */}
                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">Social Share</label>
                    <div className="flex flex-wrap gap-2">
                        {['Twitter / X', 'LinkedIn', 'WhatsApp', 'Email'].map((platform) => (
                            <Button
                                key={platform}
                                variant="outline"
                                className="bg-white hover:bg-gray-50 text-[#333333] border border-[#EAEAEA] rounded-sm px-4 py-2 text-sm font-normal transition-colors"
                                onClick={() => console.log(`Sharing via ${platform}`)}
                            >
                                {platform}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Custom Link Section */}
                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">Custom Link</label>
                    <div className="flex items-center gap-3">
                        <Input
                            type="text"
                            placeholder="Enter Custom Slug..."
                            value={customSlug}
                            onChange={(e) => setCustomSlug(e.target.value)}
                            className="bg-[#F8F9FA] border-none text-sm placeholder:text-gray-400 text-[#333333] rounded-xl h-11 px-4 focus-visible:ring-1 focus-visible:ring-gray-300"
                        />

                        <OnboardingButton
                            label="Generate"
                            onClick={handleGenerate}
                            className='w-fit my-0'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}