import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export function WhatIsTheAntitalSecondaryMarket() {
    return (
        <section>
            <div className="relative overflow-hidden">
                {/* Layout container */}
                <div
                    className="relative bg-[#F4B942] mx-auto flex items-center px-6 py-12 lg:w-[1232px] lg:h-[455px] lg:px-8"
                >
                    {/* Content Container */}
                    <div
                        className="z-10 w-full max-w-[607px] space-y-6"
                    >
                        <h2
                            className="text-foreground leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
                            style={{
                                fontFamily: "var(--font-rethink-sans)",
                                fontWeight: 500,
                                letterSpacing: "-1%",
                            }}
                        >
                            What Is the Antital Secondary Market?
                        </h2>

                        <p
                            className="text-muted-foreground leading-tight text-base lg:text-[18px]"
                            style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontWeight: 400,
                                letterSpacing: "-1%",
                            }}
                        >
                            The Secondary Market is Antital&apos;s regulated marketplace where existing investors
                            can sell their previously acquired investment units to other eligible investors at mutually agreed prices.
                            <br />
                            Unlike the primary market—where investments are made directly during a fundraising campaign—the secondary
                            market does not raise new capital for businesses. It simply enables ownership transfer of already-issued
                            units, in line with SEC regulations and Antital platform rules.
                        </p>

                        <div className="flex items-center justify-center md:justify-start">
                            <Button className="rounded-lg h-16 px-4 gap-2 flex flex-row items-center justify-between w-full transition-all bg-[#365852] hover:bg-[#365852]/90 text-white"
                                style={{
                                    fontFamily: 'var(--font-rethink-sans)',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '21px',
                                    width: '287px',
                                }}
                                asChild >
                                <Link href="/go-to-secondary-market" className="flex items-center justify-between w-full">
                                    <span>Go to Secondary Market</span>
                                    <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Image Container (desktop only) */}
                <div
                    className="hidden md:block absolute top-0 h-full w-[693px] right-[calc(50%-616px)]"
                >
                    <div className="relative w-full h-full">
                        <Image
                            src="/secondary_market_landing_page/what-is-the-antital-secondary-market-image.png"
                            alt="What is the Antital Secondary Market Illustration"
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
