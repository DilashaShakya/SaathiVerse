"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from "@/components/ui/sidebar"

import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  Smile,
} from "lucide-react"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function AppSidebar() {
  const pathname = usePathname()

  const items = [
    { icon: <Smile />, href: "/profile", color: "pink" },
    { icon: <Home />, href: "/users/dashboard", color: "yellow" },
    { icon: <Inbox />, href: "/users/inbox", color: "pink" },
    { icon: <Calendar />, href: "/users/calendar", color: "yellow" },
    { icon: <Search />, href: "/users/search", color: "pink" },
    { icon: <Settings />, href: "/users/settings", color: "yellow" },
  ]

  return (
    <div className="ml-2 mt-6 rounded-2xl p-[2px] bg-gradient-to-br from-yellow-100 to-pink-100 shadow-sm">
      <Sidebar className="bg-white rounded-2xl w-[70px] p-3 flex flex-col items-center">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map(({ icon, href, color }, i) => {
                const isActive = pathname === href
                const activeStyles =
                  color === "pink"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-yellow-100 text-yellow-600"
                const hoverStyles =
                  color === "pink"
                    ? "hover:bg-pink-100 text-pink-500"
                    : "hover:bg-yellow-100 text-yellow-600"

                return (
                  <SidebarMenuItem key={i}>
                    <Link href={href} passHref>
                      <SidebarMenuButton
                        className={`
                          ${isActive ? activeStyles : ""}
                          ${hoverStyles}
                          rounded-xl transition-all duration-200
                        `}
                      >
                        {icon}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
