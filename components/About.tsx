"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const timeline = [
    { year: "2015", title: "BB Ki Vines", desc: "Started creating comedy content" },
    { year: "2018", title: "10M Milestone", desc: "First Indian creator to reach 10M" },
    { year: "2019", title: "Music Journey", desc: "Released original compositions" },
    { year: "2021", title: "Dhindora", desc: "Launched web series" },
    { year: "2024", title: "20M Community", desc: "Growing creative family" },
  ]

  const stats = [
    { number: "20M+", label: "Subscribers" },
    { number: "2B+", label: "Views" },
    { number: "50+", label: "Characters" },
    { number: "9+", label: "Years" },
  ]

  return (
    <section ref={containerRef} id="about" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-1/3 left-0 w-px h-24 bg-gradient-to-t from-transparent via-white/10 to-transparent"
        style={{
          y: useSpring(useTransform(y, [100, -100], [-50, 50]), {
            stiffness: 100,
            damping: 30,
          }),
        }}
      />

      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, margin: "-150px" }}
          className="mb-24 text-center"
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-wide uppercase"
              initial={{ y: 120 }}
              whileInView={{ y: 0 }}
              exit={{ y: -120 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              A B O U T
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-gray-400 max-w-2xl mx-auto font-light leading-relaxed tracking-wide uppercase"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{
              duration: 1.2,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: false }}
          >
            A journey from music to comedy, creating characters that feel like family to millions across the globe.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, margin: "-150px" }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group cursor-pointer"
              initial={{ opacity: 0, y: 60, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -60, scale: 0.8 }}
              transition={{
                delay: index * 0.15,
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                },
              }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-light text-white mb-4 tracking-wide group-hover:text-gray-300 transition-colors duration-700"
                whileHover={{
                  textShadow: "0 0 20px rgba(255,255,255,0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-500 text-xs tracking-wide uppercase font-light">{stat.label}</div>
              <motion.div
                className="w-8 h-px bg-white/20 mx-auto mt-6 group-hover:bg-white/40 transition-colors duration-700"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  delay: index * 0.15 + 0.5,
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
                whileHover={{ scaleX: 1.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -80 }}
          transition={{
            duration: 1.5,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, margin: "-150px" }}
        >
          <div className="overflow-hidden mb-16 text-center">
            <motion.h3
              className="text-3xl font-light text-white tracking-wide uppercase"
              initial={{ y: 60 }}
              whileInView={{ y: 0 }}
              exit={{ y: -60 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            >
              J O U R N E Y
            </motion.h3>
          </div>

          <div className="space-y-16 relative max-w-4xl mx-auto">
            {/* Connecting Line */}
            <motion.div
              className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-white/10 via-white/20 to-white/10 transform -translate-x-1/2"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              exit={{ height: 0 }}
              transition={{
                duration: 2.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} relative group cursor-pointer`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index % 2 === 0 ? 80 : -80 }}
                transition={{
                  delay: index * 0.2,
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false }}
                whileHover={{
                  scale: 1.02,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  },
                }}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 z-10 group-hover:bg-gray-300 transition-colors duration-500"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{
                    delay: index * 0.2 + 0.5,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  viewport={{ once: false }}
                  whileHover={{
                    scale: 1.5,
                    transition: { duration: 0.3 },
                  }}
                />

                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <div className="text-gray-500 text-xs font-mono mb-2 tracking-wide uppercase">{item.year}</div>
                  <motion.h4
                    className="text-white text-lg font-light mb-2 tracking-wide group-hover:text-gray-300 transition-colors duration-700"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      delay: index * 0.2 + 0.3,
                      duration: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    viewport={{ once: false }}
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p
                    className="text-gray-400 font-light leading-relaxed text-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      delay: index * 0.2 + 0.5,
                      duration: 1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    viewport={{ once: false }}
                  >
                    {item.desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
