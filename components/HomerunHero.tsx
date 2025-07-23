"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Play, ExternalLink } from "lucide-react"
import MagneticButton from "./MagneticButton"

export default function HomerunHero() {
  const [text, setText] = useState("")
  const fullText = "Content Creator & Storyteller"
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 100,
    damping: 30,
  })
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-3, 3]), {
    stiffness: 100,
    damping: 30,
  })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 60)

    return () => clearInterval(timer)
  }, [])

  const handleWatchLatest = () => {
    window.open("https://www.youtube.com/@BBKiVines", "_blank", "noopener,noreferrer")
  }

  const handleExploreWork = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #e8d5ff 0%, #d4b5ff 25%, #c49bff 50%, #b481ff 75%, #a367ff 100%)",
      }}
    >
      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 w-full"
        style={{ opacity, scale, x: parallaxX, y: parallaxY }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}>
          {/* HOMERUN Style Typography */}
          <div className="mb-16">
            <div className="overflow-hidden">
              <motion.div
                className="flex justify-center items-center"
                initial={{ y: 120 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
              >
                {/* BHUVAN in bold black */}
                <motion.span
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black text-black tracking-tight cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.5,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  whileHover={{
                    scale: 1.02,
                    textShadow: "0 0 30px rgba(0,0,0,0.3)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    },
                  }}
                >
                  BHUVAN
                </motion.span>

                {/* BAM in light gray */}
                <motion.span
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-light text-gray-400 tracking-tight cursor-pointer ml-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 1.8,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  whileHover={{
                    scale: 1.02,
                    color: "#6b7280",
                    textShadow: "0 0 20px rgba(107,114,128,0.3)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    },
                  }}
                >
                  BAM
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Minimal Subtitle */}
          <motion.div
            className="text-lg sm:text-xl text-black/70 mb-20 tracking-wide font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.2 }}
          >
            {text}
            <motion.span
              className="ml-1 text-black"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1.2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              |
            </motion.span>
          </motion.div>

          {/* Minimal Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 1.2 }}
          >
            <MagneticButton
              variant="primary"
              onClick={handleWatchLatest}
              className="px-10 py-4 text-sm tracking-wide uppercase w-full sm:w-auto group bg-black text-white hover:bg-gray-800 font-medium rounded-full border-none"
              strength={0.2}
              range={60}
            >
              <Play className="w-4 h-4 mr-3" />
              WATCH LATEST
              <ExternalLink className="w-4 h-4 ml-3 opacity-70" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={handleExploreWork}
              className="px-10 py-4 text-sm tracking-wide uppercase w-full sm:w-auto group border-2 border-black/30 hover:border-black/60 bg-transparent text-black font-light rounded-full"
              strength={0.2}
              range={60}
            >
              EXPLORE WORK
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <motion.button
          className="cursor-pointer flex flex-col items-center space-y-3 group bg-transparent border-none"
          whileHover={{
            scale: 1.05,
            y: -5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-6 h-12 border-2 border-black/30 rounded-full flex justify-center relative group-hover:border-black/60 transition-colors duration-300"
            whileHover={{
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <motion.div
              className="w-1.5 h-4 bg-black/60 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <div className="text-xs text-black/60 tracking-wide uppercase font-light group-hover:text-black/80 transition-colors">
            scroll
          </div>
        </motion.button>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-3 h-3 bg-black/10 rounded-full"
        animate={{
          y: [-15, 15, -15],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ x: parallaxX, y: parallaxY }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-2 h-12 bg-gradient-to-b from-black/5 to-transparent rounded-full"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{ x: parallaxX, y: parallaxY }}
      />

      <motion.div
        className="absolute top-2/3 right-1/3 w-4 h-4 border border-black/20 rounded-sm"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        style={{ x: parallaxX, y: parallaxY }}
      />
    </section>
  )
}
