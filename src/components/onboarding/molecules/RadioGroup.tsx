export const RadioGroup = ({ options, name }: { options: string[], name: string }) => (
    <div className="flex flex-wrap gap-6 mt-2 pb-[16px]">
        {options.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer group">
                <input
                    type="radio"
                    name={name}
                    className="w-5 h-5 border-gray-300 text-[#042E27] focus:ring-[#042E27] cursor-pointer"
                />
                <span className="text-[16px] text-[#1A1A1A] font-medium">{option}</span>
            </label>
        ))}
    </div>
);