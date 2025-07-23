"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform-gpu z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Side Progress Indicator */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-px h-32 bg-white/10 relative">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white"
            style={{
              height: useSpring(useScroll().scrollYProgress, {
                stiffness: 100,
                damping: 30,
              }),
              scaleY: scrollYProgress,
              transformOrigin: "top",
            }}
          />
        </div>
        <div className="text-xs text-gray-500 tracking-[0.2em] uppercase mt-4 -rotate-90 origin-center whitespace-nowrap">
          Progress
        </div>
      </motion.div>
    </>
  )
}
