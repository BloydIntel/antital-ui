import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

export default function HowToInvest() {

    const investmentSteps = [
        { title: "Step 1 — Access the Market", desc: "Log in to your Antital account and navigate to the Secondary Market section.", imageUrl: "/secondary_market_landing_page/investment-step-1.png" },
        { title: "Step 2 — Browse Available Offers", desc: "Review buy and sell offers, including company details, performance updates, unit pricing, fees, and settlement timelines.", imageUrl: "/secondary_market_landing_page/investment-step-2.png" },
    ]

    return (
        <section>
            {/* Layout Container */}
            <div
                className="flex flex-col lg:flex-row lg:gap-24 xl:w-[1232px]  mx-auto px-4 xl:px-0 pt-10 lg:pt-27"
            >
                {/* Content Container (Right) */}
                <div
                    className="flex flex-col gap-8 w-full lg:w-[608px] lg:h-[246px] px-6 lg:px-0"
                >
                    <h2
                        className="text-foreground leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
                        style={{
                            fontFamily: "var(--font-rethink-sans)",
                            fontWeight: 500,
                            letterSpacing: "-1%",
                        }}
                    >
                        How to Invest on the Secondary Market
                    </h2>

                    <p
                        className="text-[#3D3D3D] leading-tight text-base lg:text-[18px]"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 400,
                            letterSpacing: "-1%",
                        }}
                    >
                        To participate in the Secondary Market, investors must meet regulatory and platform requirements.
                    </p>

                    <div className="flex items-center justify-center md:justify-start">
                        <Button className="rounded-lg h-16 px-4 gap-2 flex flex-row items-center justify-between w-full transition-all 
                                        bg-[#F2F1FE] hover:bg-[#F2F1FE]/90 text-[#5C53B4] border border-[#7A6FF0]"
                            style={{
                                fontFamily: 'var(--font-rethink-sans)',
                                fontWeight: 500,
                                fontSize: '16px',
                                lineHeight: '21px',
                                width: '287px',
                            }}
                            asChild >
                            <Link href="/invest-now" className="flex items-center justify-between w-full">
                                <span>Invest Now</span>
                                <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Image with title Container (left) */}
                <div className="flex flex-col gap-8 lg:mt-0 mt-12">
                    {investmentSteps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4 bg-[#F4F5F7] pt-6 pb-4 px-4 lg:w-[532px] lg:h-[431px]"
                        >
                            <h4
                                className="text-[#A7B832]"
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 500,
                                    fontStyle: "Medium",
                                    fontSize: 24,
                                    letterSpacing: "-1%",

                                }}
                            >
                                {step.title}
                            </h4>
                            <p
                                className="text-[#505050] leading-tight text-[16px]"
                                style={{
                                    fontFamily: "var(--font-dm-sans)",
                                    fontWeight: 400,
                                    letterSpacing: "-1%",
                                }}
                            >
                                {step.desc}
                            </p>
                            <Image src={step.imageUrl} alt={step.title} width={532} height={200} />
                        </div>

                    ))
                    }

                </div>
            </div>
        </section>
    )
}
