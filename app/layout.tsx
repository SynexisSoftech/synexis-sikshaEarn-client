import type { Metadata } from "next"
import { Inter, Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import BackToTop from "@/components/BackToTop"
import AuthProvider from "./providers" // New component

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})
const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Sikshaearn - Empowering Lifelong Learners",
  description:
    "Sikshaearn is a leading educational platform specializing in digital marketing courses and professional development.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${montserrat.variable} font-sans`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            <main>{children}</main>
            <BackToTop />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}