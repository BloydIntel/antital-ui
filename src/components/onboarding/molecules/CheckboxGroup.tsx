export const CheckboxGroup = ({ options }: { options: string[] }) => (
    <div className="grid grid-cols-1 gap-3 mt-2 pb-[16px]">
        {options.map((option) => (
            <label key={option} className="flex items-center gap-3 p-3 rounded-lg bg-[#F4F5F7] hover:bg-[#EAECEF] cursor-pointer transition-colors">
                <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-gray-300 text-[#0F3D2E] focus:ring-[#0F3D2E]"
                />
                <span className="text-[15px] text-[#1A1A1A]">{option}</span>
            </label>
        ))}
    </div>
);