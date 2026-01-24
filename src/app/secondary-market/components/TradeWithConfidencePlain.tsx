import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function TradeWithConfidencePlain() {
    return (
        <section>
            <div className="flex flex-col gap-6 justify-center items-center py-32">

                <div>
                    <h2
                        className="text-foreground dark:text-[#e3e3e3] text-center leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
                        style={{
                            fontFamily: "var(--font-rethink-sans)",
                            fontWeight: 500,
                            letterSpacing: "-1%",
                        }}
                    > Trade with Confidence.</h2>
                    <h2
                        className="text-foreground dark:text-[#e3e3e3] text-center leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
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
        </section>
    )
}
