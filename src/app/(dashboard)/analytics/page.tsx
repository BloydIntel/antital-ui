import Analytics from '@/app/(dashboard)/analytics/components/Analytics'
import { FundraiserOnly } from '@/components/auth/require-user-type'

export default function page() {
    return (
        <FundraiserOnly>
            <Analytics />
        </FundraiserOnly>
    )
}
