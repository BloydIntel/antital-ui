
interface DetailSectionProps {
    title: string;
    children: React.ReactNode;
}

export function DetailSection({ title, children }: DetailSectionProps) {
    return (
        <div className="pt-4.5 border-t border-[#EAEAEA]">
            <h3 className="text-[16px] font-medium text-[#11110F] pb-4">{title}</h3>
            <div className="space-y-8.5 ">
                {children}
            </div>
        </div>
    );
}