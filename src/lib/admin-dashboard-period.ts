export const ADMIN_DASHBOARD_PERIODS = [
  { label: "Last 7 Days", value: "last-7-days" },
  { label: "Last 30 Days", value: "last-30-days" },
  { label: "Last 90 Days", value: "last-90-days" },
] as const

export type AdminDashboardPeriod = (typeof ADMIN_DASHBOARD_PERIODS)[number]["value"]

export function adminPeriodLabel(value: AdminDashboardPeriod) {
  return ADMIN_DASHBOARD_PERIODS.find((period) => period.value === value)?.label ?? "Last 30 Days"
}
