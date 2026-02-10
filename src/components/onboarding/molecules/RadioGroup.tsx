export const RadioGroup = ({ options, name }: { options: string[], name: string }) => (
    <div className="flex flex-wrap gap-6 mt-2 pb-[16px]">
        {options.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
                {/* Hidden Native Radio */}
                <div className="relative flex items-center justify-center">
                    <input
                        type="radio"
                        name={name}
                        className="peer sr-only" // sr-only hides it visually but keeps it accessible
                    />

                    {/* Custom Square Box */}
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-[4px] 
                                  peer-checked:border-[#042E27] peer-checked:bg-[#042E27] 
                                  transition-all flex items-center justify-center">

                        {/* Inner Dot or Square (visible only when checked) */}
                        <div className="w-2 h-2 bg-white rounded-[1px] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                </div>

                <span className="text-[16px] text-[#1A1A1A] font-medium font-[family-name:var(--font-dm-sans)]">
                    {option}
                </span>
            </label>
        ))}
    </div>
);