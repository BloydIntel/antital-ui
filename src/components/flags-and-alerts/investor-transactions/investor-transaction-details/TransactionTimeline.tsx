import { CheckCircle2 } from "lucide-react";
import { TimelineEvent } from "@/types/transaction";

interface TransactionTimelineProps {
    events: TimelineEvent[];
}

export function TransactionTimeline({ events }: TransactionTimelineProps) {
    return (
        <div className="relative pl-6 space-y-6">
            {/* Vertical connector line centered directly behind the icons */}
            <div className="absolute left-[9px] top-2 bottom-2 w-[2px] bg-[#45B424]" />

            {events.map((event, index) => (
                <div key={index} className="relative flex items-center justify-between text-[12px] lg:text-[14px] gap-2">
                    {/* Filled checkmark icon */}
                    <div className="absolute -left-[24px] bg-white rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-white fill-[#45B424]" />
                    </div>

                    <span className="text-[#505050] shrink-0 font-normal pl-2">
                        {event.date}
                    </span>
                    <span className="text-[#505050] flex-1 px-4">
                        {event.description}
                    </span>
                    <span className="text-[#505050] font-normal shrink-0 text-right">
                        {event.actor}
                    </span>
                </div>
            ))}
        </div>
    );
}