"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface SplitTextProps {
  children: string
  className?: string
  type?: "words" | "chars"
  delay?: number
  duration?: number
  staggerChildren?: number
  once?: boolean
  threshold?: number
  ease?: number[]
  dataScrollSpeed?: string
}

export default function SplitText({
  children,
  className = "",
  type = "words",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
  once = true,
  threshold = 0.2,
  ease = [0.33, 1, 0.68, 1],
  dataScrollSpeed,
}: SplitTextProps) {
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
    visible: {
      transition: {
        staggerChildren,
      },
    },
  }

  const wordVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease,
      },
    },
  }

  const charVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay: delay + i * staggerChildren,
        ease,
      },
    }),
  }

  const scrollProps = dataScrollSpeed ? { "data-scroll": "", "data-scroll-speed": dataScrollSpeed } : {}

  return (
    <motion.div
      ref={ref}
      className={`split-text-container ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      {...scrollProps}
    >
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="split-text-line">
          {type === "words" ? (
            <>
              {line.split(" ").map((word, wordIndex) => (
                <motion.span key={wordIndex} className="split-text-word mr-[0.25em]" variants={wordVariants}>
                  {word}
                </motion.span>
              ))}
            </>
          ) : (
            <>
              {line.split("").map((char, charIndex) => (
                <motion.span key={charIndex} className="split-text-char" variants={charVariants} custom={charIndex}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </>
          )}
        </div>
      ))}
    </motion.div>
  )
}

