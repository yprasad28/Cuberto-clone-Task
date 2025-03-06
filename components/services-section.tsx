"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import SplitText from "./split-text"

interface Service {
  id: number
  title: string
  description: string
  icon: string
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })

  const services: Service[] = [
    {
      id: 1,
      title: "Web Design",
      description: "Creating beautiful, intuitive websites that enhance user experience and drive engagement.",
      icon: "🎨",
    },
    {
      id: 2,
      title: "Brand Identity",
      description: "Developing cohesive brand identities that communicate your values and resonate with your audience.",
      icon: "✨",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Crafting user interfaces that are both aesthetically pleasing and functionally efficient.",
      icon: "📱",
    },
    {
      id: 4,
      title: "Development",
      description: "Building robust, scalable applications with cutting-edge technologies and best practices.",
      icon: "💻",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="services" ref={sectionRef} className="w-full py-24 px-6 bg-gray-50" data-scroll-section>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16" data-scroll data-scroll-speed="0.3">
          <SplitText className="text-3xl md:text-5xl font-bold mb-6 font-heading" delay={0.2}>
            Our Services
          </SplitText>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            We offer a comprehensive range of services to help brands thrive in the digital landscape.
          </motion.p>
          <div className="w-full h-px bg-gray-200 mt-8" />
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          data-scroll
          data-scroll-speed="0.1"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-hover-trigger"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              data-scroll
              data-scroll-speed={index % 2 === 0 ? "0.2" : "0.4"}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 font-heading">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

