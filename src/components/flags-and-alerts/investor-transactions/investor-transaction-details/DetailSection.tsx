
interface DetailSectionProps {
    title: string;
    children: React.ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
    return (
        <div className="space-y-4 pt-4 border-t border-[#EAEAEA]">
            <h3 className="text-[15px] font-semibold text-[#11110F]">{title}</h3>
            {children}
        </div>
    );
}