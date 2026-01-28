import { Metadata } from "next"
import { LoginForm2 } from "./components/login-form-2"
import Image from "next/image"

export const metadata: Metadata = {
  title: 'Login | Antital',
  description: 'Access your Antital account to explore startups, manage your portfolio, and stay updated with the latest market trends.',
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-5">

      <div className="flex flex-col gap-4 p-6 md:p-10 col-span-3">

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <LoginForm2 />
          </div>
        </div>

        <p className="text-center text-sm text-[#858585] "
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
          }}
        >
          All rights reserved - Antital ©2025
          |  Built by GADA Studios
        </p>
      </div>

      <div className="relative hidden lg:block col-span-2">
        <Image
          src="/Login-Image.png"
          alt="Image"
          width={600}
          height={1024}
        />
      </div>

    </div>
  )
}
