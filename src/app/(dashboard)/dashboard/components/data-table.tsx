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
import { usePathname } from "next/navigation"
import { RISK_COLORS } from "@/types/dashboard"

interface DashboardInvestment {
  company: string;
  sector: string;
  invested: string;
  unitHolding: number;
  currentValue: number;
  returns: string;
  date: string;
}

interface PortfolioInvestment {
  company: string;
  sector: string;
  goal: string;
  raised: string;
  invested: string;
}

interface MarketplaceInvestment {
  name: string;
  sector: string;
  fundingGoal: string;
  amountRaised: string;
  minInvestment: string;
  riskScore: 'low' | 'moderate' | 'high';
}

const investmentData: DashboardInvestment[] = [
  { company: "Green Tech Solution", sector: "Technology", invested: "₦25,400,000.00", unitHolding: 1234, currentValue: 1250, returns: "₦432,650.00", date: "16/02/2026" },
  { company: "MedTech Innovation", sector: "Energy", invested: "₦25,400,000.00", unitHolding: 1245, currentValue: 959, returns: "₦50,567.00", date: "14/02/2026" },
  { company: "SeedSync Technologies", sector: "Technology", invested: "₦125,400,000.00", unitHolding: 6789, currentValue: 856, returns: "₦2,200,000.00", date: "12/02/2026" },
  { company: "Lockstone Finance", sector: "Finance", invested: "₦5,400,000.00", unitHolding: 567, currentValue: 1750, returns: "₦60,760.00", date: "08/02/2026" },
  { company: "HarvestIQ Solutions Inc.", sector: "Healthcare", invested: "₦5,400,000.00", unitHolding: 975, currentValue: 1550, returns: "₦22,500.00", date: "01/02/2026" },
  { company: "YieldTrack Global Limited", sector: "Consumer Goods", invested: "₦400,000.00", unitHolding: 345, currentValue: 2000, returns: "₦15,456.00", date: "26/01/2026" }
];

const portfolioData: PortfolioInvestment[] = [
  { company: "SeedSync Technologies", sector: "Technology", goal: "₦125,400,000.00", raised: "₦30,750,000.00", invested: "₦250,000.00" },
  { company: "Green Tech Solution", sector: "Technology", goal: "₦325,400,000.00", raised: "₦25,000,000.00", invested: "₦100,000.00" },
  { company: "MedTech Innovation", sector: "Energy", goal: "₦25,400,000.00", raised: "₦5,760,000.00", invested: "₦5,035.00" },
  { company: "Lockstone Finance", sector: "Finance", goal: "₦1,325,400,000.00", raised: "₦934,450,000.00", invested: "₦103,270.00" },
  { company: "HarvestIQ Solutions Inc.", sector: "Healthcare", goal: "₦75,400,000.00", raised: "₦15,423,000.00", invested: "₦50,400.00" },
  { company: "YieldTrack Global Limited", sector: "Consumer Goods", goal: "₦525,400,000.00", raised: "₦205,320,000.00", invested: "₦57,200.00" }
];

const marketplaceData: MarketplaceInvestment[] = [
  { name: "Green Tech Solution", sector: "Technology", fundingGoal: "₦325,400,000.00", amountRaised: "₦25,000,000.00", minInvestment: "₦5,000,000.00", riskScore: 'high' },
  { name: "MedTech Innovation", sector: "Energy", fundingGoal: "₦25,400,000.00", amountRaised: "₦5,760,000.00", minInvestment: "₦5,000,000.00", riskScore: 'low' },
  { name: "SeedSync Technologies", sector: "Technology", fundingGoal: "₦125,400,000.00", amountRaised: "₦30,750,000.00", minInvestment: "₦25,000,000.00", riskScore: 'low' },
  { name: "Lockstone Finance", sector: "Finance", fundingGoal: "₦1,325,400,000.00", amountRaised: "₦934,450,000.00", minInvestment: "₦100,000,000.00", riskScore: 'high' },
  { name: "HarvestIQ Solutions Inc.", sector: "Healthcare", fundingGoal: "₦75,400,000.00", amountRaised: "₦15,423,000.00", minInvestment: "₦50,000,000.00", riskScore: 'low' },
  { name: "YieldTrack Global Limited", sector: "Consumer Goods", fundingGoal: "₦525,400,000.00", amountRaised: "₦205,320,000.00", minInvestment: "₦50,000,000.00", riskScore: 'moderate' }
];

export function DataTable({ state = false }: { state: boolean }) {

  const pathname = usePathname();
  const isDashboardPage = pathname === "/dashboard";
  const isPortfolioPage = pathname === "/portfolio";
  const isMarketplacePage = pathname === "/marketplace";

  const getActiveContent = () => {
    if (isPortfolioPage) return { data: portfolioData };
    if (isMarketplacePage) return { data: marketplaceData };
    return { data: investmentData };
  };

  const { data: activeData } = getActiveContent();
  const isEmpty = !state || activeData.length === 0;

  return (
    <div className="px-4 lg:px-6 space-y-6">
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
                {isDashboardPage ? (
                  (investmentData as DashboardInvestment[]).map((row, index) => (
                    <TableRow key={index} className="border-b border-[#EAEAEA] transition-colors hover:bg-[#E6EAE9]">
                      <TableCell className="py-4 font-medium text-[#595959]">{row.company}</TableCell>
                      <TableCell className="py-4 text-[#858585]">{row.sector}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.invested}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.unitHolding}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.currentValue}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.returns}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.date}</TableCell>
                    </TableRow>
                  ))
                ) : (isPortfolioPage ? (
                  (portfolioData as PortfolioInvestment[]).map((row, index) => (
                    <TableRow key={index} className="border-b border-[#EAEAEA] transition-colors hover:bg-[#E6EAE9]">
                      <TableCell className="py-4 font-medium text-[#595959]">{row.company}</TableCell>
                      <TableCell className="py-4 text-[#858585]">{row.sector}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.goal}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.raised}</TableCell>
                      <TableCell className="py-4 text-[#858585] text-center">{row.invested}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  (activeData as MarketplaceInvestment[]).map((row, index) => (
                    <TableRow key={index} className="border-b border-[#EAEAEA] transition-colors hover:bg-[#F4F7F6]">
                      <TableCell className="py-4 align-middle font-medium text-[#595959]">{row.name}</TableCell>
                      <TableCell className="py-4 align-middle text-[#858585]">{row.sector}</TableCell>
                      <TableCell className="py-4 align-middle text-[#858585] text-right pr-8">{row.fundingGoal}</TableCell>
                      <TableCell className="py-4 align-middle text-[#858585] text-right pr-8">{row.amountRaised}</TableCell>
                      <TableCell className="py-4 align-middle text-[#858585] text-right pr-8">{row.minInvestment}</TableCell>
                      <TableCell className="py-4 align-middle">
                        <div className="flex items-center justify-center h-full">
                          <span 
                            className="px-3 py-1 rounded-md text-white text-[12px] capitalize inline-block" 
                            style={{ backgroundColor: RISK_COLORS[row.riskScore] }}
                          >
                            {row.riskScore === 'moderate' ? 'Medium' : row.riskScore} Risk
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 align-middle text-center">
                        <button className="border border-[#A8A8A8] px-4 py-1.5 rounded-lg text-[14px] font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
                          Invest Now
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </div>
  )
}