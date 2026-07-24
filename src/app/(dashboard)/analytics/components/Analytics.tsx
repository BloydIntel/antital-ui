"use client"

import { useEffect } from 'react'
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader'
import { AnalyticsOverviewGrid } from '@/components/analytics/AnalyticsOverviewGrid'
import { ConversionMetricsCard } from '@/components/analytics/ConversionMetricsCard'
import { InvestorDiversityCard } from '@/components/analytics/InvestorDiversityCard'
import { TrafficConversionChart } from '@/components/analytics/TrafficConversionChart'
import { useFundraiserAnalytics } from '@/hooks/use-fundraiser-analytics'
import { showApiErrorToast } from '@/lib/error-feedback'

export default function Analytics() {
    const analyticsQuery = useFundraiserAnalytics('last-7-days')
    const data = analyticsQuery.data
    const isLoading = analyticsQuery.isLoading

    useEffect(() => {
        if (analyticsQuery.isError) {
            showApiErrorToast(analyticsQuery.error, 'Unable to load analytics.')
        }
    }, [analyticsQuery.isError, analyticsQuery.error])

    return (
        <div>
            <AnalyticsHeader exportDisabled />

            {!isLoading && data && !data.offeringId ? (
                <div className="mb-6 rounded-xl border border-[#EAEAEA] bg-white p-6 text-sm text-[#505050]">
                    No owned campaign found yet. Analytics will appear once your offering is published.
                </div>
            ) : null}

            <AnalyticsOverviewGrid overview={data?.overview} isLoading={isLoading} />

            <div className="my-6 grid lg:grid-cols-2 gap-4">
                <TrafficConversionChart traffic={data?.traffic} isLoading={isLoading} />
                <InvestorDiversityCard diversity={data?.diversity} isLoading={isLoading} />
            </div>

            <ConversionMetricsCard conversion={data?.conversion} isLoading={isLoading} />
        </div>
    )
}
