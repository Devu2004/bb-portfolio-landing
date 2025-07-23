"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { Play, ExternalLink } from "lucide-react"
import MagneticButton from "./MagneticButton"
import ReactBits from "./ReactBits"

export default function DarkHero() {
  const [text, setText] = useState("")
  const fullText = "Content Creator & Storyteller"
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 30,
  })
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), {
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
    }, 50)

    return () => clearInterval(timer)
  }, [])

  const nameChars = "BHUVAN".split("")
  const surnameChars = "BAM".split("")

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
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
      }}
    >
      {/* React Bits Background */}
      <ReactBits />

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20 w-full"
        style={{ opacity, scale, x: parallaxX, y: parallaxY }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.3 }}>
          {/* Typography */}
          <div className="mb-12">
            <div className="overflow-hidden mb-6">
              <motion.div
                className="flex justify-center flex-wrap"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                {nameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light text-white inline-block cursor-pointer relative mx-1 sm:mx-2 tracking-tight"
                    initial={{ opacity: 0, y: 80, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.2 + index * 0.08,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.03,
                      textShadow: "0 0 25px rgba(255,255,255,0.6)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 12,
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.div
                className="flex justify-center flex-wrap"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
              >
                {surnameChars.map((char, index) => (
                  <motion.span
                    key={index}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-light text-gray-400 inline-block cursor-pointer relative mx-1 sm:mx-2 tracking-tight"
                    initial={{ opacity: 0, y: 80, rotateX: 90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.6 + index * 0.08,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.03,
                      color: "#ffffff",
                      textShadow: "0 0 25px rgba(255,255,255,0.4)",
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 12,
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Subtitle */}
          <motion.div
            className="text-lg sm:text-xl text-gray-400 mb-16 tracking-wide font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            {text}
            <motion.span
              className="ml-1 text-white"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              |
            </motion.span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1 }}
          >
            <MagneticButton
              variant="primary"
              onClick={handleWatchLatest}
              className="px-8 py-4 text-sm tracking-wide uppercase w-full sm:w-auto group bg-white text-black hover:bg-gray-100 font-medium rounded-none"
              strength={0.3}
              range={80}
            >
              <Play className="w-4 h-4 mr-3" />
              WATCH LATEST
              <ExternalLink className="w-4 h-4 ml-3 opacity-70" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={handleExploreWork}
              className="px-8 py-4 text-sm tracking-wide uppercase w-full sm:w-auto group border border-white/40 hover:border-white/70 bg-transparent text-white font-light rounded-none"
              strength={0.3}
              range={80}
            >
              EXPLORE WORK
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-8 z-30"
        style={{ opacity }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
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
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-6 h-10 border border-white/30 rounded-full flex justify-center relative group-hover:border-white/60 transition-colors duration-300"
            whileHover={{
              boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            }}
          >
            <motion.div
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <div className="text-xs text-gray-500 tracking-wide uppercase font-light group-hover:text-gray-300 transition-colors">
            scroll
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
}
