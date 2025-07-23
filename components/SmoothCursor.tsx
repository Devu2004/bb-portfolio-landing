"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Ultra smooth springs
  const springConfig = { damping: 30, stiffness: 800, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trailing cursor
  const trailingConfig = { damping: 35, stiffness: 200, mass: 1 }
  const trailingXSpring = useSpring(cursorX, trailingConfig)
  const trailingYSpring = useSpring(cursorY, trailingConfig)

  // Outer Ring springs
  const outerRingXSpring = useSpring(cursorX, { damping: 40, stiffness: 150 })
  const outerRingYSpring = useSpring(cursorY, { damping: 40, stiffness: 150 })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8)
      cursorY.set(e.clientY - 8)
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
      } else if (target.matches("h1, h2, h3, .cursor-text")) {
        setIsHovering(true)
        setCursorVariant("text")
        setCursorText("")
      } else if (target.matches("img, video, canvas")) {
        setIsHovering(true)
        setCursorVariant("view")
        setCursorText("VIEW")
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
      width: 16,
      height: 16,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      border: "none",
    },
    pointer: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
    },
    text: {
      width: 80,
      height: 6,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      border: "none",
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "2px solid rgba(255, 255, 255, 0.8)",
    },
  }

  if (!isVisible) return null

  return (
    <>
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
          mass: 0.8,
        }}
      >
        {cursorText && (
          <motion.div
            className="text-white text-xs font-medium tracking-wider"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Trailing Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-1 h-1 bg-white/40 rounded-full mix-blend-difference"
        style={{
          x: trailingXSpring,
          y: trailingYSpring,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997] w-8 h-8 border border-white/20 rounded-full mix-blend-difference"
        style={{
          x: outerRingXSpring,
          y: outerRingYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.3 : 0.2,
        }}
        transition={{ duration: 0.4 }}
      />
    </>
  )
}
