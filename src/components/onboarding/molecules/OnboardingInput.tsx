"use client"

import React, { useState } from "react"
import { Eye, EyeOff, LucideIcon } from "lucide-react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
    icon?: LucideIcon
    className?: string
}

export const OnboardingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon: Icon, type, className, placeholder, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        // Manage type internally to allow placeholder to show on date inputs
        const [inputType, setInputType] = useState(type)

        const isPassword = type === "password"
        const isDate = type === "date"

        const togglePassword = () => setShowPassword(!showPassword)

        return (
            <div className={`w-full flex flex-col gap-2 pb-[16px] ${className || ""}`}>
                <label
                    className="text-[16px] text-[#1A1A1A] leading-tight"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                        letterSpacing: "-1%",
                    }}
                >
                    {label}
                </label>

                <div className="relative group">
                    <input
                        ref={ref}
                        // Toggle between text and date to show placeholder, or toggle password visibility
                        type={isPassword ? (showPassword ? "text" : "password") : inputType}
                        placeholder={placeholder}
                        // When focusing a date field, switch to 'date' type to show picker
                        onFocus={() => isDate && setInputType("date")}
                        // When blurring, if empty, switch back to 'text' to show placeholder
                        onBlur={(e) => {
                            if (isDate && !e.target.value) setInputType("text")
                        }}
                        className={`w-full h-[48px] px-4 rounded-lg bg-[#F4F5F7] border-none text-[#1A1A1A] placeholder:text-[#858585] placeholder:text-[12px] lg:placeholder:text-[16px] focus:ring-2 focus:ring-[#0F3D2E] transition-all outline-none appearance-none
                        ${error ? "ring-2 ring-red-500" : ""}
                        ${isDate ? `
                            [&::-webkit-calendar-picker-indicator]:opacity-0 
                            [&::-webkit-calendar-picker-indicator]:absolute 
                            [&::-webkit-calendar-picker-indicator]:w-full 
                            [&::-webkit-calendar-picker-indicator]:h-full 
                            [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        ` : ""}
                        `}
                        {...props}
                    />

                    {/* Icon for Address/Date/Regular fields */}
                    {Icon && !isPassword && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#323232] pointer-events-none">
                            <Icon size={20} />
                        </div>
                    )}

                    {/* Password Toggle */}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A8A8A8] hover:text-[#0F3D2E]"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    )}
                </div>

                {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
            </div>
        )
    }
)

OnboardingInput.displayName = "OnboardingInput"