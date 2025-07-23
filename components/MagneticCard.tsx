"use client"

import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/useMagnetic"
import type { ReactNode } from "react"

interface MagneticCardProps {
  children: ReactNode
  className?: string
  strength?: number
  range?: number
  glowEffect?: boolean
}

export default function MagneticCard({
  children,
  className = "",
  strength = 0.2,
  range = 120,
  glowEffect = true,
}: MagneticCardProps) {
  const { ref, x, y } = useMagnetic({ strength, range })

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer ${className}`}
      style={{ x, y }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        rotateX: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}

      {glowEffect && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-inherit"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />
      )}
    </motion.div>
  )
}
