import React from 'react'
import { Input } from '@/components/ui/input'
import { Search, HelpCircle, Bell, MessageSquare } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TYPOGRAPHY } from '@/constants/styles'
import { SidebarTrigger } from '@/components/ui/sidebar'

const dashboardHeaderData = {
    notificationBadge: 4,
    userAvatarURL: "/dashboard/User-Avatar.png",
    userAvatarFallback: "JD"

}

export function DashboardHeader() {
    return (
        <header className="flex flex-col-reverse gap-2 md:gap-0 md:flex-row md:h-[52px] items-center justify-between md:px-8 md:pt-10 pt-2 pb-8">

            <div className="absolute left-1 top-4">
                <SidebarTrigger className="-ml-1 md:hidden" />
            </div>

            <div className="flex-1 max-w-[523px]">
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

            {/* Actions Section */}
            <div className="flex items-center gap-6">
                <div className='flex'>
                    {/* Help Icon */}
                    <Button variant="ghost" size="icon" className="text-[#1A1C1E]">
                        <HelpCircle className="h-6 w-6" />
                    </Button>

                    {/* Notifications Icon with Badge */}
                    <div className="relative inline-flex">
                        <Button variant="ghost" size="icon" className="text-[#1A1C1E]">
                            <Bell className="h-6 w-6" />
                        </Button>

                        <span className="absolute top-0.5 right-0.5 flex h-5 w-5 -mr-1 -mt-1 items-center justify-center rounded-full bg-[#D11313] text-[10px] text-white border-2 border-white">
                            {dashboardHeaderData.notificationBadge}
                        </span>
                    </div>
                </div>

                {/* Chat Button */}
                <Button
                    className="bg-[#4379B7] hover:bg-[#366295] h-11 px-6 rounded-md gap-2 text-white font-medium cursor-pointer"
                >
                    <span style={TYPOGRAPHY.body}>Chat</span>
                    <MessageSquare className="h-4 w-4" />
                </Button>

                {/* User Profile */}
                <Avatar className="h-12 w-12 border border-[#EAEAEA] cursor-pointer">
                    <AvatarImage src={dashboardHeaderData.userAvatarURL} alt="User" />
                    <AvatarFallback>{dashboardHeaderData.userAvatarFallback}</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}
