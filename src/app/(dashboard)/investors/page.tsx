import Investors from '@/app/(dashboard)/investors/components/Investors'
import { FundraiserOnly } from '@/components/auth/require-user-type'

export default function Page() {
    return (
        <FundraiserOnly>
            <Investors />
        </FundraiserOnly>
    )
}
