"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import PackageCard from "./packageCard"
import { CheckCircle2, HelpCircle, Loader2 } from "lucide-react"

// Define the API package data structure to match what's actually returned
interface Course {
  _id: string
  title: string
  videoPlaylist: string[]
}

interface ApiPackage {
  _id: string
  category: string
  price: number | string
  description: string
  courseRefs: Course[] // Changed from features to courseRefs
  image: string | null
}

// Define the structure expected by PackageCard
interface FormattedPackage {
  name: string
  price: string
  description: string
  features: { name: string; included: boolean }[]
  image: string
  gradientClass: string
  buttonClass: string
  popular?: boolean
  numericPrice: number // Add this to help with sorting
}

const CoursePackages = () => {
  const [packages, setPackages] = useState<FormattedPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Map category to gradient and button classes
  const categoryStyles: Record<string, { gradientClass: string; buttonClass: string }> = {
    Silver: {
      gradientClass: "from-slate-200 to-slate-400",
      buttonClass: "bg-slate-600 hover:bg-slate-700",
    },
    Gold: {
      gradientClass: "from-amber-200 to-amber-400",
      buttonClass: "bg-amber-600 hover:bg-amber-700",
    },
    Diamond: {
      gradientClass: "from-sky-200 to-sky-400",
      buttonClass: "bg-sky-600 hover:bg-sky-700",
    },
    Heroic: {
      gradientClass: "from-purple-200 to-purple-400",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
    },
  }

  // Fetch packages from API
  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get("/api/admin/package")

        if (response.data.success) {
          // Transform API data to match the expected format for PackageCard
          const formattedPackages = response.data.data.map((pkg: ApiPackage) => {
            const style = categoryStyles[pkg.category] || {
              gradientClass: "from-gray-200 to-gray-400",
              buttonClass: "bg-gray-600 hover:bg-gray-700",
            }

            // Convert price to numeric for sorting
            const numericPrice = typeof pkg.price === "number" ? pkg.price : Number.parseFloat(pkg.price.toString())

            // Extract course titles from courseRefs to use as features
            const features = pkg.courseRefs.map((course) => ({
              name: course.title,
              included: true,
            }))

            return {
              name: pkg.category,
              price: `Rs ${typeof pkg.price === "number" ? pkg.price.toString() : pkg.price}`,
              description: pkg.description,
              features: features, // Use the extracted course titles as features
              image:
                pkg.image ||
                "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&fit=crop",
              gradientClass: style.gradientClass,
              buttonClass: style.buttonClass,
              // Mark Gold package as popular
              popular: pkg.category === "Gold",
              numericPrice: numericPrice, // Store numeric price for sorting
            }
          })

          // Sort packages by price (lowest to highest)
          const sortedPackages = formattedPackages.sort((a, b) => a.numericPrice - b.numericPrice)

          setPackages(sortedPackages)
        } else {
          throw new Error("Failed to fetch packages")
        }
      } catch (err) {
        console.error("Error fetching packages:", err)
        setError("Failed to load packages. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPackages()
  }, [])

  return (
    <>
      <header className="pt-12 pb-10 bg-gradient-to-r from-slate-100 to-slate-200">
        <div className="container mx-auto px-4 m-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="animate-fadeIn">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
                Course Packages
              </span>
              <h1 className="text-4xl font-bold mb-6 text-gray-900">Choose Your Learning Path</h1>
              <p className="text-gray-600 mb-8">
                Select from our range of carefully designed packages to accelerate your learning journey and achieve
                your career goals in digital marketing.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              <span className="ml-3 text-lg text-gray-600">Loading packages...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
              <p>{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, index) => (
                <PackageCard key={index} pkg={pkg} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-slideUp bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our team is ready to help you choose the right package for your learning goals. Contact us for
              personalized assistance.
            </p>
            <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-full hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Our Courses?</h2>
            <p className="text-gray-600 mb-12">
              Our digital marketing courses are designed by industry experts to provide practical skills and knowledge
              that can be applied immediately.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-gray-50 animate-fadeIn">
                <div className="mb-4 flex justify-center">
                  <span className="p-3 bg-blue-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
                <p className="text-gray-600">Learn from professionals with years of industry experience</p>
              </div>

              <div className="p-6 rounded-xl bg-gray-50 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                <div className="mb-4 flex justify-center">
                  <span className="p-3 bg-blue-100 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practical Knowledge</h3>
                <p className="text-gray-600">Hands-on projects and real-world applications</p>
              </div>

              <div className="p-6 rounded-xl bg-gray-50 animate-fadeIn" style={{ animationDelay: "0.4s" }}>
                <div className="mb-4 flex justify-center">
                  <span className="p-3 bg-blue-100 rounded-full">
                    <HelpCircle className="h-6 w-6 text-blue-600" />
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                <p className="text-gray-600">Access to community and instructor support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CoursePackages
