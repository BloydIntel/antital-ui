import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: 'Create Account | Antital',
    description: 'Create your account on Antital to get started.',
}

export default function LoginPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-5">

            <div className="flex flex-col gap-4 p-6 md:p-10 col-span-3">

                <div className="flex flex-1 items-center justify-center">

                    <div className="flex flex-col gap-4">

                        <div className="flex flex-col items-start gap-2 pb-[40px]">

                            <Image src="/antital_logo.png" alt="Antital Logo" width={80} height={80} className="pb-[48px]" />

                            <h1 className="text-[#1B1B1B] leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
                                style={{
                                    fontFamily: "var(--font-clash-display)",
                                    fontWeight: 500,
                                }}>Welcome back to Antital</h1>

                            <p
                                className="text-[#505050] leading-tight text-base"
                                style={{
                                    fontFamily: "var(--font-dm-sans)",
                                    fontWeight: 400,
                                }}
                            >
                                Welcome back! Discover new startups, manage your portfolio, and stay ahead of the market.
                            </p>

                            <div className="grid gap-4">

                            </div>

                        </div>

                    </div>

                </div>

                <p className="text-center text-sm text-[#858585] "
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                    }}
                >
                    All rights reserved - Antital ©2025
                    |  Built by GADA Studios
                </p>
            </div>

            <div className="relative hidden lg:block col-span-2">
                <Image
                    src="/create-account-page.png"
                    alt="Image"
                    width={600}
                    height={1024}
                />
            </div>

        </div>
    )
}