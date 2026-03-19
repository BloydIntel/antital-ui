import { cn } from "@/lib/utils";

interface RadioGroupProps {
    options: string[];
    name: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const RadioGroup = ({ options, name, value, onChange }: RadioGroupProps) => {
    // Determine if we should stack vertically (block) or horizontally (inline)
    const isBlockLayout = options.length > 2;

    return (
        <div
            className={`flex mt-2 pb-[16px] ${isBlockLayout
                ? "flex-col gap-4" // Block layout for 3+ options
                : "flex-row flex-wrap gap-6" // Inline layout for 1-2 options
                }`}
        >
            {options.map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer group w-fit">
                    <div className=" flex items-center justify-center">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={(e) => onChange?.(e.target.value)}
                            className={cn(
                                // 1. Reset native appearance
                                "appearance-none w-4 h-4 rounded-full border-2 border-gray-300",
                                "bg-white transition-all cursor-pointer",
                                "checked:border-[#042E27]",
                                // 3. The "Inner Dot" using a radial gradient (creates the space)
                                "checked:bg-[radial-gradient(circle,_#042E27_40%,_transparent_45%)]",
                            )}
                        />

                    </div>

                    <span className="text-[14px] lg:text-[16px] text-[#1A1A1A] font-[family-name:var(--font-dm-sans)]">
                        {option}
                    </span>
                </label>
            ))}
        </div>
    );
};