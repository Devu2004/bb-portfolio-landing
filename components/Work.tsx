"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export default function Work() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with advanced filtering and payment integration",
      image: "ecommerce-platform",
      tags: ["React", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Brand Identity System",
      description: "Complete brand identity design for a tech startup including logo and guidelines",
      image: "brand-identity",
      tags: ["Branding", "Logo Design", "Guidelines"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Mobile App UI",
      description: "Clean and intuitive mobile app interface design for fitness tracking",
      image: "mobile-app",
      tags: ["UI/UX", "Mobile", "Figma"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Dashboard Analytics",
      description: "Data visualization dashboard with real-time analytics and reporting",
      image: "dashboard",
      tags: ["React", "D3.js", "Analytics"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website for a photographer with gallery features",
      image: "portfolio",
      tags: ["Next.js", "Photography", "Gallery"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "SaaS Landing Page",
      description: "High-converting landing page design for a SaaS product launch",
      image: "saas-landing",
      tags: ["Landing Page", "Conversion", "SaaS"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="work" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#00d4ff] to-[#a855f7] bg-clip-text text-transparent">
                Featured Work
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A selection of projects that showcase my skills in design and development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="group relative bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/10 hover:border-[#00d4ff]/50 transition-all duration-500"
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0, 212, 255, 0.1)",
                }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=250&width=400&query=${project.image}`}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Overlay Links */}
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={project.liveUrl}
                      className="w-10 h-10 bg-[#00d4ff] rounded-full flex items-center justify-center text-white hover:bg-[#00b8e6] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      className="w-10 h-10 bg-[#a855f7] rounded-full flex items-center justify-center text-white hover:bg-[#9333ea] transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#0a0a0a] text-[#00d4ff] text-sm rounded-full border border-[#00d4ff]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(45deg, #00d4ff, #a855f7, #00d4ff)",
                    padding: "2px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
