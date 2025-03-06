"use client"

import { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LocomotiveScroll from "locomotive-scroll"
import "locomotive-scroll/dist/locomotive-scroll.css"




import CustomCursor from "@/components/custom-cursor"
import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ProjectsSection from "@/components/projects-section"
import MarqueeSection from "@/components/marquee-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [locomotiveScroll, setLocomotiveScroll] = useState<any>(null)
  

  // Initialize Locomotive Scroll
  useEffect(() => {
    if (!isLoading && scrollRef.current) {
      // Import dynamically to avoid SSR issues
      const scroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        multiplier: 1,
        lerp: 0.1, 
        smartphone: {
          smooth: true,
          multiplier: 1,
        },
        tablet: {
          smooth: true,
          multiplier: 1,
        },
      })

      setLocomotiveScroll(scroll)

      // Clean up
      return () => {
        if (scroll) scroll.destroy()
      }
    }
  }, [isLoading])

  // Update scroll on resize
  useEffect(() => {
    if (locomotiveScroll) {
      window.addEventListener("resize", () => locomotiveScroll.update())
      return () => {
        window.removeEventListener("resize", () => locomotiveScroll.update())
      }
    }
  }, [locomotiveScroll])

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    
    <>
  
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            className="loading-screen"
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            key="loading"
          >
            <div className="max-w-md w-full px-4">
              <motion.div
                initial={{ width: "0%" }}
                animate={{
                  width: "100%",
                  transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
                }}
                className="loading-bar"
              />
                
            </div>
          </motion.div>
        ) : (
          <div className="overflow-hidden" key="content">
            <Header locomotiveScroll={locomotiveScroll} />
            <main data-scroll-container ref={scrollRef}>
              <div data-scroll-section>
                <HeroSection />
                <MarqueeSection />
                <ProjectsSection />
                <ServicesSection />
                <ContactSection />
              </div>
            </main>
          </div>
        )}
      </AnimatePresence>
     
    </>
  )
}

