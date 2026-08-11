"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"

export function AdminOtpForm() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [isLoading, setIsLoading] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1)
        }

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").trim().slice(0, 6)
        if (!/^\d+$/.test(pastedData)) return

        const newOtp = [...otp]
        pastedData.split("").forEach((char, i) => {
            newOtp[i] = char
        })
        setOtp(newOtp)

        const nextIndex = Math.min(pastedData.length, 5)
        inputRefs.current[nextIndex]?.focus()
    }

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Mock OTP verification and navigate to admin dashboard
            router.push("/admin/dashboard")
        } catch (error) {
            console.error("OTP verification error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2 pb-6">
                <Link href="/admin/sign-in" className="block pb-8">
                    <ArrowLeft aria-label="Go Back" className="inline h-5 w-5 text-[#1B1B1B]" />
                    <Image
                        src="/icons/antital.svg"
                        alt="Antital Logo"
                        width={80}
                        height={80}
                        className="inline-block ml-2"
                    />
                </Link>

                <h1
                    className="text-[#1B1B1B] leading-tight text-[28px] lg:text-[36px] lg:leading-[40px]"
                    style={{
                        fontFamily: "var(--font-clash-display)",
                        fontWeight: 500,
                    }}
                >
                    Enter OTP
                </h1>
                <p
                    className="text-[#505050] leading-tight text-[14px] lg:text-base"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                    }}
                >
                    We sent an OTP to your registered email, enter it here.
                </p>
            </div>

            <form onSubmit={handleVerify} className="flex flex-col gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                        <React.Fragment key={index}>
                            <input
                                ref={(el) => {
                                    inputRefs.current[index] = el
                                }}
                                type="text"
                                inputMode="numeric"
                                placeholder="-"
                                maxLength={1}
                                value={digit}
                                autoComplete="one-time-code"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-[50px] sm:w-[79.33px] lg:w-[73px] xl-w-[79.33px] h-[48px] text-center text-[16px] text-[#505050] font-medium rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CAD484] focus:border-[#CAD484] transition-all"
                            />
                            {index === 2 && <span className="text-[#858585] font-light">—</span>}
                        </React.Fragment>
                    ))}
                </div>

                <OnboardingButton
                    type="submit"
                    label={isLoading ? "Verifying…" : "Verify"}
                    loading={isLoading}
                    disabled={otp.some((val) => val === "")}
                />
            </form>
        </div>
    )
}