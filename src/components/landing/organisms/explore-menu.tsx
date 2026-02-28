"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronRight, ChevronDown, ArrowLeftRight, History } from "lucide-react"

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

type ExploreMenuProps = {
  isActive: boolean
}

const baseNavClasses =
  "px-2 lg:px-3 py-2 h-12 flex items-center rounded-lg whitespace-nowrap transition-colors"

export function ExploreMenu({ isActive }: ExploreMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSelect = () => setOpen(false)

  // Determine which submenu item should be visually active based on the current route
  const tabParam = searchParams?.get("tab")
  const isOnSecondaryMarket = pathname?.startsWith("/secondary-market")
  const isOnExplore = pathname?.startsWith("/explore")

  const primaryActive = isOnExplore && (!tabParam || tabParam === "primary")
  const secondaryActive = isOnSecondaryMarket === true
  const preMarketActive = isOnExplore && tabParam === "pre-marketplace"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`${baseNavClasses} ${
            isActive ? "text-[#A7B832]" : "text-[#858585] hover:text-foreground"
          } flex items-center gap-1.5`}
          style={{
            fontFamily: isActive ? "var(--font-rethink-sans)" : "var(--font-dm-sans)",
            fontSize: "15px",
            lineHeight: "21px",
            fontWeight: isActive ? 500 : 400,
            letterSpacing: isActive ? "normal" : "0.01em",
          }}
        >
          <span>Explore</span>
          <ChevronDown className="w-4 h-4 text-[#A8A8A8]" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={12}
        className="w-[453px] max-w-[95vw] border-[#EAEAEA] bg-white p-4 rounded-lg shadow-md flex flex-col gap-4"
      >
        {/* Primary marketplace */}
        <ExploreMenuItem
          href="/explore?tab=primary"
          title="Primary marketplace"
          description="Make investments directly from the startup"
          active={primaryActive}
          onSelect={handleSelect}
          icon={
            <div className="flex items-center justify-center w-10 h-10 border border-[#EAEAEA] rounded-md bg-white">
              <Image
                src="/icons/antital.svg"
                alt="Primary marketplace"
                width={20}
                height={20}
                className="object-contain"
                unoptimized
              />
            </div>
          }
        />

        {/* Secondary marketplace */}
        <ExploreMenuItem
          href="/secondary-market"
          title="Secondary marketplace"
          description="Trade investments on a peer-to-peer platform"
          active={secondaryActive}
          onSelect={handleSelect}
          icon={
            <div className="flex items-center justify-center w-10 h-10 border border-[#EAEAEA] rounded-md bg-white">
              <ArrowLeftRight className="w-5 h-5 text-[#323232]" />
            </div>
          }
        />

        {/* Pre-marketplace notice */}
        <ExploreMenuItem
          href="/explore?tab=pre-marketplace"
          title="Pre-marketplace notice"
          description="See funding opportunities before they launch"
          active={preMarketActive}
          onSelect={handleSelect}
          icon={
            <div className="flex items-center justify-center w-10 h-10 border border-[#EAEAEA] rounded-md bg-white">
              <History className="w-5 h-5 text-[#323232]" />
            </div>
          }
        />
      </PopoverContent>
    </Popover>
  )
}

type ExploreMenuItemProps = {
  href: string
  title: string
  description: string
  icon: React.ReactNode
  active?: boolean
  onSelect?: () => void
}

function ExploreMenuItem({ href, title, description, icon, active, onSelect }: ExploreMenuItemProps) {
  return (
    <Link
      href={href}
      onClick={() => onSelect?.()}
      className={`flex items-center justify-between w-full px-2 py-2 rounded-md transition-colors ${
        active ? "bg-[#F4F5F7]" : "bg-white hover:bg-[#F4F5F7]"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex flex-col gap-1">
          <span
            className="text-[#505050]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "16px",
              lineHeight: "21px",
              fontWeight: 500,
            }}
          >
            {title}
          </span>
          <span
            className="text-[#858585]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "14px",
              lineHeight: "17px",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            {description}
          </span>
        </div>
      </div>
      <ChevronRight className="w-6 h-6 text-[#A8A8A8] flex-shrink-0" />
    </Link>
  )
}

