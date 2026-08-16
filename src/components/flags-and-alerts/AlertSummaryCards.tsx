import React from "react";
import { AlertSummary } from "@/types/flags-and-alerts";

interface AlertSummaryCardsProps {
    summary: AlertSummary;
}

export function AlertSummaryCards({ summary }: AlertSummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Critical Alerts */}
            <div className="bg-white p-6 rounded-md border border-gray-100 ">
                <p className="text-gray-500 text-sm font-medium mb-2">Critical Alerts</p>
                <p className="text-3xl font-semibold text-[#DC2626]">
                    {summary.criticalAlerts}
                </p>
            </div>

            {/* Warnings */}
            <div className="bg-white p-6 rounded-md border border-gray-100 ">
                <p className="text-gray-500 text-sm font-medium mb-2">Warnings</p>
                <p className="text-3xl font-semibold text-[#D97706]">
                    {summary.warnings}
                </p>
            </div>

            {/* Actioned Today */}
            <div className="bg-white p-6 rounded-md border border-gray-100 ">
                <p className="text-gray-500 text-sm font-medium mb-2">Actioned Today</p>
                <p className="text-3xl font-semibold text-[#042E27]">
                    {summary.actionedToday}
                </p>
            </div>
        </div>
    );
}