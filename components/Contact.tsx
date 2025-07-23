"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import MagneticButton from "./MagneticButton"

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 3000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const socialLinks = [
    { name: "YouTube", href: "https://www.youtube.com/@BBKiVines" },
    { name: "Instagram", href: "https://www.instagram.com/bhuvan.bam22/" },
    { name: "Twitter", href: "https://twitter.com/Bhuvan_Bam" },
  ]

  const handleSocialClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <section ref={containerRef} id="contact" className="py-32 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-20 h-px bg-white/10"
        style={{ y }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      />

      <div className="container mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight cursor-pointer"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: false }}
              whileHover={{
                scale: 1.02,
                color: "#e5e5e5",
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
            >
              #CONNECT
            </motion.h2>
          </div>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: false }}
          >
            Let's collaborate on something meaningful. Always open to new ideas and creative partnerships.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <div className="mb-12">
              <motion.h3
                className="text-2xl font-light text-white mb-8 tracking-tight cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: false }}
                whileHover={{
                  x: 10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
              >
                Get in touch
              </motion.h3>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <div className="text-white text-sm tracking-wide uppercase mb-2 font-semibold">Email</div>
                  <motion.a
                    href="mailto:hello@bbkivines.com"
                    className="text-gray-400 hover:text-white transition-colors duration-500 font-light cursor-pointer"
                    whileHover={{
                      x: 10,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 400, damping: 17 },
                    }}
                  >
                    hello@bbkivines.com
                  </motion.a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <div className="text-white text-sm tracking-wide uppercase mb-2 font-semibold">Location</div>
                  <div className="text-gray-400 font-light">Mumbai, India</div>
                </motion.div>
              </div>
            </div>

            <div>
              <motion.h4
                className="text-white text-sm tracking-wide uppercase mb-6 font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: false }}
              >
                Follow
              </motion.h4>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={social.name}
                    onClick={() => handleSocialClick(social.href)}
                    className="flex items-center justify-between text-gray-400 hover:text-white transition-colors duration-500 py-2 border-b border-white/5 group cursor-pointer w-full text-left bg-transparent border-l-0 border-r-0 border-t-0"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                    viewport={{ once: false }}
                    whileHover={{
                      x: 15,
                      transition: { type: "spring", stiffness: 400, damping: 17 },
                    }}
                  >
                    <span className="font-light flex items-center">
                      {social.name}
                      <ExternalLink className="w-3 h-3 ml-2 opacity-50" />
                    </span>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{
                        opacity: 1,
                        scale: 1,
                        rotate: 45,
                        color: "#ffffff",
                        transition: { type: "spring", stiffness: 400, damping: 17 },
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: false, margin: "-100px" }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: false }}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-500 focus:border-white focus:ring-0 rounded-none px-0 py-4 font-light transition-all duration-500 hover:border-white/40"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: false }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-500 focus:border-white focus:ring-0 rounded-none px-0 py-4 font-light transition-all duration-500 hover:border-white/40"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: false }}
              >
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-transparent border-0 border-b border-white/20 text-white placeholder-gray-500 focus:border-white focus:ring-0 rounded-none px-0 py-4 resize-none font-light transition-all duration-500 hover:border-white/40"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: false }}
              >
                <MagneticButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 text-sm tracking-wide group transition-all duration-300 ${
                    submitStatus === "success"
                      ? "bg-green-600 hover:bg-green-700"
                      : submitStatus === "error"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-white hover:bg-gray-100"
                  } text-black`}
                  strength={0.4}
                  range={100}
                >
                  {isSubmitting
                    ? "SENDING..."
                    : submitStatus === "success"
                      ? "MESSAGE SENT!"
                      : submitStatus === "error"
                        ? "TRY AGAIN"
                        : "SEND MESSAGE"}
                </MagneticButton>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
