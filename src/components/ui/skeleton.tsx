import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-[#E5E7EB] dark:bg-[#374151] animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
