"use client"

import { useState } from "react";
import { Upload } from "lucide-react";
import { OnboardingButton } from "@/components/onboarding/molecules/OnboardingButton";
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
} from "@/components/ui/select";
import { DistributionsCard } from "@/components/flags-and-alerts/investor-portfolio/investor-portfolio-details/DistributionsCard";

export default function TestingPage() {
    const [priorityFilter, setPriorityFilter] = useState("all");
    const changePriority = (value: string) => {
        setPriorityFilter(value);
    };
    return (
        <div>
            <div className="flex items-center gap-3">
                {/* Priority Filter Dropdown */}
                <Select value={priorityFilter} onValueChange={changePriority}>
                    <SelectTrigger className="!h-12 w-full sm:w-[170px] border-[#A8A8A8] rounded-sm bg-white">
                        <SelectValue placeholder="Filter by Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="CRITICAL">Critical</SelectItem>
                            <SelectItem value="HIGH">High</SelectItem>
                            <SelectItem value="MEDIUM">Medium</SelectItem>
                            <SelectItem value="LOW">Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/* Export Button */}
                <OnboardingButton
                    variant="solid"
                    type="button"
                    label="Export"
                    icon={<Upload className="w-4 h-4" />}
                    className="my-0 w-fit"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
                {/* Left Column */}
                <div className="lg:col-span-3 space-y-6">
                    Text
                </div>

                {/* Right Column */}
                <div className="lg:col-span-7 space-y-6">
                    <DistributionsCard />
                </div>
            </div>
        </div>
    )
}
