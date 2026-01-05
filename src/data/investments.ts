import { InvestmentCardData } from '@/components/investment/organisms/investment-card'
import investmentsData from './investments.json'

// All investment opportunities data - shared across pages
// Imported from JSON for easier API integration and maintenance
export const allInvestmentData: InvestmentCardData[] = investmentsData as InvestmentCardData[]

