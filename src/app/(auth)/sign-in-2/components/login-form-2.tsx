"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export function LoginForm2({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-4", className)} {...props} action="/dashboard">

      <div className="flex flex-col items-start gap-2 pb-[40px]">

        <Image src="/antital_logo.png" alt="Antital Logo" width={80} height={80} className="pb-[48px]" />

        <h1 className="text-[#1B1B1B] leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
          style={{
            fontFamily: "var(--font-clash-display)",
            fontWeight: 500,
            letterSpacing: "-1%",
          }}>Welcome back  to Antital</h1>

        <p
          className="text-[#505050] leading-tight text-base"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
            letterSpacing: "-1%",
          }}
        >
          Welcome back! Discover new startups, manage your portfolio, and stay ahead of the market.
        </p>

      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="johndoe@email.com" className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="**********" className="focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none" required />
        </div>

        <div className="flex justify-between items-center">

          <div className="flex items-center">
            <Input id="remember" type="checkbox" className="mr-2 w-[12px] h-[12px] accent-[#042E27]" />
            <Label htmlFor="remember" className="inline-block text-[14px]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 400,
                letterSpacing: "-1%",
              }}
            >Remember me for 30 days</Label>
          </div>

          <a
            href="/auth/forgot-password-2"
            className="text-[#7BA147] ml-auto text-base"
            style={{
              fontFamily: "var(--font-rethink-sans)",
              fontWeight: 500,
              letterSpacing: "-1%",
            }}
          >
            Forgot your password?
          </a>

        </div>

        <Button type="submit" className="bg-[#042E27] w-full cursor-pointer transition-all duration-300 ease-in-out hover:h-[38px] hover:bg-[#042E27] hover:shadow-[0_5px_0_0_#042E27] hover:border-b-1 hover:border-[#7BA147] hover:items-start">
          Login
        </Button>

      </div>

      <div className="text-center text-base"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontWeight: 400,
          letterSpacing: "-1%",
        }}
      >
        Don&apos;t have an account?{" "}
        <a href="/auth/sign-up-2" className="text-[#7BA147]">
          Sign up
        </a>
      </div>
    </form>
  )
}
