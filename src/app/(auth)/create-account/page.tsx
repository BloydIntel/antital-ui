import { Metadata } from "next"
import Image from "next/image"
import { CreateAccount } from "./components/create-account"

export const metadata: Metadata = {
    title: 'Create Account | Antital',
    description: 'Create your account on Antital to get started.',
}

export default function CreateAccountPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-5">


            <div className="flex flex-col gap-4 p-6 md:p-10 col-span-3">

                <div className="flex flex-1 items-center justify-center">

                    <div className="flex flex-col gap-4">

                        <CreateAccount />

                    </div>

                </div>

                <p className="text-center text-sm text-[#858585]"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontWeight: 400,
                    }}
                >
                    All rights reserved - Antital ©2025
                    |  Built by GADA Studios
                </p>
            </div>

            <div className="relative hidden lg:block col-span-2 min-h-screen">
                <Image
                    src="/create-account-page.png"
                    alt="Create Account illustration"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 1024px) 40vw, 0px"
                />
            </div>

        </div>
    )
}