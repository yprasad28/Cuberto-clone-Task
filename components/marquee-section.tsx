"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function MarqueeSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const marqueeItems = [
    "Digital Design",
    "•",
    "Web Development",
    "•",
    "Brand Identity",
    "•",
    "Motion Design",
    "•",
    "User Experience",
    "•",
  ]

  // Duplicate the array for continuous scrolling effect
  const marqueeItemsDouble = [...marqueeItems, ...marqueeItems]

  return (
    <motion.div ref={containerRef} className="w-full py-20 overflow-hidden bg-black text-white" data-scroll-section>
      <div className="relative" data-scroll data-scroll-speed="0.1">
        <motion.div
          className="marquee-container py-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="marquee-content flex">
            {marqueeItemsDouble.map((item, index) => (
              <span key={index} className="text-3xl md:text-5xl font-bold whitespace-nowrap mx-4 md:mx-8 font-heading">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="marquee-container py-4"
          initial={{ x: "-50%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        >
          <div className="marquee-content flex">
            {marqueeItemsDouble.map((item, index) => (
              <span key={index} className="text-3xl md:text-5xl font-bold whitespace-nowrap mx-4 md:mx-8 font-heading">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

