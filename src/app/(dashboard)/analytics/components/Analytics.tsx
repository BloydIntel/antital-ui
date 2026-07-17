import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader'
import { AnalyticsOverviewGrid } from '@/components/analytics/AnalyticsOverviewGrid'
import { ConversionMetricsCard } from '@/components/analytics/ConversionMetricsCard'
import { InvestorDiversityCard } from '@/components/analytics/InvestorDiversityCard'
import { TrafficConversionChart } from '@/components/analytics/TrafficConversionChart'

export default function Analytics() {
    return (
        <div>
            <AnalyticsHeader />

            <AnalyticsOverviewGrid />

            <div className='my-6 grid lg:grid-cols-2 gap-4'>
                <TrafficConversionChart />
                <InvestorDiversityCard />
            </div>

            <ConversionMetricsCard />
        </div>
    )
}
