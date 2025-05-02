"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Clock, Users, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const courses = [
  {
    id: 1,
    title: "Digital Marketing Fundamentals",
    description: "Learn the basics of digital marketing, including SEO, social media, and content marketing.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "8 weeks",
    students: 1250,
    rating: 4.8,
    price: "$99",
    popular: true,
  },
  {
    id: 2,
    title: "Advanced SEO Techniques",
    description: "Master advanced SEO strategies to improve your website's visibility and ranking.",
    image: "/placeholder.svg?height=200&width=300",
    category: "SEO",
    level: "Advanced",
    duration: "6 weeks",
    students: 850,
    rating: 4.7,
    price: "$149",
  },
  {
    id: 3,
    title: "Social Media Marketing",
    description: "Learn how to create effective social media campaigns and grow your online presence.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Social Media",
    level: "Intermediate",
    duration: "5 weeks",
    students: 1100,
    rating: 4.6,
    price: "$129",
    popular: true,
  },
  {
    id: 4,
    title: "Content Marketing Strategy",
    description: "Develop a comprehensive content marketing strategy to engage your audience.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Content Marketing",
    level: "Intermediate",
    duration: "7 weeks",
    students: 950,
    rating: 4.9,
    price: "$139",
  },
  {
    id: 5,
    title: "Email Marketing Mastery",
    description: "Learn how to create effective email campaigns that convert subscribers into customers.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Email Marketing",
    level: "Beginner",
    duration: "4 weeks",
    students: 780,
    rating: 4.5,
    price: "$89",
  },
  {
    id: 6,
    title: "Google Analytics for Marketers",
    description: "Master Google Analytics to track and analyze your website's performance.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Analytics",
    level: "Intermediate",
    duration: "5 weeks",
    students: 820,
    rating: 4.7,
    price: "$119",
  },
  {
    id: 7,
    title: "PPC Advertising",
    description: "Learn how to create and manage effective pay-per-click advertising campaigns.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Advertising",
    level: "Advanced",
    duration: "6 weeks",
    students: 680,
    rating: 4.6,
    price: "$159",
  },
  {
    id: 8,
    title: "Mobile Marketing Strategies",
    description: "Develop effective marketing strategies for mobile users and applications.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Mobile Marketing",
    level: "Intermediate",
    duration: "5 weeks",
    students: 720,
    rating: 4.4,
    price: "$109",
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "all" || course.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4">Our Courses</Badge>
              <h1 className="text-4xl font-bold mb-6">Expand Your Knowledge</h1>
              <p className="text-muted-foreground mb-8">
                Browse our comprehensive selection of courses designed to help you master digital marketing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="digital marketing">Digital Marketing</SelectItem>
                  <SelectItem value="seo">SEO</SelectItem>
                  <SelectItem value="social media">Social Media</SelectItem>
                  <SelectItem value="content marketing">Content Marketing</SelectItem>
                  <SelectItem value="email marketing">Email Marketing</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="advertising">Advertising</SelectItem>
                  <SelectItem value="mobile marketing">Mobile Marketing</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      {course.popular && <Badge className="absolute top-3 right-3 bg-primary">Popular</Badge>}
                      <Badge className="absolute top-3 left-3 bg-background/80 text-foreground">
                        {course.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{course.level}</Badge>
                        <div className="flex items-center text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="ml-1 text-sm">{course.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {course.students} students
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0 flex items-center justify-between">
                      <div className="text-lg font-bold">{course.price}</div>
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.id}`}>
                          View Course <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategoryFilter("all")
                  setLevelFilter("all")
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

     

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Choose from our wide range of courses and take the first step towards mastering digital marketing. Join
              thousands of successful students today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/courses">Browse All Courses</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Link href="/course-package">View Packages</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
