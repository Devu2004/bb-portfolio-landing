"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface MinimalLoaderProps {
  onComplete: () => void
}

export default function MinimalLoader({ onComplete }: MinimalLoaderProps) {
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
          }, 1500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(timer)
  }, [onComplete])

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "#a8a084", // Matching the reference beige color
      }}
      exit={{
        opacity: 0,
        scale: 1.02,
      }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="text-center">
        {/* Title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="text-black text-lg font-normal mb-1 tracking-tight">Bhuvan Bam</div>
          <div className="text-black text-lg font-normal tracking-tight">Portfolio</div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="w-16 h-16 bg-red-600 rounded-sm flex items-center justify-center overflow-hidden">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="BB"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          className="text-black text-lg font-normal mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {progress}%
        </motion.div>

        {/* Sound Toggle */}
        <motion.button
          className="text-black text-sm font-normal flex items-center justify-center space-x-2 bg-transparent border-none cursor-pointer"
          onClick={handleSoundToggle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          whileHover={{ opacity: 0.7 }}
        >
          <span>Click to enable</span>
          <motion.svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            className="ml-1"
            animate={{ rotate: soundEnabled ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                className="text-black text-2xl font-light"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              >
                Welcome
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
