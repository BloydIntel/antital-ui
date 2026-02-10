import { Checkbox } from "@/components/ui/checkbox";

export const CheckboxGroup = ({ options }: { options: string[] }) => (
    <div className="grid grid-cols-1 gap-1 pt-2 pb-[16px]">
        {options.map((option) => (
            <label key={option} className="flex items-center gap-1 p-1 rounded-lg cursor-pointer transition-colors">
                <Checkbox
                    className="mr-1 lg:mr-2 border-[#042E27] data-[state=checked]:bg-[#042E27] data-[state=checked]:text-white"
                />
                <span className="text-[15px] text-[#1A1A1A]">{option}</span>
            </label>
        ))}
    </div>
);
