import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar"

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="hidden lg:block max-w-[410px] bg-[#F4FBEA] border-r border-[#E6EEDC]">
                <OnboardingSidebar />
            </aside>

            {/* Main content */}
            <main className="flex flex-1 flex-col items-center bg-white">

                <div className="flex-1 flex flex-col justify-between items-center w-full">

                    <div className="pt-[144px] px-[236px]">
                        {children}
                    </div>

                    <p className="text-center text-sm text-[#3D3D3D] pb-7"
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
