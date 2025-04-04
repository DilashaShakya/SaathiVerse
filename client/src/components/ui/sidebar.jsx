// src/components/ui/sidebar.jsx
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const SidebarContext = React.createContext()

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error("useSidebar must be used inside SidebarProvider")
  return context
}

export const Sidebar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        "h-screen bg-white border-r w-[70px] p-3 rounded-2xl shadow-sm flex flex-col items-center",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-1 flex-col w-full", className)} {...props} />
  )
})
SidebarContent.displayName = "SidebarContent"

export const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-4", className)} {...props} />
  )
})
SidebarGroup.displayName = "SidebarGroup"

export const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => {
  return <ul ref={ref} className={cn("flex flex-col items-center gap-4", className)} {...props} />
})
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => {
  return <li ref={ref} className={cn("", className)} {...props} />
})
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"
