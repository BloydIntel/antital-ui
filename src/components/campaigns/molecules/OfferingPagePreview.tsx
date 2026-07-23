"use client"

import React, { useRef, useState, useLayoutEffect } from 'react'
import { Navbar } from '@/components/landing/organisms/navbar'
import { InvestmentDetailPageContent } from '@/app/(marketing)/explore/[id]/investment-detail-page-content'
import { useInvestmentDetail } from '@/hooks/use-investment-detail'

const PREVIEW_WIDTH = 1440

interface OfferingPagePreviewProps {
    idOrSlug: string
}

export function OfferingPagePreview({ idOrSlug }: OfferingPagePreviewProps) {
    const { data, isLoading, isError } = useInvestmentDetail(idOrSlug)

    const containerRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const [contentHeight, setContentHeight] = useState(0)

    useLayoutEffect(() => {
        if (!data) return

        const updateScale = () => {
            const containerWidth = containerRef.current?.offsetWidth ?? 0
            const nextScale = containerWidth > 0 ? containerWidth / PREVIEW_WIDTH : 1
            setScale(nextScale)
            setContentHeight((contentRef.current?.scrollHeight ?? 0) * nextScale)
        }

        updateScale()

        const resizeObserver = new ResizeObserver(updateScale)
        if (containerRef.current) resizeObserver.observe(containerRef.current)
        if (contentRef.current) resizeObserver.observe(contentRef.current)

        return () => resizeObserver.disconnect()
    }, [data])

    if (isLoading) {
        return (
            <div className="w-full rounded-xl border border-[#EAEAEA] bg-white p-6 text-center text-muted-foreground font-dm-sans">
                Loading investment details...
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="w-full rounded-xl border border-[#EAEAEA] bg-white p-10 flex flex-col items-center justify-center text-center gap-2">
                <p className="text-[16px] text-[#1F1F1F] font-medium">Couldn&apos;t load the offering preview</p>
                <p className="text-[14px] text-[#505050]">
                    We weren&apos;t able to reach the campaign data. Please check your connection and try again.
                </p>
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="w-full rounded-xl border border-[#EAEAEA] bg-white overflow-hidden"
            style={{ height: contentHeight }}
        >
            <div
                ref={contentRef}
                className="bg-[#F4F5F7]/30 font-sans"
                style={{
                    width: PREVIEW_WIDTH,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                <Navbar />
                <InvestmentDetailPageContent detail={data} />
            </div>
        </div>
    )
}
