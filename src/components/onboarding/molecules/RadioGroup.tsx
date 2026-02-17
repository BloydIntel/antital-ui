interface RadioGroupProps {
    options: string[];
    name: string;
    value?: string;
    onChange?: (value: string) => void;
}

export const RadioGroup = ({ options, name, value, onChange }: RadioGroupProps) => (
    <div className="flex flex-wrap gap-6 mt-2 pb-[16px]">
        {options.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
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
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-[4px] 
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