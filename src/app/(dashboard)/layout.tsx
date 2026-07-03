"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FloatingChatButton } from "@/components/dashboard/molecules/FloatingChatButton";
import { useSidebarConfig } from "@/hooks/use-sidebar-config";
import { DashboardHeader } from "@/components/dashboard/organisms/DashboardHeader";
import { InfoBanner } from "@/components/dashboard/organisms/InfoBanner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = useSidebarConfig();

  const [isMobile, setIsMobile] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Read the real-time KYC validation status from your store
  const isKycCompleted = useUserStore((state) => state.isKycCompleted);

  // Monitor store hydration to avoid server-client state mismatch
  useEffect(() => {
    setHasHydrated(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const router = useRouter();

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

      <AppSidebar
        variant={config.variant}
        collapsible={config.collapsible}
        side={config.side}
        className="h-screen sticky top-0"
      />
      <SidebarInset className="bg-[#F8F8F8F8]">
        <DashboardHeader />

        {hasHydrated && !isKycCompleted && (
          <div className='pt-8 px-4 lg:px-8'>
            <InfoBanner
              type='kyc'
              onActionClick={() => router.push("/settings")}
            />
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 mb-16 md:gap-6 md:py-6 px-4 lg:px-8 min-h-screen">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>

      <FloatingChatButton />
    </SidebarProvider>
  );
}
