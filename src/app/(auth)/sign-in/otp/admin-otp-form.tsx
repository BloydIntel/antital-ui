"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertCircle, ArrowLeft } from "lucide-react"
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton"
import authService from "@/services/authService"
import { ApiError } from "@/lib/api-error"
import { tokenStorage } from "@/lib/token-storage"
import { usePendingOtpStore } from "@/store/pendingOtpStore"
import { useUserStore } from "@/store/userStore"
import { useOnboardingStore } from "@/store/onboardingStore"
import { mapApiIdentityToStoreUserType } from "@/lib/user-type"
import { useQueryClient } from "@tanstack/react-query"
import { CACHE_KEY_USER } from "@/constants"

interface AdminOtpFormProps {
    onVerifySuccess?: () => void
}

export function AdminOtpForm({ onVerifySuccess }: AdminOtpFormProps) {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [isLoading, setIsLoading] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const queryClient = useQueryClient()
    const challengeId = usePendingOtpStore((state) => state.challengeId)
    const remember = usePendingOtpStore((state) => state.remember)
    const clearPendingOtp = usePendingOtpStore((state) => state.clearPendingOtp)

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1)
        }

        if (value && !/^\d$/.test(value)) return

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

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault()

        const code = otp.join("")
        if (code.length !== 6) {
            setSubmitError("Enter the six-digit code sent to your email.")
            return
        }

        if (!challengeId) {
            setSubmitError("This OTP session has expired. Please sign in again.")
            return
        }

        setSubmitError(null)
        setIsLoading(true)

        try {
            const response = await authService.verifyOtp({ challengeId, code })

            if (response.requiresOtp || !response.token) {
                setSubmitError("OTP verification could not be completed. Please try again.")
                return
            }

            tokenStorage.setAccessToken(response.token, remember)
            if (response.refreshToken) {
                tokenStorage.setRefreshToken(response.refreshToken, remember)
            }

            const userType = mapApiIdentityToStoreUserType(response.userType, response.role)
            useUserStore.getState().setUserId(String(response.userId))
            useUserStore.getState().setRequiresOtp(false)
            useUserStore.getState().updateProfile({
                emailAddress: response.email,
                userType,
                isEmailVerified: response.isEmailVerified,
            })
            useOnboardingStore.getState().setEmailVerified(response.isEmailVerified)
            clearPendingOtp()
            queryClient.invalidateQueries({ queryKey: CACHE_KEY_USER })
            onVerifySuccess?.()
        } catch (error) {
            if (error instanceof ApiError) {
                setSubmitError(
                    error.getFieldError("code") ??
                    error.primaryMessage ??
                    "The code is invalid or has expired. Request a new code and try again."
                )
            } else {
                setSubmitError("Unable to verify the code. Please try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-start gap-2 pb-6">
                <Link href="/sign-in" className="block pb-8" onClick={clearPendingOtp}>
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

            <form onSubmit={handleVerify} autoComplete="off" className="flex flex-col gap-6">
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
                                aria-label={`OTP digit ${index + 1}`}
                                autoComplete="one-time-code"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck={false}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="w-[50px] sm:w-[79.33px] lg:w-[73px] xl:w-[79.33px] h-[48px] text-center text-[16px] text-[#505050] font-medium rounded-lg border border-[#E5E5E5] bg-[#F8F9FA] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#CAD484] focus:border-[#CAD484] transition-all"
                            />
                            {index === 2 && <span className="text-[#858585] font-light">—</span>}
                        </React.Fragment>
                    ))}
                </div>

                {submitError && (
                    <div
                        role="alert"
                        className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>{submitError}</span>
                    </div>
                )}

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
