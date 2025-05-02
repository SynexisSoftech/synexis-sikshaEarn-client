"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, Award, CheckCircle2, ChevronRight, Lightbulb, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Faq from "./faq/page"
import BackToTop from "@/components/BackToTop"
import FeaturesSection from "@/components/FeaturesSection"

export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient -z-10" />
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4 bg-white/10 text-white hover:bg-white/20 transition-colors">
                Professional Education
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-white mb-6 leading-tight">
                Advance Your <span className="text-sky-300">Career</span> With Expert-Led Courses
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                Industry-recognized certifications and professional development programs designed for today's digital
                economy
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="/courses">
                    Browse Courses <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[400px] w-full">
                <div className="absolute top-0 left-0 right-0 z-10 bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" }}
                  >
                    <Image
                      src="/hero.jpg"
                      alt="Professional Education"
                      width={800}
                      height={400}
                      className="object-cover rounded-xl"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { number: "10,000+", label: "Students" },
              { number: "50+", label: "Expert Courses" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20" ref={ref}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
              }}
            >
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
                <Image src="/about.jpg" alt="About Sikshaearn" fill className="object-cover" />
              </div>
            </motion.div>

            <motion.div
              style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s",
              }}
            >
              <h2 className="text-3xl font-bold font-montserrat mb-6">About Sikshaearn</h2>
              <p className="text-muted-foreground mb-6">Fill The Gap Between You & Your Success.</p>
              <p className="mb-6">
                Sikshaearn is a leading educational platform that specializes in digital marketing courses. Our mission
                is to provide high-quality training to help individuals and businesses develop the skills necessary to
                succeed in today's digital landscape.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Expert Instructors</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Practical Learning</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Industry Recognized</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Flexible Schedule</span>
                </div>
              </div>
              <Button asChild>
                <Link href="/about">
                  Learn More About Us <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
<FeaturesSection />

      {/* Course Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Premium Packages</Badge>
            <h2 className="text-3xl font-bold font-montserrat mb-6">Choose Your Learning Path</h2>
            <p className="text-muted-foreground">
              Select the package that best fits your learning goals and budget. Each package is designed to provide
              maximum value.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Silver",
                price: "$99",
                description: "Perfect for beginners looking to start their digital marketing journey.",
                features: ["5 Core Courses", "Basic Support", "3 Months Access", "Certificate"],
                className: "silver-card",
                image: "/package-silver.png",
              },
              {
                name: "Gold",
                price: "$199",
                description: "Ideal for those seeking to expand their digital marketing skills.",
                features: ["10 Courses", "Priority Support", "6 Months Access", "Certificate", "1 Live Workshop"],
                className: "gold-card",
                popular: true,
                image: "/package-gold.png",
              },
              {
                name: "Diamond",
                price: "$299",
                description: "Comprehensive package for serious digital marketing professionals.",
                features: [
                  "All Courses",
                  "24/7 Support",
                  "12 Months Access",
                  "Certificate",
                  "3 Live Workshops",
                  "1-on-1 Mentoring",
                ],
                className: "diamond-card",
                image: "/package-diamond.png",
              },
              {
                name: "Heroic",
                price: "$499",
                description: "Ultimate package for those aiming to master digital marketing.",
                features: [
                  "All Courses",
                  "VIP Support",
                  "Lifetime Access",
                  "Certificate",
                  "Unlimited Workshops",
                  "Weekly Mentoring",
                  "Job Placement Assistance",
                ],
                className: "heroic-card",
                image: "/package-heroic.png",
              },
            ].map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`package-card ${pkg.className}`}
              >
                <Card className="h-full border-none shadow-lg overflow-hidden">
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold">
                      POPULAR
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="mx-auto w-16 h-16 mb-4">
                        <Image
                          src={pkg.image || "/placeholder.svg"}
                          alt={`${pkg.name} Package`}
                          width={60}
                          height={60}
                          className="mx-auto"
                        />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{pkg.name} Package</h3>
                      <div className="text-3xl font-bold mb-2">{pkg.price}</div>
                      <p className="text-muted-foreground text-sm">{pkg.description}</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      <Link href="/course-package">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold font-montserrat mb-6">What Our Students Say</h2>
            <p className="text-muted-foreground">
              Hear from our students who have transformed their careers through our courses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aarav Sharma",
                role: "Digital Marketing Specialist",
                image: "/testimonial-1.png",
                quote:
                  "The courses at Sikshaearn provided me with practical skills that I could immediately apply in my job. The instructors are knowledgeable and supportive.",
              },
              {
                name: "Priya Patel",
                role: "Freelance Content Creator",
                image: "/testimonial-2.png",
                quote:
                  "I started as a complete beginner, and now I'm running successful digital marketing campaigns for clients. The structured curriculum made learning easy and enjoyable.",
              },
              {
                name: "Raj Kumar",
                role: "E-commerce Entrepreneur",
                image: "/testimonial-3.png",
                quote:
                  "The Diamond package was worth every penny. The mentoring sessions helped me overcome challenges in my business and implement effective marketing strategies.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="testimonial-card h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary p-1">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={100}
                          height={100}
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="mb-4 italic relative">
                        <span className="text-4xl text-primary/20 absolute -top-4 -left-2">"</span>
                        {testimonial.quote}
                        <span className="text-4xl text-primary/20 absolute -bottom-4 -right-2">"</span>
                      </p>
                      <div className="mt-4 pt-4 border-t border-border w-16 mx-auto">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold font-montserrat mb-6">Ready to Start Your Learning Journey?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of students who have transformed their careers with our comprehensive digital marketing
              courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    {/* faq */}
    <Faq />
  

    </>
  )
}
