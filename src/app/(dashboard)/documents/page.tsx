import Documents from '@/app/(dashboard)/documents/components/Documents'
import { FundraiserOnly } from '@/components/auth/require-user-type'

export default function page() {
    return (
        <FundraiserOnly>
            <Documents />
        </FundraiserOnly>
    )
}
