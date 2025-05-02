"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  BarChart3,
  Wallet,
  Layers,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest('[data-sidebar="true"]')) {
        setIsOpen(false)
      }
    }

    document.addEventListener("click", handleOutsideClick)
    return () => document.removeEventListener("click", handleOutsideClick)
  }, [isOpen])

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
      active: pathname === "/admin",
    },
    {
      label: "Students",
      icon: Users,
      href: "/admin/students",
      active: pathname === "/admin/students" || pathname?.startsWith("/admin/students/"),
      badge: "248",
    },
    {
      label: "Courses",
      icon: BookOpen,
      href: "/admin/courses",
      active: pathname === "/admin/courses" || pathname?.startsWith("/admin/courses/"),
      badge: "24",
    },
    {
      label: "Content",
      icon: FileText,
      href: "/admin/content",
      active: pathname === "/admin/content" || pathname?.startsWith("/admin/content/"),
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
      active: pathname === "/admin/analytics",
    },
    {
      label: "Payments",
      icon: Wallet,
      href: "/admin/payments",
      active: pathname === "/admin/payments",
      badge: "12",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      href: "/admin/messages",
      active: pathname === "/admin/messages",
      badge: "5",
    },
    {
      label: "Resources",
      icon: Layers,
      href: "/admin/resources",
      active: pathname === "/admin/resources",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
      active: pathname === "/admin/settings",
    },
    {
      label: "Help & Support",
      icon: HelpCircle,
      href: "/admin/support",
      active: pathname === "/admin/support",
    },
  ]

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile sidebar overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        data-sidebar="true"
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-[85%] sm:w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo and header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">KH</span>
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">Knowledge Hub</span>
            </Link>
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-8 w-8 rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 bg-slate-100 dark:bg-slate-700 border-none"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all hover:text-teal-600 dark:hover:text-teal-400",
                      route.active
                        ? "bg-gradient-to-r from-teal-50 to-teal-100 text-teal-600 dark:from-teal-900/20 dark:to-teal-800/20 dark:text-teal-400"
                        : "text-slate-700 dark:text-slate-300",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <route.icon className="h-4 w-4" />
                      <span>{route.label}</span>
                    </div>
                    {route.badge && (
                      <Badge
                        variant={route.active ? "default" : "outline"}
                        className={cn(
                          "ml-auto",
                          route.active
                            ? "bg-teal-600 hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600"
                            : "text-slate-600 dark:text-slate-400",
                        )}
                      >
                        {route.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="border-2 border-teal-500">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-teal-100 text-teal-800">AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">admin@knowledgehub.com</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto">
                    <DropdownMenuItem className="p-3 cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">New student enrollment</span>
                        <span className="text-xs text-muted-foreground">Priya Patel enrolled in SEO Masterclass</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">Course review received</span>
                        <span className="text-xs text-muted-foreground">
                          New 5-star review for Digital Marketing Fundamentals
                        </span>
                        <span className="text-xs text-muted-foreground">5 hours ago</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-3 cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">Payment processed</span>
                        <span className="text-xs text-muted-foreground">Rs. 12,500 payment received</span>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="justify-center text-center cursor-pointer">
                    <span className="text-sm text-teal-600 dark:text-teal-400">View all notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full mt-4 justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
