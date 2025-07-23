"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useState, useEffect } from "react"

export default function CrystalCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorVariant, setCursorVariant] = useState("default")

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Crystal clear springs
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10)
      cursorY.set(e.clientY - 10)
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
      width: 20,
      height: 20,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      mixBlendMode: "difference" as const,
    },
    pointer: {
      width: 50,
      height: 50,
      backgroundColor: "rgba(59, 130, 246, 0.3)",
      border: "2px solid rgba(59, 130, 246, 0.8)",
      mixBlendMode: "normal" as const,
    },
    text: {
      width: 60,
      height: 6,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      mixBlendMode: "difference" as const,
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
        damping: 20,
        stiffness: 400,
        mass: 0.2,
      }}
    />
  )
}
