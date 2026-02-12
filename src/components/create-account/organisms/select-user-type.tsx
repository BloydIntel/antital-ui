"use client"

import { UserTypeCard } from "@/components/create-account/molecules/user-type-card"

type IconType = "user" | "globe" | "naira"

interface UserType {
    id: string,
    title: string;
    description: string;
    iconType: IconType;
}

const userTypes: UserType[] = [
    {
        id: "individual",
        title: "Individual Investor",
        description: "Start your personal investment journey",
        iconType: "user"
    },
    {
        id: "corporate",
        title: "Corporate Investor",
        description: "Invest as an organization",
        iconType: "globe"
    },
    {
        id: "fundraiser",
        title: "Fundraiser (MSME)",
        description: "Raise capital for your business",
        iconType: "naira"
    },
]

export function SelectUserType() {
    return (
        <div className="space-y-3">
            {userTypes.map((type) => (
                <UserTypeCard
                    key={type.id}
                    title={type.title}
                    description={type.description}
                    cardType={type.iconType}
                />
            ))}
        </div>
    )
}
