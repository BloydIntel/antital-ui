"use client"

import * as React from "react"
import {
  BriefcaseBusiness,
  ChartLine,
  Eye,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  MessageCircleQuestionMark,
  PiggyBank,
  Settings,
  Wallet,
  Megaphone,
  Users,
  FileText,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useUserStore } from "@/store/userStore"

const investorNavGroups = [
  {
    label: "First part",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Portfolio", url: "/portfolio", icon: BriefcaseBusiness },
      { title: "Marketplace", url: "/marketplace", icon: ChartLine },
      { title: "Fixed Savings", url: "/fixed-savings", icon: PiggyBank },
      { title: "Balance & Funding", url: "/balance-funding", icon: Wallet },
      { title: "Watchlist", url: "/watchlist", icon: Eye },
    ],
  },
  {
    label: "Second part",
    items: [
      { title: "Access Chat", url: "/access-chat", icon: MessageCircle },
      { title: "Help Center", url: "/help-center", icon: MessageCircleQuestionMark },
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "Log Out", url: "#", icon: LogOut, action: "logout" as const },
    ],
  },
];

const fundraiserNavGroups = [
  {
    label: "First part",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Campaigns", url: "/campaigns", icon: Megaphone },
      { title: "Investors", url: "/investors", icon: Users },
      { title: "Analytics", url: "/analytics", icon: ChartLine },
      { title: "Documents", url: "/documents", icon: FileText },
    ],
  },
  {
    label: "Second part",
    items: [
      { title: "Access Chat", url: "/access-chat", icon: MessageCircle },
      { title: "Help Center", url: "/help-center", icon: MessageCircleQuestionMark },
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "Log Out", url: "#", icon: LogOut, action: "logout" as const },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const userType = useUserStore((state) => state.userType);

  const activeNavGroups = userType === "fundraiser" ? fundraiserNavGroups : investorNavGroups;

  return (
    <Sidebar {...props} className="bg-[#FFFFFF] shrink-0 scrollbar-hide">
      <SidebarHeader className="pt-10 pb-7 bg-[#FFFFFF]">
        <Link href="/" aria-label="Antital home" className="inline-flex">
          <Image
            src="/icons/antital.svg"
            alt="Antital Logo"
            width={80}
            height={80}
            priority
            className="object-contain"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between h-full overflow-visible scrollbar-hide bg-[#FFFFFF]">
        {activeNavGroups.map((group) => (
          <NavMain key={group.label} items={group.items} />
        ))}
      </SidebarContent>
    </Sidebar>
  )
}