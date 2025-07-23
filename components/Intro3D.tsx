"use client"

import { Canvas } from "@react-three/fiber"
import { Suspense, useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import IntroScene from "./IntroScene"

interface Intro3DProps {
  onComplete: () => void
}

export default function Intro3D({ onComplete }: Intro3DProps) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for subtle effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), {
    stiffness: 100,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), {
    stiffness: 100,
    damping: 30,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const x = (e.clientX - centerX) / rect.width
      const y = (e.clientY - centerY) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setStage(1)
            setTimeout(onComplete, 1200)
          }, 800)
          return 100
        }
        return prev + 1.2
      })
    }, 35)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      exit={{
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
      }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Three.js Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.8 }}
        >
          <Suspense fallback={null}>
            <IntroScene progress={progress} stage={stage} />
          </Suspense>
        </Canvas>
      </div>

      {/* Minimalist BB Logo */}
      <motion.div
        className="relative z-10"
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 2.5, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="text-8xl md:text-9xl font-light text-white tracking-[0.3em] relative"
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.3)",
              "0 0 40px rgba(255,255,255,0.5)",
              "0 0 20px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          BB
        </motion.div>

        {/* Subtle glow rings */}
        <motion.div
          className="absolute inset-0 border border-white/10 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border border-white/5 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>

      {/* Progress Counter - Bottom Right */}
      <motion.div
        className="absolute bottom-8 right-8 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <motion.div
          className="text-2xl md:text-3xl font-light text-white font-mono tracking-wider"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {Math.round(progress).toString().padStart(2, "0")}
        </motion.div>
        <div className="text-xs text-gray-500 tracking-[0.2em] uppercase mt-2">Loading</div>
      </motion.div>

      {/* Minimal Progress Bar - Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div className="h-full bg-white" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </motion.div>

      {/* Completion Animation */}
      <AnimatePresence>
        {stage === 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="text-center">
              <motion.div
                className="text-3xl md:text-4xl font-light text-white mb-4 tracking-[0.2em] uppercase"
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              >
                Welcome
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </motion.div>
  )
}
