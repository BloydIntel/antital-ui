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
} from "lucide-react"
import Image from "next/image"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "ShadcnStore",
    email: "store@example.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "First part",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Portfolio",
          url: "/portfolio",
          icon: BriefcaseBusiness,
        },
        {
          title: "Trade & Market",
          url: "/marketplace",
          icon: ChartLine,
          iconClassName: "group-data-[active=true]/menu-item:stroke-white group-data-[active=true]/menu-item:stroke-[2.5px]"
        },
        {
          title: "Fixed Savings",
          url: "/fixed-savings",
          icon: PiggyBank,
        },
        {
          title: "Balance & Funding",
          url: "/balance-funding",
          icon: Wallet,
        },
        {
          title: "Watchlist",
          url: "/watchlist",
          icon: Eye,
        },
      ],
    },
    {
      label: "Second part",
      items: [
        {
          title: "Access Chat",
          url: "/access-chat",
          icon: MessageCircle,
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: MessageCircleQuestionMark,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
        {
          title: "Log Out",
          url: "/log-out",
          icon: LogOut,
        },

      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-[#FFFFFF] shrink-0 scrollbar-hide">
      <SidebarHeader className="pt-10 pb-7 bg-[#FFFFFF]">
        <Image
          src="/icons/antital.svg"
          alt="Antital Logo"
          width={80}
          height={80}
          priority
          className="object-contain"
        />
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between h-full overflow-visible scrollbar-hide bg-[#FFFFFF]">
        {data.navGroups.map((group) => (
          <NavMain key={group.label} items={group.items} />
        ))}
      </SidebarContent>
    </Sidebar>
  )
}


