"use client"

import UserTypeCard from "@/components/create-account/molecules/user-type-card"

const userTypes = [
    {
        id: "individual",
        title: "Individual Investor",
        description: "Start your personal investment journey",
        src: "/create-account/User-icon.png",
        alt: "User Icon",
    },
    {
        id: "corporate",
        title: "Corporate Investor",
        description: "Invest as an organization",
        src: "/create-account/Globe-icon.png",
        alt: "Globe Icon",
    },
    {
        id: "fundraiser",
        title: "Fundraiser (MSME)",
        description: "Raise capital for your business",
        src: "/create-account/Naira-icon.png",
        alt: "Naira Icon",
    },
]

export function SelectUserType() {
    return (
        <div className="space-y-3">
            {userTypes.map((type) => (
                <UserTypeCard
                    key={type.id}
                    src={type.src}
                    alt={type.alt}
                    title={type.title}
                    description={type.description}
                    onClick={() => {
                        console.log("Selected:", type.id)
                    }}
                />
            ))}
        </div>
    )
}
