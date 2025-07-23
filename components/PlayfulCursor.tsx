"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function PlayfulCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Ultra smooth springs
  const springConfig = { damping: 25, stiffness: 700, mass: 0.3 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trail effect
  useEffect(() => {
    const updateTrail = () => {
      const x = cursorX.get()
      const y = cursorY.get()

      setTrail((prev) => {
        const newTrail = [{ x, y, id: Date.now() }, ...prev.slice(0, 8)]
        return newTrail
      })
    }

    const unsubscribe = cursorXSpring.onChange(updateTrail)
    return unsubscribe
  }, [cursorX, cursorY, cursorXSpring])

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
      } else if (target.matches(".interactive-element")) {
        setIsHovering(true)
        setCursorVariant("play")
      } else {
        setIsHovering(false)
        setCursorVariant("default")
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
      width: 40,
      height: 40,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      border: "2px solid rgba(59, 130, 246, 0.8)",
    },
    play: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      border: "2px solid rgba(59, 130, 246, 0.6)",
    },
  }

  if (!isVisible) return null

  return (
    <>
      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed top-0 left-0 pointer-events-none z-[9997] w-2 h-2 bg-blue-500/30 rounded-full"
          style={{
            x: point.x + 6,
            y: point.y + 6,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{
            opacity: 0.6 - index * 0.08,
            scale: 1 - index * 0.1,
          }}
          transition={{ duration: 0.3 }}
        />
      ))}

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
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        {cursorVariant === "play" && (
          <motion.div
            className="w-3 h-3 border-l-4 border-l-blue-500 border-y-2 border-y-transparent ml-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Magnetic Effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-8 h-8 border border-blue-500/20 rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  )
}
