import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxGroupProps {
    options: string[];
    optionsSpan?: string[];
    className?: string;
}

export const CheckboxGroup = ({ options, optionsSpan, className = "" }: CheckboxGroupProps) => (
    <div className={cn("grid grid-cols-1 gap-1 pt-2 pb-[16px]", className)}>
        {options.map((option, i) => (
            <label
                key={option}
                className="flex items-center gap-1 p-1 rounded-lg cursor-pointer transition-colors"
            >
                <Checkbox
                    className="mr-1 lg:mr-2 border-[#042E27] data-[state=checked]:bg-[#042E27] data-[state=checked]:text-white"
                />
                <div className="flex flex-wrap gap-x-1 items-baseline">
                    <span className="text-[14px] text-[#1A1A1A]">
                        {option}
                    </span>
                    {optionsSpan?.[i] && (
                        <span className="text-[14px] text-[#858585]">
                            {optionsSpan[i]}
                        </span>
                    )}
                </div>
            </label>
        ))}
    </div>
);