import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const tradeImages = [
    {
        src: "/secondary_market_landing_page/TradeWithConfidence-1.png",
        width: 100,
        height: 100,
        className: "absolute top-[72px] left-[9px]",
    },
    {
        src: "/secondary_market_landing_page/TradeWithConfidence-2.png",
        width: 120,
        height: 120,
        className: "absolute top-[24px] right-[183px]",
    },
    {
        src: "/secondary_market_landing_page/TradeWithConfidence-3.png",
        width: 100,
        height: 100,
        className: "absolute top-[327px] left-[218px]",
    },
    {
        src: "/secondary_market_landing_page/TradeWithConfidence-4.png",
        width: 100,
        height: 100,
        className: "absolute top-[231px] right-[55px]",
    },
]

export default function TradeWithConfidence() {
    return (
        <section>
            {/*Section Layout Container */}
            <div className="w-full bg-[#F4F5F7]">

                {/* Inner Content Container */}
                <div className="relative lg:w-full xl:w-[1440px] h-[471px] mx-auto flex flex-col justify-center items-center pt-6 pb-8 lg:pt-0 lg:pb-0">

                    {/* Text With Button Container */}
                    <div className="flex flex-col gap-6 justify-center items-center">

                        <div>
                            <h2
                                className="text-foreground dark:text-[#11110F] text-center leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 500,
                                    letterSpacing: "-1%",
                                }}
                            > Trade with Confidence.</h2>
                            <h2
                                className="text-foreground dark:text-[#11110F] text-center leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 500,
                                    letterSpacing: "-1%",
                                }}
                            > Stay in Control.</h2>
                        </div>

                        <p
                            className="text-muted-foreground leading-tight text-base lg:text-[18px]"
                            style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontWeight: 400,
                                letterSpacing: "-1%",
                            }}
                        >
                            Regulated. Transparent. Investor-first.
                        </p>

                        <div >
                            <Button className="rounded-lg h-16 px-4 gap-2 flex flex-row items-center justify-between w-full transition-all bg-[#B9C65B] hover:bg-[#B9C65B]/90 text-white"
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

                    {/* Image Container */}
                    <div className="hidden lg:block">
                        {tradeImages.map((img, index) => (
                            <Image
                                key={index}
                                src={img.src}
                                alt="Trade With Confidence Image"
                                width={img.width}
                                height={img.height}
                                className={img.className}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
