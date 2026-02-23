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
                    {/* Hidden Native Radio */}
                    <div className="relative flex items-center justify-center">
                        <input
                            type="radio"
                            name={name}
                            value={option}
                            checked={value === option}
                            onChange={(e) => onChange?.(e.target.value)}
                            className="peer sr-only"
                        />

                        {/* Custom Square Box */}
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-[4px] 
                                      peer-checked:border-[#042E27] peer-checked:bg-[#042E27] 
                                      transition-all flex items-center justify-center">

                            {/* Inner Dot or Square (visible only when checked) */}
                            <div className="w-2 h-2 bg-white rounded-[1px] opacity-0 peer-checked:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    <span className="text-[14px] lg:text-[16px] text-[#1A1A1A] font-[family-name:var(--font-dm-sans)]">
                        {option}
                    </span>
                </label>
            ))}
        </div>
    );
};