import Image from 'next/image'
import React from 'react'

export default function ImportantRiskDisclosure() {
    return (
        <section>
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center xl:w-[1232px] mx-auto px-4 pb-8 lg:py-32">

                {/*Text Container */}
                <div className="w-full lg:w-[608px]">
                    <h2
                        className=" mb-6 text-[#11110F] dark:text-muted-foreground text-[28px] font-medium leading-tight lg:text-[36px]"
                        style={{
                            fontFamily: "var(--font-rethink-sans)",
                            fontWeight: 500,
                            fontStyle: "Medium",
                            letterSpacing: "-1%",
                        }}
                    >Important Risk Disclosure</h2>

                    <div
                        className="text-[#505050] leading-tight text-base lg:text-[18px] space-y-3"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontWeight: 400,
                            letterSpacing: "-1%",
                        }}
                    >
                        <p>  Secondary market investments are speculative and involve risk, including the possible loss of principal. Liquidity is not guaranteed, and securities may not be easily resold.</p>

                        <p>  Prices are determined solely by willing buyers and sellers. Antital does not influence pricing, promote specific trades, or provide investment advice. Past performance does not guarantee future results. </p>

                        <p>  Investors are encouraged to seek independent professional advice before participating.</p>
                    </div>
                </div>

                {/* Caution Image Container */}
                <div>
                    <Image
                        src="/secondary_market_landing_page/Warning.png"
                        alt="Caution Icon"
                        width={256}
                        height={256}
                    />
                </div>

            </div>
        </section>
    )
}
