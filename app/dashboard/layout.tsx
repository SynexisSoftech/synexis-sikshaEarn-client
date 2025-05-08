"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  BookOpen,
  Home,
  User,
  FileCheck,
  Layers,
  LinkIcon,
  Award,
  DollarSign,
  FileOutput,
  Users,
  BarChart2,
  FileText,
  Medal,
  Menu,
  X,
  Bell,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

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
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium"
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

export default function DashboardLayout({
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
          className="bg-white shadow-md"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
          "fixed top-0 bottom-0 left-0 z-40 w-72 bg-gradient-to-b from-indigo-900 to-purple-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-4">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white/10">
              <Image src="/placeholder.svg?height=32&width=32" alt="Logo" fill className="object-contain p-1" />
            </div>
            <span className="font-bold text-lg tracking-tight">LEARNING HUB</span>
          </div>
        </div>
        <div className="p-2">
          <div className="bg-white/10 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white/20">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-indigo-600 text-white">BS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Bishnu Shah</div>
                <div className="text-xs text-white/70">Premium Member</div>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex flex-col gap-1 p-2 overflow-auto h-[calc(100vh-180px)]">
          <SidebarItem icon={Home} label="Dashboard" href="/dashboard" active={pathname === "/dashboard"} />
          <SidebarItem
            icon={BookOpen}
            label="My Courses"
            href="/dashboard/mycourses"
            active={pathname === "/dashboard/mycourses"}
            badge={3}
          />
          <SidebarItem
            icon={User}
            label="Profile"
            href="/dashboard/profile"
            active={pathname === "/dashboard/profile"}
          />
          <SidebarItem icon={FileCheck} label="KYC" href="/dashboard/kyc" active={pathname === "/dashboard/kyc"} />
          <SidebarItem icon={Layers} label="Plan" href="/dashboard/plan" active={pathname === "/dashboard/plan"} />
          <SidebarItem
            icon={LinkIcon}
            label="Affiliate Link"
            href="/dashboard/affiliate-link"
            active={pathname === "/dashboard/affiliate-link"}
          />
          <SidebarItem
            icon={Award}
            label="Leaderboard"
            href="/dashboard/leaderboard"
            active={pathname === "/dashboard/leaderboard"}
          />
          <SidebarItem
            icon={DollarSign}
            label="Payouts"
            href="/dashboard/payouts"
            active={pathname === "/dashboard/payouts"}
          />
          <SidebarItem
            icon={FileOutput}
            label="Withdrawal Request"
            href="/dashboard/withdrawal"
            active={pathname === "/dashboard/withdrawal"}
          />
          <SidebarItem
            icon={Users}
            label="My Affiliates"
            href="/dashboard/affiliates"
            active={pathname === "/dashboard/affiliates"}
          />
          <SidebarItem
            icon={BarChart2}
            label="Traffic"
            href="/dashboard/traffic"
            active={pathname === "/dashboard/traffic"}
          />
          <SidebarItem
            icon={FileText}
            label="Marketing Material"
            href="/dashboard/marketing"
            active={pathname === "/dashboard/marketing"}
          />
          <SidebarItem
            icon={Medal}
            label="Qualification"
            href="/dashboard/qualification"
            active={pathname === "/dashboard/qualification"}
          />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10">
          <div className="text-xs text-white/50 text-center">© 2025 Learning Hub | All Rights Reserved</div>
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
              {pathname === "/dashboard" && "Dashboard"}
              {pathname === "/dashboard/mycourses" && "My Courses"}
              {pathname === "/dashboard/profile" && "Profile"}
              {pathname === "/dashboard/kyc" && "KYC Verification"}
              {pathname === "/dashboard/plan" && "Subscription Plans"}
              {pathname === "/dashboard/affiliate-link" && "Affiliate Links"}
              {pathname === "/dashboard/leaderboard" && "Leaderboard"}
              {pathname === "/dashboard/payouts" && "Payouts"}
              {pathname === "/dashboard/withdrawal" && "Withdrawal Requests"}
              {pathname === "/dashboard/affiliates" && "My Affiliates"}
              {pathname === "/dashboard/traffic" && "Traffic Analytics"}
              {pathname === "/dashboard/marketing" && "Marketing Materials"}
              {pathname === "/dashboard/qualification" && "Qualifications"}
            </h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-indigo-600 text-white">BS</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">Bishnu Shah</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileCheck className="mr-2 h-4 w-4" />
                  <span>KYC</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Layers className="mr-2 h-4 w-4" />
                  <span>Subscription</span>
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
        <div className="p-4 md:p-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function LogOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}
