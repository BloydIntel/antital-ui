import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatCompactNumber = (value: number): string => {
  if (!value && value !== 0) return "0";

  // For numbers less than 1000, just return the number
  if (value < 1000) return value.toString();

  const formatter = Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return formatter.format(value);
};