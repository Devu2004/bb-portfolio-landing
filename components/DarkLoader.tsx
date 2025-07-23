"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DarkLoaderProps {
  onComplete: () => void
}

export default function DarkLoader({ onComplete }: DarkLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [showComplete, setShowComplete] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setShowComplete(true)
          setTimeout(() => {
            onComplete()
          }, 1200)
          return 100
        }
        return prev + 1.8
      })
    }, 45)

    return () => clearInterval(timer)
  }, [onComplete])

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      exit={{
        opacity: 0,
        scale: 1.02,
      }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="text-center">
        {/* Title */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className="text-white text-xl font-light mb-2 tracking-tight">Bhuvan Bam</div>
          <div className="text-gray-400 text-lg font-light tracking-tight">Portfolio</div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-white text-2xl font-light tracking-wider">BB</div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="text-white text-2xl font-light mb-20 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {progress.toFixed(0)}%
        </motion.div>

        {/* Sound Toggle */}
        <motion.button
          className="text-gray-400 text-sm font-light flex items-center justify-center space-x-2 bg-transparent border-none cursor-pointer hover:text-white transition-colors duration-300"
          onClick={handleSoundToggle}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <span>Click to enable</span>
          <motion.svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            className="ml-1"
            animate={{ rotate: soundEnabled ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
          <span>sound</span>
        </motion.button>

        {/* Completion Animation */}
        <AnimatePresence>
          {showComplete && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-white text-3xl font-light tracking-wide"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              >
                Welcome
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Minimal Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div className="h-full bg-white/30" style={{ width: `${progress}%` }} transition={{ duration: 0.1 }} />
      </motion.div>
    </motion.div>
  )
}
