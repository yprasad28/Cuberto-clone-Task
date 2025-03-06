"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import SplitText from "./split-text"
import { ArrowUpRight } from "lucide-react"

interface Project {
  id: number
  title: string
  category: string
  image: string
  color: string
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Digital Experience",
      category: "Web Design",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-pink-500 to-purple-500",
    },
    {
      id: 2,
      title: "Brand Identity",
      category: "Branding",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Mobile Application",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 4,
      title: "E-commerce Platform",
      category: "Web Development",
      image: "/placeholder.svg?height=600&width=800",
      color: "from-emerald-500 to-teal-500",
    },
  ]

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  }

  return (
    <section id="projects" ref={sectionRef} className="w-full py-24 px-6" data-scroll-section>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16" data-scroll data-scroll-speed="0.3">
          <SplitText className="text-3xl md:text-5xl font-bold mb-6 font-heading" delay={0.2}>
            Selected Projects
          </SplitText>
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative cursor-hover-trigger"
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              data-scroll
              data-scroll-speed={index % 2 === 0 ? "0.2" : "0.4"}
            >
              <div className="overflow-hidden rounded-lg project-card">
                <motion.div
                  className="relative aspect-[4/3] w-full project-card-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-80`} />

                  <AnimatePresence>
                    {hoveredProject === project.id && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-white text-2xl font-bold">View Project</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="absolute bottom-6 right-6 bg-white rounded-full p-3 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.div>
                </motion.div>
              </div>

              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold font-heading">{project.title}</h3>
                  <p className="text-gray-600 mt-1">{project.category}</p>
                </div>
                <span className="text-sm font-medium">0{project.id}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

