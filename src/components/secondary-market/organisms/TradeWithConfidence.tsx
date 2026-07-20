import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

interface TradeWithConfidenceProps {
    variant?: 'with-images' | 'plain'
    className?: string
}

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

export function TradeWithConfidence({
    variant = 'with-images',
    className,
}: TradeWithConfidenceProps) {
    const hasImages = variant === 'with-images'

    return (
        <section>
            {/* Section Layout Container */}
            <div
                className={cn(
                    hasImages && 'w-full bg-[#F4F5F7]',
                    className
                )}
            >
                {/* Inner Content Container */}
                <div
                    className={cn(
                        hasImages
                            ? 'relative lg:w-full xl:w-[1440px] h-[471px] mx-auto flex flex-col justify-center items-center pt-6 pb-8 lg:pt-0 lg:pb-0'
                            : 'flex flex-col gap-6 justify-center items-center py-32'
                    )}
                >
                    {/* Text With Button Container */}
                    <div className="flex flex-col gap-6 justify-center items-center">
                        <div>
                            <h2
                                className={cn(
                                    'text-center leading-tight text-3xl lg:text-[36px] lg:leading-[40px]',
                                    hasImages
                                        ? 'text-foreground dark:text-[#11110F]'
                                        : 'text-foreground dark:text-[#e3e3e3]'
                                )}
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 500,
                                    letterSpacing: "-1%",
                                }}
                            >
                                Trade with Confidence.
                            </h2>

                            <h2
                                className={cn(
                                    'text-center leading-tight text-3xl lg:text-[36px] lg:leading-[40px]',
                                    hasImages
                                        ? 'text-foreground dark:text-[#11110F]'
                                        : 'text-foreground dark:text-[#e3e3e3]'
                                )}
                                style={{
                                    fontFamily: "var(--font-rethink-sans)",
                                    fontWeight: 500,
                                    letterSpacing: "-1%",
                                }}
                            >
                                Stay in Control.
                            </h2>
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

                        {/* Button */}
                        <div>
                            <Button
                                disabled
                                aria-disabled
                                className={cn(
                                    'group rounded-lg px-4 flex flex-row items-center justify-between transition-all text-white opacity-60 cursor-not-allowed',
                                    hasImages
                                        ? 'bg-[#B9C65B] h-[64px] w-[287px] gap-[74px]'
                                        : 'bg-[#B9C65B] h-[48px] w-[242px]'
                                )}
                                style={{
                                    fontFamily: 'var(--font-rethink-sans)',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    lineHeight: '21px',
                                }}
                                type="button"
                            >
                                <span>
                                    Go to Secondary Market
                                </span>
                                <ArrowRight className="h-7 w-7" strokeWidth={2.5} />
                            </Button>
                        </div>
                    </div>

                    {/* Conditional Images */}
                    {hasImages && (
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
                    )}
                </div>
            </div>
        </section>
    )
}
