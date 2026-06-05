"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FloatingChatButton } from "@/components/dashboard/molecules/FloatingChatButton";
import { useSidebarConfig } from "@/hooks/use-sidebar-config";
import { DashboardHeader } from "@/components/dashboard/organisms/DashboardHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = useSidebarConfig();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": isMobile ? "50vw" : "16rem",
        "--sidebar-width-icon": "3rem",
        "--header-height": "calc(var(--spacing) * 14)",
        "backgroundColor": "#FFFFFF",
      } as React.CSSProperties}
      className={config.collapsible === "none" ? "sidebar-none-mode" : ""}
    >
      {config.side === "left" ? (
        <>
          <AppSidebar
            variant={config.variant}
            collapsible={config.collapsible}
            side={config.side}
            className="h-screen sticky top-0"
          />
          <SidebarInset className="bg-[#F8F8F8F8]">
            <DashboardHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 mb-16 md:gap-6 md:py-6 px-4 lg:px-8">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </>
      ) : (
        <>
          <SidebarInset className="bg-[#F8F8F8F8]">
            {/* <SiteHeader /> */}
            <DashboardHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
          <AppSidebar
            variant={config.variant}
            collapsible={config.collapsible}
            side={config.side}
          />
        </>
      )}

      <FloatingChatButton />
    </SidebarProvider>
  );
}
