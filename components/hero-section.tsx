"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import SplitText from "./split-text"
import MagneticButton from "./magnetic-button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-center items-center px-6 py-24 overflow-hidden"
      data-scroll-section
    >
      {/* Background elements with data-scroll for parallax */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-200 blur-3xl opacity-30 mix-blend-multiply"
        data-scroll
        data-scroll-speed="-1"
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-200 blur-3xl opacity-30 mix-blend-multiply"
        data-scroll
        data-scroll-speed="2"
      />
      <div
        className="absolute top-2/3 left-1/3 w-72 h-72 rounded-full bg-yellow-200 blur-3xl opacity-30 mix-blend-multiply"
        data-scroll
        data-scroll-speed="1.5"
      />

      <div className="container mx-auto max-w-6xl z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <SplitText
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight font-heading"
            delay={0.2}
            type="words"
            dataScrollSpeed="0.5"
          >
            We create digital experiences that matter
          </SplitText>

          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            data-scroll
            data-scroll-speed="0.8"
          >
            Award-winning design studio specializing in digital experiences that connect brands with their audience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            data-scroll
            data-scroll-speed="1"
          >
            <MagneticButton className="group" strength={40}>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium transition-all"
              >
                View Projects
                <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </a>
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="relative w-full aspect-video rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          data-scroll
          data-scroll-speed="0.3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <motion.div
              className="text-4xl font-bold text-white font-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              Featured Project
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.8 }}
        data-scroll
        data-scroll-speed="-0.5"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <a href="#projects" className="flex flex-col items-center text-sm font-medium cursor-hover-trigger">
            <span className="mb-2">Scroll Down</span>
            <span className="w-0.5 h-8 bg-black" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

