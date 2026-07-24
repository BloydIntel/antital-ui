"use client"

import { ErrorPage } from "@/components/errors/error-page"

export function InternalServerError() {
  return (
    <ErrorPage
      code="500"
      title="Internal Server Error"
      description="Something went wrong on our end. We're working to fix the issue. Please try again later."
    />
  )
}
