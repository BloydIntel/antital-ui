export interface AdminActivityLogSummary {
  totalActivities: number
  criticalAlerts: number
  financialEvents: number
  complianceEvents: number
  supportActivities: number
  systemEvents: number
}

export interface AdminActivityLogItem {
  id: string
  event: string
  eventType: string
  module: string
  entity: string
  performedBy: string
  occurredAtUtc: string
  priority: string
  status: string
  detail: string | null
}

export interface AdminActivityLogResponse {
  summary: AdminActivityLogSummary
  items: AdminActivityLogItem[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}
