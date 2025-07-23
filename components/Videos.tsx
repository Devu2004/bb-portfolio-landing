"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { Play, ArrowUpRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import MagneticCard from "./MagneticCard"
import MagneticButton from "./MagneticButton"

export default function Videos() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const videos = [
    {
      id: 1,
      title: "Dhindora | Official trailer",
      category: "Comedy Series",
      duration: "2:09",
      views: "38M",
      date: "3 years ago",
      thumbnail: "/images/banner-1.png",
      description: "Presenting BB Ki Vines' first ever web series 'Dhindora'. This one of a kind series has comedy, entertainment and drama. ",
      youtubeUrl: "https://youtu.be/IUsiTOUo3HE?si=ZAFzRo32Ns1tFoHl",
      featured: true,
    },
    {
      id: 2,
      title: "Let's try ANIL",
      category: "Character Comedy",
      duration: "6:32",
      views: "7.1M",
      date: "8 years ago",
      thumbnail: "/images/banner-2.png",
      description: "BB and Bancho decide to study together but Dad and Sameer are proving to be very distracting.",
      youtubeUrl: "https://youtu.be/F1qFB4n9K6Q?si=cGJcOCsbigAcgkWq",
      featured: false,
    },
    {
      id: 3,
      title: "Maun Vrat",
      category: "Family Comedy",
      duration: "5:03",
      views: "38M",
      date: "7 years ago",
      thumbnail: "/images/banner-3.png",
      description: "BB has to be mute for a day in order to achieve good grades, as told by a philosophical guru",
      youtubeUrl: "https://youtu.be/FPm7xM849-E?si=7aEcn1lea8eY_I81",
      featured: true,
    },
    {
      id: 4,
      title: "Babloo ji romantic mood mein?",
      category: "Comedy",
      duration: "8:09",
      views: "58M",
      date: "7 years ago",
      thumbnail: "/images/banner-4.png",
      description: "What happens when Titu Mama and BB plan an anniversary party for Babloo and Janki?",
      youtubeUrl: "https://youtu.be/e9sEYgOUeQA?si=hNaTQVQgW-0AVags",
      featured: false,
    },
    {
      id: 5,
      title: "Ajnabi - Bhuvan Bam",
      category: "Music",
      duration: "4:25",
      views: "15M",
      date: "5 years ago",
      thumbnail: "/images/banner-5.png",
      description: "Bhuvan Bam releases his 6th Single 'Ajnabee'. True love that didn’t fade with time and unsaid words.",
      youtubeUrl: "https://youtu.be/_Dx9Qjod0s0?si=YHkWihA56hyVe7nt",
      featured: true,
    },
  ]

  const handleWatchVideo = (youtubeUrl: string) => {
    window.open(youtubeUrl, "_blank", "noopener,noreferrer")
  }

  const handleViewAllVideos = () => {
    window.open("https://www.youtube.com/@BBKiVines/videos", "_blank", "noopener,noreferrer")
  }

  return (
    <section
      ref={containerRef}
      id="videos"
      className="py-32 bg-[#0f0f0f] relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }}
    >
      {/* Corner elements */}
      <motion.div
        className="absolute top-8 left-8 text-xs text-gray-600 tracking-[0.3em] uppercase font-light"
        style={{ y }}
      >
        LATEST CONTENT
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 text-xs text-gray-600 tracking-[0.3em] uppercase font-light"
        style={{ y }}
      >
        VIRAL MOMENTS
      </motion.div>

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
              className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-[0.2em] uppercase cursor-pointer"
              initial={{ y: 120 }}
              whileInView={{ y: 0 }}
              exit={{ y: -120 }}
              transition={{
                duration: 1.2,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: false }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 30px rgba(255,255,255,0.2)",
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              W O R K
            </motion.h2>
          </div>
          <motion.p
            className="text-sm text-gray-500 max-w-2xl mx-auto font-light leading-relaxed tracking-[0.1em] uppercase"
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
            A curated collection of stories, characters, and moments that have touched millions of hearts.
          </motion.p>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false, margin: "-150px" }}
        >
          <div className="text-xs text-gray-600 tracking-[0.3em] uppercase mb-8 font-light">Featured</div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <MagneticCard
              strength={0.2}
              range={120}
              className="relative group"
              onMouseEnter={() => setHoveredVideo(videos[0].id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <div className="relative overflow-hidden bg-[#1a1a1a] border border-white/5">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                >
                  <Image
                    src={videos[0].thumbnail || "/placeholder.svg"}
                    alt={videos[0].title}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover"
                  />
                </motion.div>

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredVideo === videos[0].id ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.button
                    className="w-16 h-16 border border-white/30 flex items-center justify-center backdrop-blur-sm bg-transparent"
                    onClick={() => handleWatchVideo(videos[0].youtubeUrl)}
                    whileHover={{
                      scale: 1.2,
                      borderColor: "rgba(255,255,255,0.6)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.button>
                </motion.div>

                {/* Badges */}
                <div className="absolute bottom-4 right-4 text-white text-xs tracking-[0.1em] uppercase font-light">
                  {videos[0].duration}
                </div>

                <div className="absolute top-4 left-4 text-white text-xs tracking-[0.1em] uppercase font-light">
                  {videos[0].views}
                </div>
              </div>
            </MagneticCard>

            <div className="space-y-8">
              <div>
                <div className="text-xs text-gray-600 tracking-[0.2em] uppercase mb-4 font-light">
                  {videos[0].category}
                </div>
                <motion.h3
                  className="text-3xl font-light text-white mb-6 tracking-[0.05em] cursor-pointer"
                  whileHover={{
                    color: "#e5e5e5",
                    x: 10,
                    scale: 1.01,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    },
                  }}
                >
                  {videos[0].title}
                </motion.h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8 text-sm">{videos[0].description}</p>
              </div>

              <div className="flex items-center space-x-8 text-xs text-gray-600 tracking-[0.1em] uppercase">
                <span>{videos[0].date}</span>
                <span>{videos[0].views} views</span>
              </div>

              <MagneticButton
                variant="ghost"
                onClick={() => handleWatchVideo(videos[0].youtubeUrl)}
                className="px-8 py-4 text-xs tracking-[0.2em] uppercase group border border-white/20 hover:border-white/40 bg-transparent"
                strength={0.3}
                range={80}
              >
                <Play className="w-3 h-3 mr-3" />
                WATCH NOW
                <ExternalLink className="w-3 h-3 ml-3 opacity-50" />
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {videos.slice(1).map((video, index) => (
            <MagneticCard
              key={video.id}
              strength={0.15}
              range={80}
              className="group"
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.95 }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: false, margin: "-150px" }}
              >
                <div className="relative overflow-hidden bg-[#1a1a1a] mb-8 border border-white/5">
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: {
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                  >
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredVideo === video.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.button
                      className="w-12 h-12 border border-white/30 flex items-center justify-center backdrop-blur-sm bg-transparent"
                      onClick={() => handleWatchVideo(video.youtubeUrl)}
                      whileHover={{
                        scale: 1.2,
                        borderColor: "rgba(255,255,255,0.6)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <Play className="w-4 h-4 text-white ml-0.5" />
                    </motion.button>
                  </motion.div>

                  {/* Badges */}
                  <div className="absolute bottom-3 right-3 text-white text-xs tracking-[0.1em] uppercase font-light">
                    {video.duration}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs text-gray-600 tracking-[0.2em] uppercase font-light">{video.category}</div>
                  <motion.h3
                    className="text-white text-lg font-light tracking-[0.05em] group-hover:text-gray-300 transition-colors duration-500 cursor-pointer"
                    whileHover={{
                      x: 5,
                      scale: 1.01,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      },
                    }}
                  >
                    {video.title}
                  </motion.h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-700 tracking-[0.1em] uppercase">
                    <span>{video.date}</span>
                    <motion.button
                      className="bg-transparent border-none p-0"
                      whileHover={{
                        scale: 1.2,
                        rotate: 45,
                        color: "#ffffff",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      onClick={() => handleWatchVideo(video.youtubeUrl)}
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </MagneticCard>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{
            duration: 1.2,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: false }}
        >
          <MagneticButton
            variant="ghost"
            onClick={handleViewAllVideos}
            className="px-12 py-4 text-xs tracking-[0.2em] uppercase group border border-white/20 hover:border-white/40 bg-transparent"
            strength={0.3}
            range={100}
          >
            VIEW ALL VIDEOS
            <ExternalLink className="w-3 h-3 ml-3 opacity-50" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
