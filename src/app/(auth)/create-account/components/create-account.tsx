import { SelectUserType } from '@/components/create-account/organisms/select-user-type'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function CreateAccount() {
    return (
        <div className="flex flex-col items-start gap-2 pb-[40px]">

            <Link href="/" className="block pb-[48px]">
                <ArrowLeft aria-label='Go Back' className="inline h-5 w-5 text-[#1B1B1B]" />
                <Image src="/icons/antital.svg" alt="Antital Logo" width={80} height={80} className='inline-block ml-2' />
            </Link>

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
                Select your account type to get started.
            </p>

            <div className="grid gap-4 pt-4">
                <SelectUserType />
            </div>
        </div>
    )
}
