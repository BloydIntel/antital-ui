export type AlertSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type AlertCategory = "AML/Fraud" | "Regulatory" | "Operational";

export interface AlertItem {
    id: string;
    flagId: string;
    timeAgo: string;
    type: AlertCategory;
    severity: AlertSeverity;
    entityAffected: string;
    description: string;
}

export interface AlertSummary {
    criticalAlerts: number;
    warnings: number;
    actionedToday: number;
}