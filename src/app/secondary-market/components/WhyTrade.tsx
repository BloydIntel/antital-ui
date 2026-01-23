import React from 'react'
import Image from "next/image"

const features = [
    {
        title: "Improved Liquidity",
        desc: "Exit investments before maturity, subject to demand and regulatory conditions.",
        imageUrl: "/secondary_market_landing_page/why-trade-1.png",
        span: 1,
        width: 544,
        height: 281,
        fit: "contain",
    },
    {
        title: "Market-Driven Pricing",
        desc: "Discover unit value based on supply, demand, and company performance since initial funding.",
        imageUrl: "/secondary_market_landing_page/why-trade-2.png",
        span: 1,
        width: 544,
        height: 281,
        fit: "cover",
    },
    {
        title: "Shorter Investment Tenure",
        desc: "Access debt instruments closer to maturity for potentially faster returns.",
        imageUrl: "/secondary_market_landing_page/why-trade-3.png",
        span: 2,
        width: 1136,
        height: 302,
        fit: "contain",
    },
    {
        title: "Portfolio Flexibility",
        desc: "Rebalance your portfolio or gain exposure to previously funded companies.",
        imageUrl: "/secondary_market_landing_page/why-trade-4.png",
        span: 1,
        width: 544,
        height: 281,
        fit: "cover",
    },
    {
        title: "Regulated & Transparent",
        desc: "All trades occur within a controlled, SEC-approved, auditable environment.",
        imageUrl: "/secondary_market_landing_page/why-trade-5.png",
        span: 1,
        width: 544,
        height: 281,
        fit: "cover",
    },
]

export default function WhyTrade() {
    return (
        <section>

            {/* Layout Container */}
            <div className="relative bg-[#F4F5F7] lg:w-[1232px] mx-auto my-15 md:my-27 px-4 py-8">

                {/* Header Text */}
                <h2
                    className=" mb-6 md:mb-10 text-[#212121] text-center text-[28px] font-medium leading-tight lg:text-[36px]"
                    style={{
                        fontFamily: "var(--font-rethink-sans)",
                        fontWeight: 500,
                        fontStyle: "Medium",
                        letterSpacing: "-1%",
                    }}
                >
                    Why Trade on Antital&apos;s Secondary Market?
                </h2>


                {/* Decorative Question Mark */}
                <div
                    className="hidden md:block pointer-events-none absolute top-[-65px] right-[28px] z-1 rotate-[15.05deg] text-[#B9C65B] text-[256px] leading-none select-none"
                    style={{
                        fontFamily: "var(--font-rethink-sans)",
                        fontWeight: 500,
                        fontStyle: "Medium",
                        letterSpacing: "-1%",
                    }}
                >
                    ?
                </div>

                {/* Grid Container */}
                <div className="relative z-10 grid gap-6 sm:grid-cols-2 px-4 pt-4">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className={`rounded-xl bg-white p-6 shadow-sm ${item.span === 2 ? "sm:col-span-2" : ""}`}
                        >
                            <h4
                                className="mb-4 text-[24px] text-[#1F1F1F]"
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 500,
                                    fontStyle: "Medium",
                                    letterSpacing: "-1%",
                                }}
                            >
                                {item.title}
                            </h4>

                            <p
                                className="mb-4 text-[16px] text-[#505050]"
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 400,
                                    fontStyle: "Regular",
                                    letterSpacing: "-1%",
                                }}
                            >
                                {item.desc}
                            </p>

                            <div
                                className=" w-full rounded-lg"

                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={item.width}
                                    height={item.height}
                                />
                            </div>
                        </div>
                    ))}
                </div>




            </div>

        </section>
    )
}
