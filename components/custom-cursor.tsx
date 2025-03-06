"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.classList.contains("cursor-hover-trigger")) {
        setCursorVariant("hover")
      }
    }

    const handleMouseOut = () => {
      setCursorVariant("default")
    }

    window.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      },
    },
    hover: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1.5,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      },
    },
  }

  // Only render on client side and if device supports hover
  const [isClient, setIsClient] = useState(false)
  const [supportsHover, setSupportsHover] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setSupportsHover(window.matchMedia("(hover: hover)").matches)
  }, [])

  if (!isClient || !supportsHover) return null

  return (
    <motion.div className="custom-cursor" variants={variants} animate={cursorVariant}>
      <div className="cursor-dot"></div>
      <div className={`cursor-outline ${cursorVariant === "hover" ? "cursor-hover" : ""}`}></div>
    </motion.div>
  )
}

