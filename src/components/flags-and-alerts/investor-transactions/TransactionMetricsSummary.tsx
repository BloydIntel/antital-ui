"use client";

export interface TransactionMetric {
    label: string;
    value: string | number;
    highlightColor?: string;
}

interface TransactionMetricsProps {
    metrics: TransactionMetric[];
}

export function TransactionMetricsSummary({ metrics }: TransactionMetricsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {metrics.map((item, idx) => (
                <div
                    key={idx}
                    className="bg-white px-4 py-6 rounded-lg border border-[#EAEAEA] space-y-2"
                >
                    <p className="text-[16px] font-normal text-[#858585]">
                        {item.label}
                    </p>
                    <h3
                        className="text-[28px] font-bold text-[#365852]"
                        style={{ color: item.highlightColor || "#11110F" }}
                    >
                        {item.value}
                    </h3>
                </div>
            ))}
        </div>
    );
}