"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import useLogin from "@/hooks/use-login"
import { ApiError } from "@/lib/api-error"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
})

type LoginValues = z.infer<typeof loginSchema>

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const loginMutation = useLogin()

  const from = searchParams.get("from")
  const isTrading = from === "trading"

  const title = isTrading
    ? "Create an Account to Invest In NEXUS AI"
    : "Welcome back to Antital"

  const description = isTrading
    ? "Sign up in minutes and gain access to exclusive AI investment opportunities."
    : "Welcome back! Discover new startups, manage your portfolio, and stay ahead of the market."

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  })

  function onSubmit(values: LoginValues) {
    loginMutation.mutate(values)
  }

  useEffect(() => {
    if (!loginMutation.isError || !(loginMutation.error instanceof ApiError))
      return
    const err = loginMutation.error as ApiError
      ; (["email", "password"] as const).forEach((field) => {
        const msg = err.getFieldError(field)
        if (msg) form.setError(field, { message: msg })
      })
  }, [loginMutation.isError, loginMutation.error, form])

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col items-start gap-2 pb-[40px]">
        <Link href="/" className="block pb-[48px]">
          <ArrowLeft aria-label='Go Back' className="inline h-5 w-5 text-[#1B1B1B]" />
          <Image src="/icons/antital_logo.png" alt="Antital Logo" width={80} height={80} className='inline-block ml-2' />
        </Link>
        <h1
          className="text-[#1B1B1B] leading-tight text-3xl lg:text-[36px] lg:leading-[40px]"
          style={{
            fontFamily: "var(--font-clash-display)",
            fontWeight: 500,
          }}
        >
          {title}
        </h1>
        <p
          className="text-[#505050] leading-tight text-base"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontWeight: 400,
          }}
        >
          {description}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@email.com"
                    className="focus-visible:ring-1 focus-visible:ring-[#042E27] focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="**********"
                      className="focus-visible:ring-1 focus-visible:ring-[#042E27] focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#042E27] focus:outline-none transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mr-1 lg:mr-2 border-[#042E27] data-[state=checked]:bg-[#042E27] data-[state=checked]:text-white"
                    />
                  </FormControl>
                  <FormLabel
                    className="inline-block text-[12px] lg:text-[14px] cursor-pointer"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontWeight: 400,
                    }}
                  >
                    Remember me for 30 days
                  </FormLabel>
                </FormItem>
              )}
            />
            <a
              href="/auth/forgot-password-2"
              className="text-[#7BA147] ml-auto text-sm lg:text-base"
              style={{
                fontFamily: "var(--font-rethink-sans)",
                fontWeight: 500,
              }}
            >
              Forgot your password?
            </a>
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full max-w-[540px] h-12 px-4 py-2 gap-2 mb-[6px] rounded-lg font-medium text-base leading-[21px] shadow-none transition-all duration-300 border border-[#042E27] bg-[#042E27] text-white [&:hover]:bg-[#042E27] [&:hover]:text-white [&:hover]:border-[#042E27] [&:hover]:shadow-[0_6px_0px_#0C4037] disabled:opacity-50"
            style={{
              fontFamily: "var(--font-rethink-sans)",
            }}
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Logging in…
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>

      <div
        className="text-center text-base"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontWeight: 400,
        }}
      >
        Don&apos;t have an account yet?{" "}
        <a href="/create-account" className="text-[#7BA147]">
          Sign up
        </a>
      </div>
    </div>
  )
}
