"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

export default function ReactBits() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Initialize particles
  useEffect(() => {
    const createParticle = (x: number, y: number): Particle => ({
      id: Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? "#ffffff" : "#3b82f6",
    })

    const initialParticles = Array.from({ length: 20 }, () =>
      createParticle(Math.random() * window.innerWidth, Math.random() * window.innerHeight),
    )
    setParticles(initialParticles)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsActive(true)
    }

    const handleMouseLeave = () => {
      setIsActive(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY])

  // Particle animation
  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.vx
          let newY = particle.y + particle.vy

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            particle.vx *= -1
            newX = Math.max(0, Math.min(window.innerWidth, newX))
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            particle.vy *= -1
            newY = Math.max(0, Math.min(window.innerHeight, newY))
          }

          // Mouse attraction
          if (isActive) {
            const dx = mousePosition.x - newX
            const dy = mousePosition.y - newY
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 150) {
              const force = (150 - distance) / 150
              particle.vx += (dx / distance) * force * 0.1
              particle.vy += (dy / distance) * force * 0.1
            }
          }

          // Damping
          particle.vx *= 0.99
          particle.vy *= 0.99

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )
    }

    const interval = setInterval(animateParticles, 16) // 60fps
    return () => clearInterval(interval)
  }, [mousePosition, isActive])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Mouse Follower */}
      <motion.div
        className="absolute w-20 h-20 rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Interactive Dots */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-3 h-3 rounded-full bg-white/20 cursor-pointer pointer-events-auto"
          style={{
            left: `${15 + i * 7}%`,
            top: `${20 + Math.sin(i) * 30}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          whileHover={{
            scale: 2,
            backgroundColor: "#3b82f6",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
          }}
          whileTap={{
            scale: 0.8,
            backgroundColor: "#ffffff",
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-6 h-6 border border-white/30"
        animate={{
          rotate: 360,
          scale: [1, 1.3, 1],
        }}
        transition={{
          rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        whileHover={{
          scale: 1.8,
          borderColor: "#3b82f6",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-8 h-8 rounded-full bg-gradient-to-r from-white/10 to-blue-500/20"
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.5,
          backgroundColor: "#3b82f6",
          boxShadow: "0 0 25px rgba(59, 130, 246, 0.8)",
        }}
      />

      {/* Connecting Lines */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/3 w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        animate={{
          scaleY: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}
