"use client"

import { ErrorPage } from "@/components/errors/error-page"

export function NotFoundError() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      description="The page you are looking for doesn't exist or has been moved to another location."
    />
  )
}
