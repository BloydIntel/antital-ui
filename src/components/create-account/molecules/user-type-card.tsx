import Image from "next/image"

type UserTypeCardProps = {
    src: string,
    alt: string,
    title: string
    description: string
    onClick?: () => void
}

export default function UserTypeCard({
    src,
    alt,
    title,
    description,
    onClick,
}: UserTypeCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full lg:w-[557px] lg:h-[82px] flex items-center gap-4 border border-gray-200 rounded-md p-4 bg-white text-left transition hover:border-green-400 hover:shadow-sm
      "
        >
            {/* Icon box */}
            <div className="flex items-center justify-center w-[48px] h-[48px] rounded bg-green-50">
                <Image src={src} alt={alt} width={24} height={24} />
            </div>

            {/* Text */}
            <div>
                <p className="text-base font-medium text-gray-900 pb-[8px]">
                    {title}
                </p>
                <p className="text-base text-[#858585]">
                    {description}
                </p>
            </div>
        </button>
    )
}
