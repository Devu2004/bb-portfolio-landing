"use client"

import { useRef, useEffect } from "react"
import { useMotionValue, useSpring, useTransform } from "framer-motion"

interface MagneticOptions {
  strength?: number
  range?: number
  restoreSpeed?: number
  disabled?: boolean
}

export function useMagnetic({
  strength = 0.3,
  range = 100,
  restoreSpeed = 0.15,
  disabled = false,
}: MagneticOptions = {}) {
  const ref = useRef<HTMLElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 }
  const x = useSpring(useTransform(mouseX, [-range, range], [-range * strength, range * strength]), springConfig)
  const y = useSpring(useTransform(mouseY, [-range, range], [-range * strength, range * strength]), springConfig)

  useEffect(() => {
    if (disabled) return

    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < range) {
        mouseX.set(distanceX)
        mouseY.set(distanceY)
      } else {
        mouseX.set(0)
        mouseY.set(0)
      }
    }

    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }

    document.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY, range, disabled])

  return { ref, x, y }
}
