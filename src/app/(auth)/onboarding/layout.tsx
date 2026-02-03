// app/(auth)/onboarding/layout.tsx
import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar"

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-[320px] bg-[#F4FBEA] border-r border-[#E6EEDC]">
                <OnboardingSidebar />
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-white">
                <div className="max-w-3xl px-16 py-14">
                    {children}
                </div>
            </main>
        </div>
    )
}
