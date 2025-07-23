"use client"

import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/useMagnetic"
import type { ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  strength?: number
  range?: number
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
  strength = 0.4,
  range = 80,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const { ref, x, y } = useMagnetic({ strength, range, disabled })

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-white text-black hover:bg-gray-100 font-medium"
      case "secondary":
        return "border border-white/20 text-white hover:border-white/40 bg-transparent font-light"
      case "ghost":
        return "text-white hover:text-gray-300 bg-transparent font-light"
      default:
        return "bg-white text-black hover:bg-gray-100 font-medium"
    }
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={`relative overflow-hidden transition-all duration-300 ${getVariantStyles()} ${className}`}
      style={{ x, y }}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative z-10 flex items-center justify-center w-full h-full">{children}</span>

      {/* Hover Effect */}
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ x: "-100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      )}

      {variant === "secondary" && (
        <span className="absolute inset-0 flex items-center justify-center text-white-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          {children}
        </span>
      )}

      {/* Magnetic glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 pointer-events-none"
        whileHover={{ opacity: variant === "primary" ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
