"use client"

import React, { ChangeEvent, useState } from "react"
import { Eye, EyeOff, LucideIcon } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { TYPOGRAPHY } from "@/constants/styles"
import { cn } from "@/lib/utils"

interface CustomChangeEvent {
    target: {
        name?: string;
        value: string
    };
}

interface InputProps {
    label?: string
    error?: string
    icon?: LucideIcon
    className?: string
    type?: string
    placeholder?: string
    value?: string | Date | number | null
    onChange?: (e: OnboardingChangeEvent) => void
    onBlur?: () => void
    name?: string
    inputAreaStyle?: string
    disabled?: boolean
    labelStyle?: string
    autoComplete?: string
}

type OnboardingChangeEvent =
    | ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>
    | CustomChangeEvent;

type OnboardingRef = HTMLInputElement | HTMLTextAreaElement

const getDateObject = (val: unknown): Date | null => {
    if (!val) return null;
    if (val instanceof Date) return val;

    // If it's a string or number, try to parse it
    if (typeof val === 'string' || typeof val === 'number') {
        const parsed = new Date(val);
        return isNaN(parsed.getTime()) ? null : parsed;
    }

    return null;
};

export const OnboardingInput = React.forwardRef<OnboardingRef, InputProps>(
    ({ label, error, icon: Icon, type, className, placeholder, value, onChange, onBlur, inputAreaStyle, disabled, labelStyle, autoComplete, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)
        const isPassword = type === "password"
        const isDate = type === "date"
        const isTextarea = type === "textarea"

        const inputStyles = cn(
            "w-full h-[48px] px-4 rounded-lg",
            "bg-[#F4F5F7] text-[#1A1A1A]",
            "placeholder:text-[#858585]",
            "placeholder:text-[12px] lg:placeholder:text-[16px]",
            "focus:ring-2 focus:ring-[#0F3D2E]",
            "transition-all outline-none appearance-none",
            isTextarea ? "min-h-[120px] py-3 resize-none" : "h-[48px]",
            inputAreaStyle,
            error && "ring-2 ring-red-500"
        )

        const togglePassword = () => setShowPassword(!showPassword)

        return (
            <div className={`w-full flex flex-col gap-2 pb-[16px] ${className || ""}`}>
                {label && <label
                    className={cn("text-[16px] text-[#1A1A1A] leading-tight", labelStyle)}
                    style={TYPOGRAPHY.body}
                >
                    {label}
                </label>}

                <div className="relative group">

                    {isDate ? (
                        <DatePicker
                            selected={getDateObject(value)}
                            onChange={(date: Date | null) => {
                                const stringValue = date ? date.toISOString().split('T')[0] : "";
                                onChange?.({ target: { name: props.name, value: stringValue } });
                            }}
                            onBlur={onBlur}
                            placeholderText={placeholder || "DD/MM/YYYY"}
                            dateFormat="dd/MM/yyyy"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            className={inputStyles}
                            disabled={disabled}
                        />
                    ) : isTextarea ? (
                        <textarea
                            ref={ref as React.Ref<HTMLTextAreaElement>}
                            placeholder={placeholder}
                            value={typeof value === 'string' ? value : ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={inputStyles}
                            name={props.name}
                            rows={4}
                            disabled={disabled}
                        />
                    ) : (
                        <input
                            ref={ref as React.Ref<HTMLInputElement>}
                            type={isPassword ? (showPassword ? "text" : "password") : type}
                            autoComplete={autoComplete || "on"}
                            placeholder={placeholder}
                            value={typeof value === 'string' ? value : ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            className={inputStyles}
                            disabled={disabled}
                            name={props.name}
                            {...props}
                        />
                    )}

                    {/* Icon for Address/Date/Regular fields */}
                    {Icon && !isPassword && !isTextarea && (
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