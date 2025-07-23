"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  angle: number
}

export default function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [clickEffects, setClickEffects] = useState<Array<{ id: number; x: number; y: number }>>([])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 })

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      color: Math.random() > 0.5 ? "#ffffff" : "#3b82f6",
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
    }))
    setParticles(initialParticles)
  }, [])

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    // Click handler for ripple effects
    const handleClick = (e: MouseEvent) => {
      const newEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setClickEffects((prev) => [...prev, newEffect])

      // Remove effect after animation
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
      }, 1000)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [mouseX, mouseY])

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: particle.x + Math.cos(particle.angle) * particle.speed,
          y: particle.y + Math.sin(particle.angle) * particle.speed,
          angle: particle.angle + 0.01,
          // Wrap around screen
          x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
          y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        })),
      )
    }

    const interval = setInterval(animateParticles, 16) // 60fps
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
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
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          x: springX,
          y: springY,
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Click Ripple Effects */}
      {clickEffects.map((effect) => (
        <motion.div
          key={effect.id}
          className="absolute rounded-full border border-blue-500/30"
          style={{
            left: effect.x,
            top: effect.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{
            width: 200,
            height: 200,
            opacity: 0,
            borderWidth: [2, 0],
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Interactive Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 border border-white/20"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        whileHover={{ scale: 1.5, borderColor: "#3b82f6" }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-6 h-6 rounded-full bg-white/10"
        animate={{
          y: [-10, 10, -10],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.3, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-3 h-8 bg-gradient-to-b from-white/20 to-transparent"
        animate={{
          rotate: [0, 180, 360],
          scaleY: [1, 1.5, 1],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        whileHover={{ scaleX: 2, backgroundColor: "#3b82f6" }}
      />

      {/* Floating Interactive Dots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full bg-white/20 cursor-pointer pointer-events-auto"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + Math.sin(i) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
          whileHover={{
            scale: 3,
            backgroundColor: "#3b82f6",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
          }}
          whileTap={{
            scale: 0.8,
            backgroundColor: "#ffffff",
          }}
        />
      ))}

      {/* Magnetic Lines */}
      <motion.div
        className="absolute top-1/3 left-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{
          x: springX,
          y: springY,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          x: springX,
          y: springY,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
