"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, X, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CoursePackagePage() {
  const packages = [
    {
      name: "Silver",
      price: "499",
      description: "Perfect for beginners looking to start their digital marketing journey.",
      features: [
        { name: "5 Core Courses", included: true },
        { name: "Basic Support", included: true },
        { name: "3 Months Access", included: true },
        { name: "Certificate", included: true },
        { name: "Live Workshops", included: false },
        { name: "1-on-1 Mentoring", included: false },
        { name: "Job Placement Assistance", included: false },
      ],
      className: "silver-card",
    },
    {
      name: "Gold",
      price: "1499",
      description: "Ideal for those seeking to expand their digital marketing skills.",
      features: [
        { name: "10 Courses", included: true },
        { name: "Priority Support", included: true },
        { name: "6 Months Access", included: true },
        { name: "Certificate", included: true },
        { name: "1 Live Workshop", included: true },
        { name: "1-on-1 Mentoring", included: false },
        { name: "Job Placement Assistance", included: false },
      ],
      popular: true,
      className: "gold-card",
    },
    {
      name: "Diamond",
      price: "2499",
      description: "Comprehensive package for serious digital marketing professionals.",
      features: [
        { name: "All Courses", included: true },
        { name: "24/7 Support", included: true },
        { name: "12 Months Access", included: true },
        { name: "Certificate", included: true },
        { name: "3 Live Workshops", included: true },
        { name: "1-on-1 Mentoring", included: true },
        { name: "Job Placement Assistance", included: false },
      ],
      className: "diamond-card",
    },
    {
      name: "Heroic",
      price: "4999",
      description: "Ultimate package for those aiming to master digital marketing.",
      features: [
        { name: "All Courses", included: true },
        { name: "VIP Support", included: true },
        { name: "Lifetime Access", included: true },
        { name: "Certificate", included: true },
        { name: "Unlimited Workshops", included: true },
        { name: "Weekly Mentoring", included: true },
        { name: "Job Placement Assistance", included: true },
      ],
      className: "heroic-card",
    },
  ]

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge className="mb-4">Course Packages</Badge>
              <h1 className="text-4xl font-bold mb-6">Choose the Perfect Learning Path</h1>
              <p className="text-muted-foreground mb-8">
                Select from our range of carefully designed packages to accelerate your learning journey and achieve your career goals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`package-card ${pkg.className}`}
              >
                <Card className="h-full border-none shadow-lg overflow-hidden">
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold">
                      POPULAR
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl">{pkg.name} Package</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="text-3xl font-bold">₹{pkg.price}</div>
                      <p className="text-muted-foreground text-sm">one-time payment</p>
                    </div>

                    <p className="text-muted-foreground text-sm mb-6">{pkg.description}</p>

                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          {feature.included ? (
                            <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                          )}
                          <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>

                          {feature.info && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{feature.info}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </li>
                      ))}
                    </ul>

                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Our team is ready to help you choose the right package for your learning goals. Contact us for
              personalized assistance.
            </p>
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  )
}
