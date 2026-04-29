"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

const DEFAULT_IMAGES = {
    user: "/create-account/User-icon.png",
    globe: "/create-account/Globe-icon.png",
    naira: "/create-account/Naira-icon.png",
} as const

const ONBOARDING_FIRST_STEP: Record<string, string> = {
    individual: "personal",
    corporate: "company",
    fundraiser: "company",
}

type CardType = keyof typeof DEFAULT_IMAGES

interface BaseProps {
    title: string
    subTitle?: string
    description: string
    userPath?: string
    onClick?: () => void
}

interface CustomImageProps extends BaseProps {
    src: string
    alt: string // Required if custom src is provided
    cardType?: never
}

interface DefaultImageProps extends BaseProps {
    src?: never
    alt?: string
    cardType: CardType // Required if no src is provided
}

type UserTypeCardProps = CustomImageProps | DefaultImageProps

export function UserTypeCard(props: UserTypeCardProps) {
    const { title, subTitle, description, src, alt, cardType, userPath, onClick } = props
    const router = useRouter()
    const imageSrc = src || (cardType ? DEFAULT_IMAGES[cardType] : "")
    const imageAlt = alt || (cardType ? `${cardType} icon` : "icon")

    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        if (userPath) {
            const firstStep = ONBOARDING_FIRST_STEP[userPath]
            router.push(firstStep ? `/onboarding/${userPath}/${firstStep}` : `/onboarding/${userPath}`)
        }
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            className="group w-full lg:w-[557px] lg:min-h-[82px] cursor-pointer flex gap-4 border border-gray-200 rounded-md p-4 bg-white text-left transition-all duration-200 hover:border-[#A7B832] hover:shadow-sm"
        >
            {/* Icon box */}
            <div className="flex items-center justify-center w-[48px] h-[48px] rounded bg-[#EDF7DF] transition-colors duration-200 group-hover:bg-[#A7B832] shrink-0">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={24}
                    height={24}
                    className="object-contain transition-all duration-200 group-hover:brightness-0 group-hover:invert"
                />
            </div>

            {/* Text content area */}
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-[12px] lg:text-base font-normal text-[#2C2C2C]">
                        {title}
                    </span>
                    {subTitle && (
                        <span className="text-[10px] lg:text-[12px] text-[#858585] font-normal">
                            {subTitle}
                        </span>
                    )}
                </div>
                <p className="text-[12px] lg:text-[14px] text-[#858585] mt-1 leading-tight">
                    {description}
                </p>
            </div>
        </button>
    )
}
