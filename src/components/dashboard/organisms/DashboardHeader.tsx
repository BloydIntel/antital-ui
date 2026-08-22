"use client"

import { Input } from '@/components/ui/input'
import { Search, HelpCircle, Bell, MessageSquare, LogOut, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TYPOGRAPHY } from '@/constants/styles'
import { SidebarTrigger } from '@/components/ui/sidebar'
import useLogout from '@/hooks/use-logout'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const dashboardHeaderData = {
    notificationBadge: 4,
    userAvatarURL: "/dashboard/User-Avatar.png",
    userAvatarFallback: "JD"
}

const CUSTOM_MOBILE_HEADERS: Record<string, string> = {
    "/marketplace/invest": "Invest",
    "/balance-funding/invoice": "Transaction History",
    "/settings/": "Settings",
    "/flags-and-alerts/investigation/": "Flags and Alerts",
    "/investor-profile/": "Investor Profile",

};

export function DashboardHeader() {
    const pathname = usePathname()
    const router = useRouter();
    const logoutMutation = useLogout()

    const onHelpIconClick = () => {
        router.push('/help-center/')
    }
    const onNotificationIconClick = () => {
        router.push('/notifications')
    }

    const customHeaderPath = Object.keys(CUSTOM_MOBILE_HEADERS).find(route => pathname.startsWith(route));

    // Check if path belongs to a dynamic sub-route within the help center
    const isHelpCenterSubRoute = pathname.startsWith('/help-center/') && pathname !== '/help-center';

    const isCustomPage = !!customHeaderPath || isHelpCenterSubRoute;
    const pageTitle = customHeaderPath
        ? CUSTOM_MOBILE_HEADERS[customHeaderPath]
        : "";

    return (
        <header className="sticky top-0 z-50 bg-[#F8F8F8F8] flex flex-col md:flex-row md:h-[52px] items-center justify-between px-4 md:px-8 md:pt-10 pt-6 pb-4 md:pb-8 gap-4 border-b border-gray-100">

            <div className="flex items-center justify-between w-full md:w-auto md:flex-1 md:gap-8">

                {isCustomPage ? (

                    <div className='lg:hidden flex gap-2 items-center'>
                        <button
                            onClick={() => router.back()}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12H3M10 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <p className='text-[18px] font-medium text-[#1F1F1F]' style={TYPOGRAPHY.body}>
                            {pageTitle}
                        </p>
                    </div>
                ) : (

                    <div className="md:hidden">
                        <SidebarTrigger className="-ml-1 scale-125" />
                    </div>
                )}

                <div className={`hidden md:block xl:flex-1 lg:w-2/5 xl:max-w-[523px] w-full`}>
                    <div className="relative w-full">
                        <Input
                            type="search"
                            placeholder="Search for anything..."
                            className="h-[48px] px-4 pr-12 bg-white border-[#EAEAEA] rounded-md text-[16px] text-foreground placeholder:text-[#A2A3A1]"
                            style={TYPOGRAPHY.body}
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A2A3A1]" />
                    </div>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className='flex gap-4 md:gap-2'>
                        {/* Help Icon */}
                        <div className='flex items-center justify-center cursor-pointer' onClick={onHelpIconClick}>
                            <HelpCircle size={24} className="text-[#1A1C1E]" />
                        </div>

                        {/* Notifications */}
                        <div className="relative inline-flex">
                            <div className='flex items-center justify-center cursor-pointer' onClick={onNotificationIconClick}>
                                <Bell size={24} className="text-[#1A1C1E]" />
                            </div>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D11313] text-[10px] text-white border-2 border-white font-bold">
                                {dashboardHeaderData.notificationBadge}
                            </span>
                        </div>
                    </div>

                    {/* Chat (Desktop only) */}
                    <Button
                        className="hidden lg:flex bg-[#4379B7] hover:bg-[#366295] h-12 px-6 rounded-md gap-2 text-white font-medium cursor-pointer"
                    >
                        <span style={TYPOGRAPHY.body}>Chat</span>
                        <MessageSquare className="h-4 w-4" />
                    </Button>

                    {/* User Profile */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                type="button"
                                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#4379B7] focus-visible:ring-offset-2"
                                aria-label="Account menu"
                            >
                                <Avatar className="h-12 w-12 border border-[#EAEAEA] cursor-pointer">
                                    <AvatarImage src={dashboardHeaderData.userAvatarURL} alt="User" />
                                    <AvatarFallback>{dashboardHeaderData.userAvatarFallback}</AvatarFallback>
                                </Avatar>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-44 rounded-lg">
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href="/settings">
                                    <Settings />
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onSelect={(event) => {
                                    event.preventDefault()
                                    if (!logoutMutation.isPending) {
                                        logoutMutation.mutate()
                                    }
                                }}
                                disabled={logoutMutation.isPending}
                            >
                                <LogOut />
                                {logoutMutation.isPending ? "Logging out…" : "Log out"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {!isCustomPage && (
                <div className="w-full md:hidden">
                    <div className="relative w-full">
                        <Input
                            type="search"
                            placeholder="Search for anything..."
                            className="h-[44px] px-4 pr-12 bg-white border-[#EAEAEA] rounded-md text-[14px]"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A2A3A1]" />
                    </div>
                </div>
            )}
        </header>
    )
}