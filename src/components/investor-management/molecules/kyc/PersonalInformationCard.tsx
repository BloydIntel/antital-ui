import { PersonalInformation } from "@/types/admin-investor-kyc";

interface PersonalInformationCardProps {
    info: PersonalInformation;
}

export function PersonalInformationCard({ info }: PersonalInformationCardProps) {
    const fields = [
        { label: "Full name", value: info.fullName },
        { label: "Date of birth", value: info.dateOfBirth },
        { label: "Gender", value: info.gender },
        { label: "Phone number", value: info.phoneNumber },
        { label: "Email address", value: info.emailAddress },
        { label: "Residential address", value: info.residentialAddress },
    ];

    return (
        <div className="bg-white rounded-lg border border-[#EAEAEA]">
            <h3 className="font-bold text-[16px] text-[#11110F] py-5 px-4 border-b border-[#EAEAEA]">Personal Information</h3>
            <div className="space-y-4 p-4">
                {fields.map((item) => (
                    <div key={item.label}>
                        <p className="text-[14px] text-[#858585]">{item.label}</p>
                        <p className="text-[16px] text-[#11110F] mt-2">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}