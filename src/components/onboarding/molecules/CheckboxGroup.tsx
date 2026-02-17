import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxGroupProps {
    options: string[];
    optionsSpan?: string[];
    className?: string;
    value?: string[];
    onChange?: (value: string[]) => void;
}

export const CheckboxGroup = ({ options, optionsSpan, className = "", value = [], onChange }: CheckboxGroupProps) => {

    const handleCheckChange = (option: string, checked: boolean) => {
        if (checked) {
            onChange?.([...value, option]);
        } else {
            onChange?.(value.filter((item) => item !== option));
        }
    };

    return (
        <div className={cn("grid grid-cols-1 gap-1 pt-2 pb-[16px]", className)}>
            {options.map((option, i) => (
                <label
                    key={option}
                    className="flex items-center gap-1 p-1 rounded-lg cursor-pointer transition-colors"
                >
                    <Checkbox
                        checked={value.includes(option)}
                        onCheckedChange={(checked) => handleCheckChange(option, !!checked)}
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
    )
};