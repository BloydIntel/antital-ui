import { Portfolio } from '@/app/(dashboard)/portfolio/components/Portfolio'
import { InvestorOnly } from '@/components/auth/require-user-type'

export default function Page() {
    return (
        <InvestorOnly>
            <Portfolio />
        </InvestorOnly>
    )
}
