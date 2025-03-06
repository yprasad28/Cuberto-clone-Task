"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import MagneticButton from "./magnetic-button"

interface HeaderProps {
  locomotiveScroll: any
}

export default function Header({ locomotiveScroll }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden"
  }

  const handleNavClick = (target: string) => {
    setIsMenuOpen(false)
    document.body.style.overflow = "auto"

    // Use locomotive scroll to scroll to the target
    if (locomotiveScroll) {
      const targetElement = document.querySelector(target)
      if (targetElement) {
        setTimeout(() => {
          locomotiveScroll.scrollTo(targetElement, {
            offset: 0,
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0],
          })
        }, 300)
      }
    } else {
      // Fallback to native scroll if locomotive isn't available
      setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({
          behavior: "smooth",
        })
      }, 300)
    }
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 40px) 40px)",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 40px) 40px)",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  }

  const menuItemVariants = {
    closed: {
      y: "100%",
      opacity: 0,
    },
    open: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.1 + i * 0.1,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  }

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "py-4 bg-white/90 backdrop-blur-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-heading">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              C
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              >
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  {item.name}
                </button>
              </motion.div>
            ))}
          </div>

          <MagneticButton className="md:hidden z-50" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MagneticButton>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black text-white z-40 flex flex-col justify-center items-center"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col items-center space-y-8">
              {menuItems.map((item, i) => (
                <div key={item.name} className="overflow-hidden">
                  <motion.div custom={i} variants={menuItemVariants} initial="closed" animate="open" exit="closed">
                    <button
                      className="text-3xl font-bold hover:text-gray-400 transition-colors"
                      onClick={() => handleNavClick(item.href)}
                    >
                      {item.name}
                    </button>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

