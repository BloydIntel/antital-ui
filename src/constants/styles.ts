export const FONTS = {
    rethink: "var(--font-rethink-sans)",
    dmSans: "var(--font-dm-sans)",
};

export const TYPOGRAPHY = {
    heading: {
        fontFamily: FONTS.rethink,
        fontWeight: 500,
        letterSpacing: "-1%",
    },
    body: {
        fontFamily: FONTS.dmSans,
        fontWeight: 400,
        letterSpacing: "-1%",
    },
} as const;