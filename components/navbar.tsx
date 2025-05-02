"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "COURSE PACKAGE", href: "/course-package" },
  { name: "COURSES", href: "/courses" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // ❌ Hide navbar on /admin routes
  if (pathname.startsWith("/admin")) {
    return null
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center">
                <span className="text-2xl font-bold font-montserrat tracking-tight text-gray-900">
                  Siksha<span className="text-primary font-extrabold">Earn</span>
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isActive ? "text-primary" : "text-gray-900 hover:text-primary"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    {!isActive && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button asChild variant="default" size="sm" className="hidden md:flex">
              <Link href="/login">LOGIN</Link>
            </Button>
            <button
              className="md:hidden p-2 rounded-md focus:outline-none text-gray-900"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-2 text-sm font-medium ${isActive ? "text-primary" : "text-gray-900 hover:text-primary"}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      {isActive && (
                        <motion.span layoutId="navbar-mobile-indicator" className="block h-0.5 w-12 mt-1 bg-primary" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
              <Button asChild variant="default" size="sm" className="w-full">
                <Link href="/login">LOGIN</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
