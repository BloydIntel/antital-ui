"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Filter, MoreVertical, Search } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TYPOGRAPHY } from "@/constants/styles"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import allInvestmentsRaw from "@/data/dashboardInvestmentData.json";
import { InvestmentData, RISK_COLORS } from "@/types/dashboard"
import { buildCheckoutPath } from "@/lib/investment-checkout";
import type { DashboardHolding } from "@/types/dashboard-api"

interface DataTableProps {
  state?: boolean
  holdings?: DashboardHolding[]
  isLoading?: boolean
}

const formatDashboardDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString("en-GB")
}

const mapHoldingsToRows = (holdings: DashboardHolding[]): InvestmentData[] =>
  holdings.map((holding) => ({
    id: String(holding.offeringId),
    name: holding.name,
    category: holding.sector,
    sector: holding.sector,
    invested: holding.invested,
    unitHolding: holding.unitHolding,
    currentValue: holding.currentValue,
    returns: holding.returns,
    date: formatDashboardDate(holding.date),
    risk: holding.risk as InvestmentData["risk"],
    goal: holding.fundingGoal,
    raised: holding.raisedAmount,
  }))

export function DataTable({ state = false, holdings, isLoading = false }: DataTableProps) {

  const pathname = usePathname();
  const router = useRouter()
  const isDashboardPage = pathname === "/dashboard";
  const isPortfolioPage = pathname === "/portfolio";
  const isMarketplacePage = pathname === "/marketplace";

  const allInvestments = allInvestmentsRaw as InvestmentData[];

  const getActiveContent = () => {
    if (isDashboardPage || isPortfolioPage) {
      return holdings ? mapHoldingsToRows(holdings) : []
    }
    if (isMarketplacePage) {
      return allInvestments;
    }
    return allInvestments.filter(item => item.invested! > 0);
  };

  const activeData = getActiveContent();
  const isEmpty = isDashboardPage || isPortfolioPage
    ? !isLoading && activeData.length === 0
    : !state || activeData.length === 0;

  const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) return "₦0.00";

    return `₦${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-none min-h-[518px] bg-white border-[#EAEAEA]">
        <CardHeader className="flex flex-col xl:flex-row items-center justify-between pb-2">
          <div>
            {isDashboardPage ? (
              <>
                <Select>
                  <SelectTrigger
                    className="h-auto py-6 px-4 border-[#A8A8A8] rounded-md bg-white cursor-pointer focus:ring-0 text-black"
                    style={{
                      fontFamily: 'var(--font-clash), sans-serif',
                      fontSize: '24px',
                      fontWeight: 500
                    }}
                  >
                    {/* Use SelectValue as the slot for the text */}
                    <SelectValue placeholder="Investment Holding" className="text-[24px]" />
                  </SelectTrigger>

                  <SelectContent className="bg-white border-[#EAEAEA]">

                    <SelectGroup>
                      <SelectItem value="sector">Sector</SelectItem>
                      <SelectItem value="funding-goal">Funding Goal</SelectItem>
                      <SelectItem value="risk-score">Risk Score</SelectItem>
                      <SelectItem value="amount-raised">Amount Raised</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <p className="text-[16px] text-[#505050] pt-2" style={TYPOGRAPHY.body}>Recent investment performance</p>
              </>
            ) : isPortfolioPage ? (
              <div className="space-y-1">
                <h2 className="text-[24px] text-[#000000] font-medium" style={{ fontFamily: 'var(--font-clash), sans-serif' }}>My Investment</h2>
                <p className="text-[14px] text-[#505050]" style={TYPOGRAPHY.body}>Track all your active, pending, and completed investments in one place.</p>
              </div>
            ) : (
              <div className="space-y-1">
                <h2 className="text-[24px] text-[#000000] font-medium" style={{ fontFamily: 'var(--font-clash), sans-serif' }}>New Listings</h2>
                <p className="text-[14px] text-[#505050]" style={TYPOGRAPHY.body}>Explore new startups and secure your spot as an early investor.</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 xl:-mt-6">
            <div className="relative w-full lg:w-[371px]">
              <Input type="search" placeholder="Search" className="h-[40px] px-4 pr-12 bg-[#EAEAEA] border-[#EAEAEA] rounded-xs text-[16px]" style={TYPOGRAPHY.body} />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A2A3A1]" />
            </div>
            <Select>
              <SelectTrigger className="py-2 px-4 border-[#A8A8A8] rounded-xs bg-white cursor-pointer">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" fill={isPortfolioPage ? "none" : "#000000"} />
                  <span className="text-[16px] text-[#000000]" style={TYPOGRAPHY.heading}>Filter</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sector">Sector</SelectItem>
                <SelectItem value="funding-goal">Funding Goal</SelectItem>
                <SelectItem value="risk-score">Risk Score</SelectItem>
                <SelectItem value="amount-raised">Amount Raised</SelectItem>
              </SelectContent>
            </Select>
            <MoreVertical className="h-5 w-5 text-[#323232] cursor-pointer" />
          </div>
        </CardHeader>

        {isEmpty ? (
          <CardContent className="w-full flex-1 px-4 relative overflow-hidden">
            <div className="w-full h-full relative min-h-[400px]">
              <Image
                alt="Empty investment holding illustration"
                src="/dashboard/empty-dashboard-table.png"
                fill
                className="hidden lg:block object-cover"
                priority
              />
            </div>
            <p className="text-[#505050] text-[20px] text-center pt-4" style={TYPOGRAPHY.body}>
              You currently have no investments
            </p>
          </CardContent>
        ) : (
          <CardContent>
            <Table>
              <TableHeader className="border-0">
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="text-[#505050] text-[14px] py-4" style={TYPOGRAPHY.body}>{isDashboardPage ? "Company" : "Start up name"}</TableHead>
                  <TableHead className="text-[#505050] text-[14px] py-4" style={TYPOGRAPHY.body}>Sector</TableHead>
                  {isDashboardPage ? (
                    <>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Invested</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Unit Holding</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Current Value</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Returns</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Dates</TableHead>
                    </>
                  ) : (isPortfolioPage ? (
                    <>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Funding Goal</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Amount raised</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Amount invested</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Funding Goal</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Amount raised</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Minimum investment</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Risk Score</TableHead>
                      <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}></TableHead>
                    </>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeData.map((row: InvestmentData, index: number) => (
                  <TableRow
                    key={row.id || index}
                    className={`border-b border-[#EAEAEA] transition-colors ${isMarketplacePage ? "hover:bg-[#F4F7F6]" : "hover:bg-[#E6EAE9]"
                      }`}
                  >
                    {/* Name and Sector are common to all views */}
                    <TableCell className="py-4 font-medium text-[#595959]">{row.name}</TableCell>
                    <TableCell className="py-4 text-[#858585]">{row.sector}</TableCell>

                    {isDashboardPage && (
                      <>
                        <TableCell className="py-4 text-[#858585] text-center">{formatCurrency(row.invested)}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.unitHolding}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">
                          {typeof row.currentValue === "number" ? formatCurrency(row.currentValue) : row.currentValue}
                        </TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{formatCurrency(row.returns)}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.date}</TableCell>
                      </>
                    )}

                    {isPortfolioPage && (
                      <>
                        <TableCell className="py-4 text-[#858585] text-center">{formatCurrency(row.goal)}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{formatCurrency(row.raised)}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{formatCurrency(row.invested)}</TableCell>
                      </>
                    )}

                    {isMarketplacePage && (
                      <>
                        <TableCell className="py-4 align-middle text-[#858585] text-right pr-8">{formatCurrency(row.goal)}</TableCell>
                        <TableCell className="py-4 align-middle text-[#858585] text-right pr-8">{formatCurrency(row.raised)}</TableCell>
                        <TableCell className="py-4 align-middle text-[#858585] text-right pr-8">{formatCurrency(row.minInvestment)}</TableCell>
                        <TableCell className="py-4 align-middle">
                          <div className="flex items-center justify-center h-full">
                            <span
                              className="px-3 py-1 rounded-md text-white text-[12px] capitalize inline-block"
                              style={{ backgroundColor: RISK_COLORS[row.risk!] }}
                            >
                              {row.risk === 'moderate' ? 'Medium' : row.risk} Risk
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 align-middle text-center">
                          <button
                            className="border border-[#A8A8A8] px-4 py-1.5 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                            onClick={() =>
                              router.push(
                                buildCheckoutPath({
                                  offeringId: Number.parseInt(row.id, 10) || 0,
                                  slug: row.id,
                                })
                              )
                            }
                          >
                            Invest Now
                          </button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  )
}