export interface AdminAlertItem {
  id: number
  flagId: string
  occurredAtUtc: string
  type: string
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  status: string
  entityAffected: string
  description: string
}
export interface AdminAlertsResponse {
  summary: { criticalAlerts: number; warnings: number; actionedToday: number }
  items: AdminAlertItem[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface AdminAlertDetail {
  id: number
  flagId: string
  occurredAtUtc: string
  type: string
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  status: string
  entityAffected: string
  description: string
}
