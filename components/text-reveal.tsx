"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  once?: boolean
  threshold?: number
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  once = true,
  threshold = 0.2,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, threshold })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  // Split text into lines
  const lines = children.split("\n").filter(Boolean)

  const containerVariants = {
    hidden: {},
    visible: {},
  }

  const lineVariants = {
    hidden: {},
    visible: {},
  }

  const wordVariants = {
    hidden: {},
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay + i * 0.1,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  }

  return (
    <motion.div ref={ref} className={className} variants={containerVariants} initial="hidden" animate={controls}>
      {lines.map((line, lineIndex) => (
        <motion.div key={lineIndex} className="text-reveal-container" variants={lineVariants}>
          <span className="text-reveal-line">
            {line.split(" ").map((word, wordIndex) => (
              <motion.span
                key={wordIndex}
                className="inline-block"
                style={{ opacity: 0, transform: "translateY(20px)" }}
                variants={wordVariants}
                custom={wordIndex}
              >
                {word}
                {wordIndex !== line.split(" ").length - 1 && " "}
              </motion.span>
            ))}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

