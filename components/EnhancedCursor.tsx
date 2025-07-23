"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function EnhancedCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Ultra smooth springs with different configs for different elements
  const mainSpring = { damping: 30, stiffness: 800, mass: 0.2 }
  const trailSpring = { damping: 40, stiffness: 200, mass: 0.8 }

  const cursorXSpring = useSpring(cursorX, mainSpring)
  const cursorYSpring = useSpring(cursorY, mainSpring)

  // Multiple trail cursors for smooth effect
  const trail1X = useSpring(cursorX, { ...trailSpring, mass: 1 })
  const trail1Y = useSpring(cursorY, { ...trailSpring, mass: 1 })
  const trail2X = useSpring(cursorX, { ...trailSpring, mass: 1.5 })
  const trail2Y = useSpring(cursorY, { ...trailSpring, mass: 1.5 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12)
      cursorY.set(e.clientY - 12)
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.matches('button, a, [role="button"]')) {
        setIsHovering(true)
        setCursorVariant("pointer")
        setCursorText("CLICK")
      } else if (target.matches("h1, h2, h3, .text-hover")) {
        setIsHovering(true)
        setCursorVariant("text")
        setCursorText("READ")
      } else if (target.matches("img, video, canvas")) {
        setIsHovering(true)
        setCursorVariant("view")
        setCursorText("VIEW")
      } else if (target.matches(".interactive-element")) {
        setIsHovering(true)
        setCursorVariant("play")
        setCursorText("PLAY")
      } else {
        setIsHovering(false)
        setCursorVariant("default")
        setCursorText("")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      backdropFilter: "blur(10px)",
    },
    pointer: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(20px)",
    },
    text: {
      width: 100,
      height: 8,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
      backdropFilter: "blur(10px)",
    },
    view: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "2px solid rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(20px)",
    },
    play: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      border: "2px solid rgba(59, 130, 246, 0.8)",
      backdropFilter: "blur(15px)",
    },
  }

  if (!isVisible) return null

  return (
    <>
      {/* Trail Cursors */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] w-4 h-4 bg-white/20 rounded-full mix-blend-difference"
        style={{
          x: trail2X,
          y: trail2Y,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 0.4,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-3 h-3 bg-white/30 rounded-full mix-blend-difference"
        style={{
          x: trail1X,
          y: trail1Y,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={variants[cursorVariant as keyof typeof variants]}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <motion.div
            className="text-white text-xs font-medium tracking-wider uppercase"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.div>
        )}

        {cursorVariant === "play" && (
          <motion.div
            className="w-4 h-4 border-l-4 border-l-blue-500 border-y-2 border-y-transparent ml-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996] border border-white/10 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.2 : 0.1,
          borderColor: isHovering ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Magnetic Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 80,
          height: 80,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)",
        }}
        animate={{
          scale: isHovering ? 1.5 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
