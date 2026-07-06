"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TYPOGRAPHY } from '@/constants/styles'
import { OnboardingButton } from '@/components/onboarding/molecules/OnboardingButton'

interface CreateUpdateFormProps {
    onPublish?: (data: { title: string; content: string }) => void
    onSaveDraft?: (data: { title: string; content: string }) => void
}

export function CreateUpdateForm({ onPublish, onSaveDraft }: CreateUpdateFormProps) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault()
        if (onPublish) onPublish({ title, content })
    }

    const handleSaveDraft = (e: React.MouseEvent) => {
        e.preventDefault()
        if (onSaveDraft) onSaveDraft({ title, content })
    }

    return (
        <div className="w-full max-w-[620px] h-[517px] bg-white rounded-xl border border-[#F4F5F7] px-6 py-4">
            {/* Title Header */}
            <h3 className="text-[#051635] text-[16px] tracking-tight pb-4 border-b border-[#F4F5F7]" style={{ ...TYPOGRAPHY.body, fontWeight: 600 }}>
                Create Update
            </h3>

            <form onSubmit={handlePublish} className="mt-2.5 space-y-5">
                {/* Update Title Field */}
                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">
                        Update Title
                    </label>
                    <Input
                        type="text"
                        placeholder="e.g. Q1 Milestone Reached"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-[#EAEAEA] placeholder:text-gray-400 text-[#333333] rounded-sm h-11 px-4 focus-visible:ring-1 focus-visible:ring-gray-300"
                    />
                </div>

                {/* Content Field */}
                <div className="space-y-2">
                    <label className="text-[16px] font-medium text-[#666666]">
                        Content
                    </label>
                    <Textarea
                        placeholder="Write your update here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-[140px] resize-none border-[#EAEAEA] placeholder:text-gray-400 text-[#333333] rounded-sm p-4 focus-visible:ring-1 focus-visible:ring-gray-300"
                    />
                </div>

                {/* Form Action Controls Button Strip */}
                <div className="flex items-center justify-end gap-3 pt-2">

                    <OnboardingButton
                        label="Save Draft"
                        variant='plain'
                        onClick={() => handleSaveDraft}
                        className="w-fit my-0"
                    />

                    <OnboardingButton
                        label="Publish Update"
                        onClick={() => handlePublish}
                        className="w-fit my-0"
                    />

                </div>
            </form>
        </div>
    )
}