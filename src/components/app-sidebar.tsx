"use client"

import * as React from "react"
import {
  LayoutDashboard,
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
          icon: LayoutDashboard,
        },
        {
          title: "Marketplace",
          url: "/marketplace",
          icon: LayoutDashboard,
        },
        {
          title: "Fixed Savings",
          url: "/fixed-savings",
          icon: LayoutDashboard,
        },
        {
          title: "Balance & Funding",
          url: "/balance-Funding",
          icon: LayoutDashboard,
        },
        {
          title: "Watchlist",
          url: "/watchlist",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      label: "Second part",
      items: [
        {
          title: "Access Chat",
          url: "/access-chat",
          icon: LayoutDashboard,
        },
        {
          title: "Help Center",
          url: "/help-center",
          icon: LayoutDashboard,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: LayoutDashboard,
        },
        {
          title: "Log Out",
          url: "/log-out",
          icon: LayoutDashboard,
        },

      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="h-[1024px] bg-[#FFFFFF] !static !overflow-visible shrink-0 scrollbar-hide">
      <SidebarHeader className="pt-10 pb-7 bg-[#FFFFFF]">
        <Image
          src="/icons/antital.svg"
          alt="Antital Logo"
          width={80}
          height={80}
          priority // Good for LCP since it's the logo
          className="object-contain"
        />
      </SidebarHeader>
      <SidebarContent className="overflow-visible scrollbar-hide bg-[#FFFFFF]">
        {data.navGroups.map((group) => (
          <NavMain key={group.label} items={group.items} />
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
