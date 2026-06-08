export const DASHBOARD_PERIOD_OPTIONS = [
  "This month",
  "Last month",
  "Last 3 months",
  "Last 6 months",
  "Last 12 months",
] as const;

export type DashboardPeriodLabel = (typeof DASHBOARD_PERIOD_OPTIONS)[number];

const LABEL_TO_API: Record<DashboardPeriodLabel, string> = {
  "This month": "this-month",
  "Last month": "last-month",
  "Last 3 months": "last-3-months",
  "Last 6 months": "last-6-months",
  "Last 12 months": "last-12-months",
};

export function buildDashboardMonthOptions(): DashboardPeriodLabel[] {
  return [...DASHBOARD_PERIOD_OPTIONS];
}

export function toDashboardPeriod(selectedLabel: string): string {
  return LABEL_TO_API[selectedLabel as DashboardPeriodLabel] ?? "this-month";
}
