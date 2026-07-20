import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import React from 'react'

export function SecondaryMarketHero() {

    const buttonDetails = [
        { label: "Invest Now", variant: "primary" },
        { label: "Create an account", variant: "secondary" },
    ];

    return (
        <section className="bg-background flex justify-center items-center w-full md:h-[560px] pt-6 pb-[120px] md:py-[64px] gap-[62px] mx-auto lg:mx-0">
            <div>
                {/* Content Container */}
                <div className="w-full md:w-[816px] md:h-[205px] gap-[24px]">
                    <h1
                        className='text-foreground text-4xl sm:text-6xl w-full md:text-[64px] md:w-[816px] md:h-[133px]'
                        style={{
                            fontFamily: "var(--font-rethink-sans)",
                            fontWeight: 500,
                            fontStyle: "Medium",
                            letterSpacing: "-1%",
                            textAlign: "center",
                        }}
                    >
                        Access Opportunities Beyond the Close
                    </h1>
                    <p
                        className="text-muted-foreground md:h-[48px] pt-6 md:pt-12"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 400,
                            fontStyle: "Regular",
                            fontSize: 20,
                            letterSpacing: "-1%",
                            textAlign: "center",

                        }}
                    >
                        Antital connects everyday Nigerians with startups and small businesses.
                        Making wealth creation simple, transparent, and inclusive.
                    </p>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col md:flex-row items-center justify-center w-full md:w-[816px] h-[64px] gap-[24px] pt-[120px]">
                    {buttonDetails.map((action, index) => (
                        <Button
                            key={index}
                            disabled
                            aria-disabled
                            className={`rounded-lg h-16 px-4 gap-2 flex flex-row items-center justify-between w-full transition-all opacity-60 cursor-not-allowed
                                        ${action.variant === 'primary'
                                    ? "bg-[#7A6FF0] text-white"
                                    : "bg-[#F2F1FE] text-[#5C53B4] border border-[#7A6FF0]"}`}
                            style={{
                                fontFamily: 'var(--font-rethink-sans)',
                                fontWeight: 500,
                                fontSize: '16px',
                                lineHeight: '21px',
                                width: '287px',
                            }}
                            type="button"
                        >
                            <span>{action.label}</span>
                            <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
                        </Button>))}
                </div>
            </div>
        </section>
    )
}
