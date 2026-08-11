"use client"

import Image from "next/image"
import { AdminOtpForm } from "./admin-otp-form"

interface AdminOtpPageLayoutProps {
    onVerifySuccess: () => void
}

export function AdminOtpPageLayout({ onVerifySuccess }: AdminOtpPageLayoutProps) {
    return (
        <div className="grid min-h-screen lg:grid-cols-5 bg-white -m-4 sm:-m-6 lg:-m-8">
            <div className="flex flex-col gap-4 p-6 md:p-10 col-span-3">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xl">
                        <AdminOtpForm onVerifySuccess={onVerifySuccess} />
                    </div>
                </div>

                <p
                    className="text-center text-sm text-[#858585]"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                    }}
                >
                    All rights reserved - Antital ©2025 | Built by GADA Studios
                </p>
            </div>

            <div className="relative hidden lg:block col-span-2 min-h-screen">
                <Image
                    src="/create-account/create-account-page.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 40vw, 0px"
                />
            </div>
        </div>
    )
}