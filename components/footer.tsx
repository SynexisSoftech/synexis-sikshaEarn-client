'use client'
import Link from "next/link"
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer(){
  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-700" }
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Course Packages", href: "/course-package" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const courses = [
    { name: "Digital Marketing", href: "/courses/digital-marketing" },
    { name: "Web Development", href: "/courses/web-development" },
    { name: "Graphic Design", href: "/courses/graphic-design" },
    { name: "Content Writing", href: "/courses/content-writing" },
    { name: "SEO Optimization", href: "/courses/seo" }
  ];
  return (
    <footer className="bg-gray-50 text-gray-800 pt-20 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sikshaearn
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Empowering lifelong learners with quality education and professional development opportunities.
          </p>
          <div className="flex space-x-5">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`text-gray-600 transition-colors ${social.color}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-6">Popular Courses</h3>
          <ul className="space-y-3">
            {courses.map((course, index) => (
              <li key={index}>
                <a
                  href={course.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                  {course.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <span className="text-gray-600">123 Education Street, Knowledge City, 44600</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <span className="text-gray-600">+977 9876543210</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-purple-600 flex-shrink-0" />
              <span className="text-gray-600">info@sikshaearn.com</span>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-gray-200 mt-16 pt-8 text-center"
      >
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Sikshaearn. All rights reserved.
        </p>
      </motion.div>
    </div>
  </footer>
  )
}
