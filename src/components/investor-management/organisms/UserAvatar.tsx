"use client";

import Image from "next/image";
import { TYPOGRAPHY } from "@/constants/styles";

interface UserAvatarProps {
    name: string;
    imageUrl?: string | null;
    size?: number | string; // e.g. 48, "w-12 h-12", etc.
    className?: string;
}

export function UserAvatar({
    name,
    imageUrl,
    size = 48,
    className = "",
}: UserAvatarProps) {
    // Extract first two initials if no image is present
    const initials = name
        ? name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "?";

    const dimensionStyle =
        typeof size === "number"
            ? { width: `${size}px`, height: `${size}px`, minWidth: `${size}px`, minHeight: `${size}px` }
            : {};

    const dimensionClass = typeof size === "string" ? size : "w-12 h-12"; // Default fallback 48px

    if (imageUrl) {
        return (
            <div
                className={`relative rounded-full overflow-hidden shrink-0 ${dimensionClass} ${className}`}
                style={dimensionStyle}
            >
                <Image
                    src={imageUrl}
                    alt={name || "User Avatar"}
                    fill
                    className="object-cover"
                />
            </div>
        );
    }

    return (
        <div
            className={`rounded-full bg-[#30534C] text-white flex items-center justify-center shrink-0 select-none ${dimensionClass} ${className}`}
            style={{
                ...TYPOGRAPHY.heading,
                fontWeight: 500,
                ...dimensionStyle,
            }}
        >
            {initials}
        </div>
    );
}