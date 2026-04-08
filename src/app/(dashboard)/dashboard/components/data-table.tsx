"use client"

import * as React from "react"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { TYPOGRAPHY } from "@/constants/styles"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Investment {
  company: string;
  sector: string;
  invested: string;
  unitHolding: number;
  currentValue: number;
  returns: string;
  date: string;
}

const investmentData: Investment[] = [
  {
    company: "Green Tech Solution",
    sector: "Technology",
    invested: "₦25,400,000.00",
    unitHolding: 1234,
    currentValue: 1250,
    returns: "₦432,650.00",
    date: "16/02/2026"
  },
  {
    company: "MedTech Innovation",
    sector: "Energy",
    invested: "₦25,400,000.00",
    unitHolding: 1245,
    currentValue: 959,
    returns: "₦50,567.00",
    date: "14/02/2026"
  },
  {
    company: "SeedSync Technologies",
    sector: "Technology",
    invested: "₦125,400,000.00",
    unitHolding: 6789,
    currentValue: 856,
    returns: "₦2,200,000.00",
    date: "12/02/2026"
  },
  {
    company: "Lockstone Finance",
    sector: "Finance",
    invested: "₦5,400,000.00",
    unitHolding: 567,
    currentValue: 1750,
    returns: "₦60,760.00",
    date: "08/02/2026"
  },
  {
    company: "HarvestIQ Solutions Inc.",
    sector: "Healthcare",
    invested: "₦5,400,000.00",
    unitHolding: 975,
    currentValue: 1550,
    returns: "₦22,500.00",
    date: "01/02/2026"
  },
  {
    company: "YieldTrack Global Limited",
    sector: "Consumer Goods",
    invested: "₦400,000.00",
    unitHolding: 345,
    currentValue: 2000,
    returns: "₦15,456.00",
    date: "26/01/2026"
  }
];

export function DataTable() {
  return (
    <div>
      <Card className="shadow-none min-h-[518px] bg-white">

        <CardHeader className="flex flex-row items-center justify-between pb-2">

          <Select>
            <SelectTrigger
              className="py-6 px-4 border-[#A8A8A8] rounded-xs bg-white cursor-pointer"
            >
              <SelectGroup>
                <SelectLabel className="text-[24px] text-[#000000]" style={{
                  fontFamily: 'var(--font-clash), Clash Display, sans-serif',
                  fontWeight: 500,
                }}>Investment Holding</SelectLabel>
              </SelectGroup>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sector">Sector</SelectItem>
              <SelectItem value="funding-goal">Funding Goal</SelectItem>
              <SelectItem value="risk-score">Risk Score</SelectItem>
              <SelectItem value="amount-raised">Amount Raised</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3">

            <div className="flex-1 max-w-[523px]">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search"
                  className="h-[40px] px-4 pr-12 bg-[#EAEAEA] w-[371px] border-[#EAEAEA] rounded-xs text-[16px] placeholder:text-[#A2A3A1]"
                  style={TYPOGRAPHY.body}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A2A3A1]" />
              </div>
            </div>

            <Select defaultValue="portfolio">
              <SelectTrigger
                className="py-2 px-4 border-[#A8A8A8] rounded-xs bg-white cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Filter
                    className="h-4 w-4"
                    fill="#000000"
                    stroke="none"
                  />
                  <span
                    className="text-[16px] text-[#000000]"
                    style={TYPOGRAPHY.heading}
                  >
                    Filter
                  </span>
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
        <p className="text-[16px] text-[#505050] pl-6 -mt-7" style={TYPOGRAPHY.body}>Recent investment performance</p>
        {investmentData.length === 0 ? (
          <CardContent className="w-full flex-1 px-4 relative overflow-hidden">
            <div className="w-full h-full relative min-h-[400px]">
              <Image
                alt="Empty investment holding illustration"
                src="/dashboard/empty-dashboard-table.png"
                fill
                className="object-cover" // or "object-contain" if you don't want it cropped
                priority
              />
            </div>
            {/* Optional: Add the text over the image or below it */}

            <p className="text-[#505050] text-[20px] text-center pt-4" style={TYPOGRAPHY.body}>
              You currently have no investments
            </p>

          </CardContent>
        ) :
          (
            <CardContent>
              <Table>
                <TableHeader className="border-0">
                  <TableRow className="border-0 hover:bg-transparent">
                    <TableHead className="text-[#505050] text-[14px] py-4" style={TYPOGRAPHY.body}>Company</TableHead>
                    <TableHead className="text-[#505050] text-[14px] py-4" style={TYPOGRAPHY.body}>Sector</TableHead>
                    <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Invested</TableHead>
                    <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Uint Holdind</TableHead>
                    <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Current Value</TableHead>
                    <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Returns</TableHead>
                    <TableHead className="text-[#505050] text-[14px] py-4 text-center" style={TYPOGRAPHY.body}>Dates</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investmentData.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        className="border-b border-[#EAEAEA] transition-colors hover:bg-[#E6EAE9] hover:rounded-xl hover:border-[#EAEAEA]"
                      >
                        <TableCell className="py-4 font-medium text-[#595959]">{row.company}</TableCell>
                        <TableCell className="py-4 text-[#858585]">{row.sector}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.invested}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.unitHolding}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.currentValue}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.returns}</TableCell>
                        <TableCell className="py-4 text-[#858585] text-center">{row.date}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent >
          )
        }
      </Card>
    </div>
  )
}