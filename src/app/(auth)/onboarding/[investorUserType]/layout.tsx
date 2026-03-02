import OnboardingSidebar from "@/components/onboarding/organisms/onboarding-sidebar/OnboardingSidebar"

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <div className="min-h-screen flex">

            {/* Sidebar */}
            <aside className="hidden lg:block sticky top-0 h-screen  bg-[#F4FBEA] border-r border-[#E6EEDC]">
                <OnboardingSidebar />
            </aside>


            {/* Main content */}
            <main className="flex flex-1 flex-col min-h-screen items-center bg-white">

                <div className="flex-1 flex flex-col justify-between items-center w-full">

                    <div className=" pt-8 lg:pt-[72px] px-4 lg:mx-auto min-h-screen">

                        {children}

                    </div>

                    <p className="text-center text-sm text-[#3D3D3D] py-7"

                        style={{

                            fontFamily: "var(--font-dm-sans)",

                            fontWeight: 400,

                        }}

                    >
                        All rights reserved - Antital ©2025
                        |  Built by GADA Studios
                    </p>

                </div>

            </main>

        </div>

    )
}