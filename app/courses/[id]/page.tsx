"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Users, Star, BookOpen, Award, CheckCircle2, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

// Mock course data - in a real app, this would come from an API or database
const coursesData = [
  {
    id: "1",
    title: "Digital Marketing Fundamentals",
    description:
      "Learn the basics of digital marketing, including SEO, social media, and content marketing. This comprehensive course will give you a solid foundation in all aspects of digital marketing.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Digital Marketing",
    level: "Beginner",
    duration: "8 weeks",
    students: 1250,
    rating: 4.8,
    price: "$99",
    instructor: {
      name: "Sarah Johnson",
      bio: "Digital Marketing Expert with 10+ years of experience",
      image: "/placeholder.svg?height=100&width=100",
    },
    overview:
      "This course provides a comprehensive introduction to digital marketing. You'll learn the fundamentals of SEO, social media marketing, content marketing, email marketing, and more. By the end of this course, you'll have a solid understanding of how to create and implement effective digital marketing strategies.",
    whatYouWillLearn: [
      "Understand the core principles of digital marketing",
      "Create effective SEO strategies to improve website visibility",
      "Develop engaging social media campaigns",
      "Build email marketing funnels that convert",
      "Analyze marketing data to optimize campaigns",
      "Create content that resonates with your target audience",
    ],
    modules: [
      {
        title: "Introduction to Digital Marketing",
        lessons: [
          { title: "What is Digital Marketing?", duration: "15 min" },
          { title: "The Digital Marketing Landscape", duration: "20 min" },
          { title: "Setting Marketing Goals", duration: "25 min" },
        ],
      },
      {
        title: "Search Engine Optimization (SEO)",
        lessons: [
          { title: "SEO Fundamentals", duration: "30 min" },
          { title: "Keyword Research", duration: "45 min" },
          { title: "On-Page SEO Techniques", duration: "40 min" },
          { title: "Off-Page SEO Strategies", duration: "35 min" },
        ],
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { title: "Social Media Platforms Overview", duration: "25 min" },
          { title: "Creating a Social Media Strategy", duration: "40 min" },
          { title: "Content Creation for Social Media", duration: "35 min" },
          { title: "Measuring Social Media Success", duration: "30 min" },
        ],
      },
      {
        title: "Content Marketing",
        lessons: [
          { title: "Content Marketing Basics", duration: "20 min" },
          { title: "Content Creation Process", duration: "35 min" },
          { title: "Content Distribution Channels", duration: "25 min" },
          { title: "Content Performance Analysis", duration: "30 min" },
        ],
      },
      {
        title: "Email Marketing",
        lessons: [
          { title: "Email Marketing Fundamentals", duration: "25 min" },
          { title: "Building an Email List", duration: "30 min" },
          { title: "Email Campaign Creation", duration: "40 min" },
          { title: "Email Analytics and Optimization", duration: "35 min" },
        ],
      },
    ],
    reviews: [
      {
        name: "John Smith",
        rating: 5,
        date: "2 months ago",
        comment:
          "Excellent course! The instructor explains complex concepts in a simple way. I've learned so much and have already started implementing these strategies in my business.",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Emily Davis",
        rating: 4,
        date: "3 months ago",
        comment:
          "Very informative course with practical examples. I would have liked more hands-on exercises, but overall it was a great learning experience.",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Michael Brown",
        rating: 5,
        date: "1 month ago",
        comment:
          "This course exceeded my expectations. The instructor is knowledgeable and engaging. The content is up-to-date and relevant to today's digital marketing landscape.",
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
  {
    id: "2",
    title: "Advanced SEO Techniques",
    description: "Master advanced SEO strategies to improve your website's visibility and ranking.",
    image: "/placeholder.svg?height=400&width=800",
    category: "SEO",
    level: "Advanced",
    duration: "6 weeks",
    students: 850,
    rating: 4.7,
    price: "$149",
    instructor: {
      name: "David Wilson",
      bio: "SEO Specialist with 12+ years of experience",
      image: "/placeholder.svg?height=100&width=100",
    },
    overview:
      "This advanced course takes your SEO knowledge to the next level. You'll learn sophisticated techniques for improving your website's search engine rankings, including technical SEO, advanced keyword research, link building strategies, and more.",
    whatYouWillLearn: [
      "Implement technical SEO improvements",
      "Conduct advanced keyword research and analysis",
      "Develop effective link building strategies",
      "Optimize for local SEO",
      "Perform SEO audits and fix issues",
      "Track and analyze SEO performance",
    ],
    modules: [
      {
        title: "Technical SEO",
        lessons: [
          { title: "Site Architecture for SEO", duration: "35 min" },
          { title: "Page Speed Optimization", duration: "40 min" },
          { title: "Mobile Optimization", duration: "30 min" },
          { title: "Structured Data and Schema Markup", duration: "45 min" },
        ],
      },
      {
        title: "Advanced Keyword Research",
        lessons: [
          { title: "Competitive Keyword Analysis", duration: "40 min" },
          { title: "Long-tail Keyword Strategies", duration: "35 min" },
          { title: "User Intent Optimization", duration: "45 min" },
        ],
      },
      {
        title: "Link Building Mastery",
        lessons: [
          { title: "Quality Link Assessment", duration: "30 min" },
          { title: "Outreach Strategies", duration: "40 min" },
          { title: "Content-Driven Link Building", duration: "35 min" },
          { title: "Avoiding Penalties", duration: "25 min" },
        ],
      },
      {
        title: "Local SEO",
        lessons: [
          { title: "Google My Business Optimization", duration: "30 min" },
          { title: "Local Citation Building", duration: "35 min" },
          { title: "Review Management", duration: "25 min" },
          { title: "Local Link Building", duration: "40 min" },
        ],
      },
      {
        title: "SEO Analytics and Reporting",
        lessons: [
          { title: "Setting Up Advanced Analytics", duration: "45 min" },
          { title: "Tracking Rankings and Performance", duration: "35 min" },
          { title: "Creating SEO Reports", duration: "30 min" },
          { title: "Data-Driven SEO Decisions", duration: "40 min" },
        ],
      },
    ],
    reviews: [
      {
        name: "Robert Johnson",
        rating: 5,
        date: "2 months ago",
        comment:
          "This course is a game-changer for anyone serious about SEO. The advanced techniques taught here have helped me significantly improve my website's rankings.",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Jennifer Lee",
        rating: 4,
        date: "1 month ago",
        comment:
          "Excellent content and very practical advice. I've implemented several of the techniques and have already seen improvements in my search rankings.",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Thomas Clark",
        rating: 5,
        date: "3 months ago",
        comment:
          "David is an excellent instructor who clearly knows his stuff. The course is well-structured and covers all aspects of advanced SEO.",
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
  {
    id: "3",
    title: "Social Media Marketing",
    description: "Learn how to create effective social media campaigns and grow your online presence.",
    image: "/placeholder.svg?height=400&width=800",
    category: "Social Media",
    level: "Intermediate",
    duration: "5 weeks",
    students: 1100,
    rating: 4.6,
    price: "$129",
    instructor: {
      name: "Jessica Martinez",
      bio: "Social Media Strategist with 8+ years of experience",
      image: "/placeholder.svg?height=100&width=100",
    },
    overview:
      "This comprehensive course teaches you how to create and implement effective social media marketing strategies. You'll learn how to build a strong presence on major social platforms, create engaging content, grow your audience, and measure your success.",
    whatYouWillLearn: [
      "Develop platform-specific strategies for major social networks",
      "Create engaging social media content",
      "Build and grow your social media audience",
      "Run effective social media advertising campaigns",
      "Measure and analyze social media performance",
      "Use social listening to improve your strategy",
    ],
    modules: [
      {
        title: "Social Media Strategy",
        lessons: [
          { title: "Setting Social Media Goals", duration: "25 min" },
          { title: "Audience Research and Personas", duration: "35 min" },
          { title: "Platform Selection Strategy", duration: "30 min" },
          { title: "Content Calendar Creation", duration: "40 min" },
        ],
      },
      {
        title: "Platform-Specific Strategies",
        lessons: [
          { title: "Facebook Marketing", duration: "45 min" },
          { title: "Instagram Marketing", duration: "40 min" },
          { title: "Twitter Marketing", duration: "35 min" },
          { title: "LinkedIn Marketing", duration: "40 min" },
          { title: "TikTok Marketing", duration: "35 min" },
        ],
      },
      {
        title: "Content Creation",
        lessons: [
          { title: "Visual Content Creation", duration: "40 min" },
          { title: "Copywriting for Social Media", duration: "35 min" },
          { title: "Video Content Strategy", duration: "45 min" },
          { title: "User-Generated Content", duration: "30 min" },
        ],
      },
      {
        title: "Social Media Advertising",
        lessons: [
          { title: "Ad Campaign Setup", duration: "40 min" },
          { title: "Targeting and Audience Selection", duration: "35 min" },
          { title: "Ad Creative Best Practices", duration: "30 min" },
          { title: "Budget Management and Optimization", duration: "45 min" },
        ],
      },
      {
        title: "Analytics and Optimization",
        lessons: [
          { title: "Key Social Media Metrics", duration: "30 min" },
          { title: "Analytics Tools and Dashboards", duration: "35 min" },
          { title: "Performance Reporting", duration: "25 min" },
          { title: "Strategy Optimization", duration: "40 min" },
        ],
      },
    ],
    reviews: [
      {
        name: "Amanda Wilson",
        rating: 5,
        date: "1 month ago",
        comment:
          "Jessica is an amazing instructor! Her insights into social media strategy have completely transformed how I approach marketing for my business.",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Daniel Thompson",
        rating: 4,
        date: "2 months ago",
        comment:
          "Great course with lots of practical examples. I especially appreciated the platform-specific strategies and content creation sections.",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Sophia Garcia",
        rating: 5,
        date: "3 months ago",
        comment:
          "This course offers excellent value. I've taken several social media courses, and this is by far the most comprehensive and up-to-date.",
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
  },
]

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCourse = coursesData.find((c) => c.id === params.id)
    if (foundCourse) {
      setCourse(foundCourse)
    } else {
      // Redirect to courses page if course not found
      router.push("/courses")
    }
    setLoading(false)
  }, [params.id, router])

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-primary/20 rounded mb-4"></div>
          <div className="h-4 w-48 bg-primary/20 rounded"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link href="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-8"
          >
            <div className="w-full md:w-2/3">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="outline" size="sm" asChild className="h-8">
                  <Link href="/courses">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Back
                  </Link>
                </Button>
                <Badge>{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-6">{course.description}</p>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
                  <span>{course.rating} rating</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={course.instructor.image || "/placeholder.svg"}
                  alt={course.instructor.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <Card className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-4">{course.price}</div>
                  <Button className="w-full mb-4">Enroll Now</Button>
                  <Button variant="outline" className="w-full mb-6">
                    <Share2 className="mr-2 h-4 w-4" /> Share Course
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-2">This course includes:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-primary" />
                        {course.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0)} lessons
                      </li>
                      <li className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        {course.duration} of content
                      </li>
                      <li className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-primary" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full max-w-3xl mx-auto grid grid-cols-4 mb-12">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Course Overview</h2>
                <p className="mb-8">{course.overview}</p>

                <h3 className="text-xl font-bold mb-4">What You Will Learn</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-12">
                  {course.whatYouWillLearn.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Course Requirements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Basic computer skills and internet access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>No prior marketing experience required for beginner courses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Willingness to learn and apply new concepts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="curriculum">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <p className="mb-8">
                  This course includes {course.modules.length} modules with{" "}
                  {course.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0)} lessons.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {course.modules.map((module: any, index: number) => (
                    <AccordionItem key={index} value={`module-${index}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col items-start text-left">
                          <div className="font-bold">{module.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {module.lessons.length} lessons •{" "}
                            {module.lessons.reduce(
                              (acc: number, lesson: any) => acc + Number.parseInt(lesson.duration.split(" ")[0]),
                              0,
                            )}{" "}
                            min
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-4 pt-2">
                          {module.lessons.map((lesson: any, lessonIndex: number) => (
                            <li key={lessonIndex} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <BookOpen className="h-4 w-4 mr-3 text-primary" />
                                <span>{lesson.title}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="instructor">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Meet Your Instructor</h2>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 relative">
                    <Image
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{course.instructor.name}</h3>
                    <p className="text-muted-foreground mb-4">{course.instructor.bio}</p>
                    <p className="mb-6">
                      Our instructor is a seasoned professional with extensive experience in the field. They bring
                      real-world insights and practical knowledge to help you master the subject matter and apply it in
                      your career or business.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-primary">15+</div>
                        <div className="text-sm text-muted-foreground">Years of Experience</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">50+</div>
                        <div className="text-sm text-muted-foreground">Courses Created</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">10k+</div>
                        <div className="text-sm text-muted-foreground">Students Taught</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">4.8</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                  <div className="w-full md:w-1/3 bg-background/50 p-6 rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{course.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(course.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300 fill-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mb-6">Course Rating</div>
                    </div>

                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = course.reviews.filter((r: any) => r.rating === rating).length
                        const percentage = (count / course.reviews.length) * 100
                        return (
                          <div key={rating} className="flex items-center gap-2">
                            <div className="w-8 text-sm text-right">{rating} ★</div>
                            <Progress value={percentage} className="h-2" />
                            <div className="w-8 text-sm">{percentage.toFixed(0)}%</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
                    <div className="space-y-6">
                      {course.reviews.map((review: any, index: number) => (
                        <div key={index} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <Image
                              src={review.image || "/placeholder.svg"}
                              alt={review.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{review.name}</span>
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                              </div>
                              <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p>{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of students who have already enrolled in this course and start your learning journey today.
            </p>
            <Button size="lg">Enroll Now for {course.price}</Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
