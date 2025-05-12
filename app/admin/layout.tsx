"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  BookOpen,
  DollarSign,
  Settings,
  BarChart2,
  FileText,
  Bell,
  User,
  Shield,
  Menu,
  X,
  LogOut,
  Home,
  MessageSquare,
  Award,
  FileCheck,
  PieChart,
  Layers,
  Contact,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Badge } from "../../components/ui/badge"
import ContactInformationPage from "./contact-information/page"

interface SidebarItemProps {
  icon: React.ElementType
  label: string
  href: string
  active?: boolean
  badge?: string | number
}

const SidebarItem = ({ icon: Icon, label, href, active, badge }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-2 rounded-md transition-all duration-200",
        active
          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium"
          : "text-slate-200 hover:bg-white/10 hover:text-white",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </div>
      {badge && (
        <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
          {badge}
        </Badge>
      )}
    </Link>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }, [pathname])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      } else {
        setSidebarOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Set initial state based on window size

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md border-emerald-100 hover:bg-emerald-50"
        >
          {sidebarOpen ? <X className="h-5 w-5 text-emerald-600" /> : <Menu className="h-5 w-5 text-emerald-600" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-72 bg-gradient-to-b from-emerald-900 to-teal-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white/10">
              <Shield className="h-8 w-8 p-1 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ADMIN PANEL</span>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-white/10 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                <AvatarFallback className="bg-emerald-600 text-white">AD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-white/70">Super Admin</div>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-2 overflow-auto h-[calc(100vh-180px)]">
          <SidebarItem icon={PieChart} label="Dashboard" href="/admin" active={pathname === "/admin"} />
          <SidebarItem icon={User} label="My Profile" href="/admin/profile" active={pathname === "/admin/profile"} />
          <SidebarItem
            icon={Users}
            label="User Management"
            href="/admin/users"
            active={pathname === "/admin/users"}
            badge={245}
          />
            <SidebarItem
            icon={BookOpen}
            label="package"
            href="/admin/package"
            active={pathname === "/admin/package"}
          />
          <SidebarItem
            icon={BookOpen}
            label="Course Management"
            href="/admin/courses"
            active={pathname === "/admin/courses"}
          />
            <SidebarItem
            icon={BookOpen}
            label="upload-video"
            href="/admin/upload-video"
            active={pathname === "/admin/upload-video"}
          />
          <SidebarItem
            icon={Award}
            label="Affiliate Management"
            href="/admin/affiliates"
            active={pathname === "/admin/affiliates"}
            badge={12}
          />
          <SidebarItem
            icon={DollarSign}
            label="Payment Management"
            href="/admin/payments"
            active={pathname === "/admin/payments"}
          />
          <SidebarItem
            icon={FileCheck}
            label="KYC Verification"
            href="/admin/kyc"
            active={pathname === "/admin/kyc"}
            badge={8}
          />
          <SidebarItem
            icon={MessageSquare}
            label="Support Tickets"
            href="/admin/support"
            active={pathname === "/admin/support"}
            badge={5}
          />
          <SidebarItem
            icon={FileText}
            label="Marketing Materials"
            href="/admin/marketing"
            active={pathname === "/admin/marketing"}
          />
          <SidebarItem
            icon={BarChart2}
            label="Reports & Analytics"
            href="/admin/reports"
            active={pathname === "/admin/reports"}
          />
          <SidebarItem
            icon={Layers}
            label="Subscription Plans"
            href="/admin/plans"
            active={pathname === "/admin/plans"}
          />
            <SidebarItem
            icon={Contact}
            label="Contact Settings"
            href="/admin/contact"
            active={pathname === "/admin/contact"}
          />
            <SidebarItem
            icon={ContactInformationPage}
            label="Contact Information"
            href="/admin/contact-information"
            active={pathname === "/admin/contact-information"}
          />
          <SidebarItem
            icon={Settings}
            label="System Settings"
            href="/admin/settings"
            active={pathname === "/admin/settings"}
          />
          
        </nav>
        <div className="mt-auto p-4 border-t border-white/10">
          <div className="text-xs text-white/50 text-center">© 2025 Learning Hub Admin | v1.0.0</div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out pt-16",
          sidebarOpen ? "lg:ml-72" : "lg:ml-0",
        )}
      >
        {/* Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-72 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-30">
          <div className="lg:flex items-center gap-2 hidden">
            <h1 className="font-semibold text-lg text-slate-800">
              {pathname === "/admin" && "Admin Dashboard"}
              {pathname === "/admin/users" && "User Management"}
              {pathname === "/admin/courses" && "Course Management"}
              {pathname === "/admin/affiliates" && "Affiliate Management"}
              {pathname === "/admin/payments" && "Payment Management"}
              {pathname === "/admin/kyc" && "KYC Verification"}
              {pathname === "/admin/support" && "Support Tickets"}
              {pathname === "/admin/marketing" && "Marketing Materials"}
              {pathname === "/admin/reports" && "Reports & Analytics"}
              {pathname === "/admin/plans" && "Subscription Plans"}
              {pathname === "/admin/settings" && "System Settings"}
              {pathname === "/admin/profile" && "My Profile"}
            </h1>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Link href="/dashboard" className="hidden sm:block">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Home className="h-4 w-4 mr-2" />
                View User Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                5
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="bg-emerald-600 text-white">AD</AvatarFallback>
                  </Avatar>
                  <span className="font-medium hidden sm:inline">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <div className="p-3 md:p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
