"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get the height of the content
    const setBodyHeight = () => {
      if (scrollRef.current && containerRef.current) {
        document.body.style.height = `${scrollRef.current.getBoundingClientRect().height}px`
      }
    }

    // Set the height initially and on resize
    setBodyHeight()
    window.addEventListener("resize", setBodyHeight)

    return () => {
      window.removeEventListener("resize", setBodyHeight)
    }
  }, [])

  const { scrollY } = useScroll()
  const transform = useTransform(scrollY, [0, 1], [0, -1])

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-screen overflow-hidden">
      <motion.div ref={scrollRef} style={{ y: transform }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

