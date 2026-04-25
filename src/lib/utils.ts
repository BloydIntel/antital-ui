import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatCompactNumber = (value: number | null | undefined): string => {
  // Handle null, undefined, or non-finite numbers (NaN/Infinity)
  if (value == null || !Number.isFinite(value)) {
    return "0";
  }

  // Return raw string for small values to avoid "1.0" for small integers
  if (Math.abs(value) < 1000) {
    return value.toString();
  }

  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return formatter.format(value);
};