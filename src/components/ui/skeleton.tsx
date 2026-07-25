import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-[#E5E7EB] dark:bg-[#374151]",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-shimmer before:bg-gradient-to-r",
        "before:from-transparent before:via-white/60 before:to-transparent",
        "dark:before:via-white/10",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
