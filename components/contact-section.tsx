"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import SplitText from "./split-text"
import MagneticButton from "./magnetic-button"
import { ArrowRight } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This would normally submit the form data
    console.log(formState)
    // Reset form
    setFormState({
      name: "",
      email: "",
      message: "",
    })
    // Show success message
    alert("Form submitted successfully! (This is just a demo)")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  }

  const inputVariants = {
    rest: { scale: 1 },
    focus: { scale: 1.02 },
  }

  return (
    <section id="contact" ref={sectionRef} className="w-full py-24 px-6 bg-black text-white" data-scroll-section>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          data-scroll
          data-scroll-speed="0.1"
        >
          <motion.div variants={itemVariants} data-scroll data-scroll-speed="0.3">
            <SplitText className="text-3xl md:text-5xl font-bold mb-6 font-heading" delay={0.2}>
              Let's create something amazing together
            </SplitText>

            <motion.p className="text-lg text-gray-300 mb-8" variants={itemVariants}>
              Have a project in mind? We'd love to hear about it. Let's discuss how we can help bring your ideas to
              life.
            </motion.p>

            <motion.div variants={itemVariants}>
              <MagneticButton className="group" strength={40}>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium transition-all"
                >
                  Get in Touch
                  <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <ArrowRight size={18} />
                  </motion.span>
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div className="relative" variants={itemVariants} data-scroll data-scroll-speed="0.5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={inputVariants} initial="rest" whileFocus="focus" className="group">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </motion.div>

              <motion.div variants={inputVariants} initial="rest" whileFocus="focus" className="group">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </motion.div>

              <motion.div variants={inputVariants} initial="rest" whileFocus="focus" className="group">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

