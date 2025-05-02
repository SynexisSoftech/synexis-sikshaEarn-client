'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, Users, Award, BookOpen, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7437489/pexels-photo-7437489.jpeg"
          alt="Education Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/20 text-white border-none">About Sikshaearn</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Transforming Education</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
              Empowering learners worldwide with cutting-edge digital marketing education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bridging the Digital Skills Gap</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Founded in 2020, Sikshaearn has been at the forefront of digital marketing education,
                helping individuals and businesses master the digital landscape.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Industry Expert Instructors",
                  "Hands-on Projects",
                  "Career Support",
                  "Flexible Learning",
                  "Live Workshops",
                  "Global Community"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 bg-secondary/50 p-3 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg"
                  alt="Team Collaboration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-muted-foreground">Students Trained</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Drives Us Forward</h2>
            <p className="text-muted-foreground text-lg">
              Our core values shape our approach to education and student success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="h-8 w-8" />,
                title: "Innovation First",
                description: "Pioneering new ways of learning and teaching in the digital age"
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Student Success",
                description: "Focused on delivering real-world results for our learners"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community",
                description: "Building a supportive network of learners and educators"
              },
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Quality Education",
                description: "Maintaining high standards in all our educational content"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Industry Recognition",
                description: "Providing credentials that matter in the real world"
              },
              {
                icon: <CheckCircle2 className="h-8 w-8" />,
                title: "Inclusive Learning",
                description: "Making quality education accessible to everyone"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 bg-background/80 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-[600px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Experts</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Our team consists of industry veterans, certified professionals, and passionate
                educators committed to your success in the digital marketing landscape.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "20+ Industry Experts",
                  "Combined 50+ Years Experience",
                  "Regular Industry Updates",
                  "Dedicated Support Team"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="font-semibold">
                Join Our Community
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-white/20 text-white border-none">Our Impact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Making a Difference</h2>
            <p className="text-gray-200 text-lg">
              Our success is measured by the success of our students
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "10,000+", label: "Graduates" },
              { number: "50+", label: "Courses" },
              { number: "95%", label: "Success Rate" },
              { number: "80+", label: "Countries" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-200">{stat.label}</div>
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
            className="relative overflow-hidden rounded-3xl"
          >
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
              alt="Start Learning"
              width={1920}
              height={600}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
              <div className="max-w-2xl mx-auto text-center text-white p-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Learning Journey</h2>
                <p className="text-lg mb-8">
                  Join thousands of successful graduates who have transformed their careers with Sikshaearn
                </p>
                <Button size="lg" variant="secondary" className="font-semibold">
                  Explore Courses
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}