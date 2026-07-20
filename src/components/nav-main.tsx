"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import useLogout from "@/hooks/use-logout"

export type NavMainItem = {
  title: string
  url: string
  icon?: React.ComponentType<React.ComponentProps<"svg">>
  iconClassName?: string
  isActive?: boolean
  action?: "logout"
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}

export function NavMain({
  label,
  items,
}: {
  label?: string
  items: NavMainItem[]
}) {
  const pathname = usePathname()
  const logoutMutation = useLogout()

  // Check if any subitem is active to determine if parent should be open
  const shouldBeOpen = (item: NavMainItem) => {
    if (item.isActive) return true
    return item.items?.some(subItem => pathname === subItem.url) || false
  }

  return (
    <SidebarGroup className="flex flex-col">
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={shouldBeOpen(item)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="cursor-pointer"
                      isActive={shouldBeOpen(item)}
                    >
                      <Link href={item.url}>
                        {item.icon && (
                          <item.icon
                            className={cn(
                              "size-5 transition-all",
                              item.iconClassName // Apply the specific focus style here
                            )}
                          />
                        )}
                        <span className="text-[16px]">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild className="cursor-pointer" isActive={pathname === subItem.url}>
                            <Link
                              href={subItem.url}
                              target={(item.title === "Auth Pages" || item.title === "Errors") ? "_blank" : undefined}
                              rel={(item.title === "Auth Pages" || item.title === "Errors") ? "noopener noreferrer" : undefined}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : item.action === "logout" ? (
                <SidebarMenuButton
                  tooltip={item.title}
                  className="cursor-pointer"
                  disabled={logoutMutation.isPending}
                  onClick={() => logoutMutation.mutate()}
                >
                  {item.icon && (
                    <item.icon className={cn("transition-all", item.iconClassName)} />
                  )}
                  <span className="text-[16px]">
                    {logoutMutation.isPending ? "Logging out…" : item.title}
                  </span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="cursor-pointer"
                  isActive={pathname === item.url}
                >
                  <Link href={item.url}>
                    {item.icon && (
                      <item.icon className={cn("transition-all", item.iconClassName)} />
                    )}
                    <span className="text-[16px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>

    </SidebarGroup>
  )
}
