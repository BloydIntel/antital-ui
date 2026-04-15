"use client"

import { MessageCircle } from "lucide-react" // Or "MessageCircle"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function FloatingChatButton() {
    const [unreadCount] = useState(4)

    const handleClick = () => { }

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <button
                onClick={handleClick}
                aria-label="Open support chat"
                className={cn(
                    "relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all active:scale-95 hover:scale-105",
                    "bg-[#3B73B5] text-white"
                )}
            >
                <MessageCircle className="w-6 h-6" />

                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#D11313] text-[12px] font-bold text-white border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </button>
        </div>
    )
}