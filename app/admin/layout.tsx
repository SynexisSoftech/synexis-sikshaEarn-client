"use client"

import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "./components/admin-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toast } = useToast()

  // Show welcome toast on initial load
  useEffect(() => {
    toast({
      title: "Welcome to Knowledge Hub Admin",
      description: "You're logged in as Administrator",
    })
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SidebarProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <AdminSidebar />
          <div className="flex flex-col pt-16 md:pt-0 md:pl-64">{children}</div>
          <Toaster />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  )
}
