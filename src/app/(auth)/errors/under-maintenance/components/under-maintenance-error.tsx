"use client"

import { ErrorPage } from "@/components/errors/error-page"

export function UnderMaintenanceError() {
  return (
    <ErrorPage
      code="503"
      title="Under Maintenance"
      description="The service is currently unavailable. Please try again later."
    />
  )
}
