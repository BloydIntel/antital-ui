import { CheckCircle2 } from "lucide-react";
import { TimelineEvent } from "@/types/transaction";

interface TransactionTimelineProps {
    events: TimelineEvent[];
}

export function TransactionTimeline({ events }: TransactionTimelineProps) {
    return (
        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#EAEAEA]">
            {events.map((event, index) => (
                <div key={index} className="relative flex items-center justify-between text-[13px]">
                    <div className="absolute -left-[30px] bg-white">
                        <CheckCircle2 className="w-5 h-5 text-[#45B424] fill-white" />
                    </div>
                    <span className="text-[#858585] w-[150px] shrink-0 font-normal">
                        {event.date}
                    </span>
                    <span className="text-[#1B1B1B] font-medium flex-1 px-4">
                        {event.description}
                    </span>
                    <span className="text-[#858585] font-normal shrink-0 text-right">
                        {event.actor}
                    </span>
                </div>
            ))}
        </div>
    );
}