"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function HomerunCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smooth springs for homerun aesthetic
  const springConfig = { damping: 30, stiffness: 600, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12)
      cursorY.set(e.clientY - 12)
      setIsVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.matches('button, a, [role="button"]')) {
        setCursorVariant("pointer")
      } else if (target.matches("h1, h2, h3")) {
        setCursorVariant("text")
      } else {
        setCursorVariant("default")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      width: 24,
      height: 24,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "none",
    },
    pointer: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      border: "2px solid rgba(0, 0, 0, 0.6)",
    },
    text: {
      width: 80,
      height: 8,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      border: "none",
    },
  }

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={variants[cursorVariant as keyof typeof variants]}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 400,
        mass: 0.2,
      }}
    />
  )
}
