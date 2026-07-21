import React from "react";

export function ComingSoonBanner() {
  return (
    <div
      role="status"
      className="w-full bg-[#FFF8E6] border-b border-[#E8D48B] px-4 py-3 text-center text-[#5C4A00] text-sm font-medium"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      Coming soon — secondary market trading is not available yet.
    </div>
  );
}
