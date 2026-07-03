import React from 'react'
import { Ban, X } from 'lucide-react'
import { TYPOGRAPHY } from "@/constants/styles"

interface OpenMarketWarningDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function OpenMarketWarningDialog({
    isOpen,
    onOpenChange,
}: OpenMarketWarningDialogProps) {
    // If the component state flag is turned off, render absolutely nothing
    if (!isOpen) return null;

    const handleClose = () => {
        onOpenChange(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay Area */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity cursor-pointer"
                onClick={handleClose}
            />

            {/* Main Modal Panel Container */}
            <div className="bg-white w-full max-w-[1024px] p-8 md:p-16 rounded-xl border border-[#EAEAEA] shadow-lg relative z-10 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-150 focus-visible:outline-none">

                {/* Custom top-right close button */}
                <button
                    onClick={handleClose}
                    className="absolute right-6 top-6 rounded-md p-2 border border-[#EAEAEA] text-[#11110F] hover:bg-gray-50 transition-colors cursor-pointer focus-visible:outline-none"
                    aria-label="Close warning"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Icon Layout */}
                <div className="mb-8 text-[#A8A8A8]">
                    <Ban className="h-28 w-28 stroke-[2]" />
                </div>

                {/* Warning Content Message */}
                <p
                    className="text-[20px] md:text-[36px] text-[#858585] font-medium leading-[1.3] max-w-[623px] tracking-tight"
                    style={TYPOGRAPHY.body}
                >
                    You still have an open market. Finish that to create a new investment opportunity.
                </p>
            </div>
        </div>
    )
}