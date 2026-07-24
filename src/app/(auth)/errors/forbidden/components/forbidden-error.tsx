"use client"

import { ErrorPage } from "@/components/errors/error-page"

export function ForbiddenError() {
  return (
    <ErrorPage
      code="403"
      title="Forbidden"
      description="Access to this resource is forbidden. You don't have the necessary permissions to view this page."
    />
  )
}
