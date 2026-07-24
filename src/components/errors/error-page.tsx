"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface ErrorPageProps {
  code: string
  title: string
  description: string
}

/** Viewport-fit error shell (no oversized template image / no page scroll). */
export function ErrorPage({ code, title, description }: ErrorPageProps) {
  const router = useRouter()

  return (
    <div className="mx-auto flex h-dvh max-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-8">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-5xl font-bold tracking-tight md:text-6xl">{code}</h1>
        <h2 className="mb-3 text-xl font-semibold md:text-2xl">{title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed md:text-base">{description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button className="cursor-pointer" onClick={() => router.push("/dashboard")}>
            Go Back Home
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => router.push("/help-center")}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}
