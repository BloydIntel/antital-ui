"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { FloatingChatButton } from "@/components/dashboard/molecules/FloatingChatButton";
import { useSidebarConfig } from "@/hooks/use-sidebar-config";
import { DashboardHeader } from "@/components/dashboard/organisms/DashboardHeader";
import { InfoBanner } from "@/components/dashboard/organisms/InfoBanner";
import { useRouter } from "next/navigation";
import { SyncUserProfile } from "@/components/auth/sync-user-profile";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import onboardingService from "@/services/onboardingService";
import { mapOnboardingStepToUiStep } from "@/lib/onboarding-hydration";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = useSidebarConfig();

  const [isMobile, setIsMobile] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const userType = useUserStore((state) => state.userType);
  const isAdmin = userType === "admin";

  // Monitor store hydration to avoid server-client state mismatch
  useEffect(() => {
    setHasHydrated(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const router = useRouter();
  const onboardingQuery = useQuery({
    queryKey: ["dashboard-onboarding-banner"],
    queryFn: () => onboardingService.getOnboarding(),
    enabled: hasHydrated && !isAdmin,
  });

  const onboarding = onboardingQuery.data;
  const onboardingStatus = onboarding?.status ? String(onboarding.status) : null;
  const isPendingReview = onboardingStatus === "Submitted" || onboardingStatus === "UnderReview";
  const isActivated = onboardingStatus === "Activated";
  const isActionRequired =
    !isActivated &&
    !isPendingReview &&
    onboarding != null &&
    String(onboarding.currentStep) !== "Submitted" &&
    String(onboarding.currentStep) !== "4";
  const shouldShowKycBanner = hasHydrated && !isAdmin && (isPendingReview || isActionRequired);

  const handleBannerAction = () => {
    if (isPendingReview) {
      if (userType === "individual" || userType === "corporate") {
        router.push("/settings?tab=account");
        return;
      }

      router.push("/documents");
      return;
    }

    if (!onboarding) {
      router.push("/settings");
      return;
    }

    const investorUserType =
      userType === "corporate" || userType === "fundraiser"
        ? userType
        : "individual";
    const step = mapOnboardingStepToUiStep(onboarding.currentStep, investorUserType);
    router.push(`/onboarding/${investorUserType}/${step}`);
  };

  return (
    <>
      <SyncUserProfile />
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

        {shouldShowKycBanner && (
          <div className='pt-8 px-4 lg:px-8'>
            <InfoBanner
              type='kyc'
              state={isPendingReview ? "pending" : "action-required"}
              onActionClick={handleBannerAction}
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
    </>
  );
}
