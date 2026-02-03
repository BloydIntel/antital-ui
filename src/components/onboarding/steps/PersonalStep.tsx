"use client"

import { useRouter } from "next/navigation"

export function PersonalStep() {
    const router = useRouter()

    return (
        <div className="max-w-xl space-y-6">
            <h1 className="text-3xl font-semibold">
                Start Your Investment Journey
            </h1>

            <input className="input" placeholder="Nationality" />
            <input className="input" placeholder="State" />

            <button
                className="btn-primary"
                onClick={() => router.push("/onboarding/email")}
            >
                Continue
            </button>
        </div>
    )
}