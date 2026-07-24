"use client"

import { ErrorPage } from "@/components/errors/error-page"

export function UnauthorizedError() {
  return (
    <ErrorPage
      code="401"
      title="Unauthorized"
      description="You don't have permission to access this resource. Please sign in or contact your administrator."
    />
  )
}
