"use client"

import { motion } from "framer-motion"
import { Youtube, Instagram, Twitter, Facebook } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Youtube, href: "https://www.youtube.com/@BBKiVines", color: "#ff0000" },
    { icon: Instagram, href: "https://www.instagram.com/bhuvan.bam22/", color: "#e4405f" },
    { icon: Twitter, href: "https://twitter.com/Bhuvan_Bam", color: "#1da1f2" },
    { icon: Facebook, href: "https://www.facebook.com/BBkiVines/", color: "#1877f2" },
  ]

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="container mx-auto px-8 py-16">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: false }}
        >
          <div className="mb-8 md:mb-0">
            <motion.div
              className="text-2xl font-light text-white mb-4 tracking-tight"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: false }}
            >
              BB Ki Vines
            </motion.div>
            <motion.p
              className="text-gray-500 font-light max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: false }}
            >
              Creating authentic stories that connect hearts across cultures and generations.
            </motion.p>
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-[#0a0a0a] rounded-lg flex items-center justify-center text-gray-400 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-500"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: social.color,
                    borderColor: social.color,
                  }}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            className="text-gray-500 text-sm font-light"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="mb-2">© 2025 BB Ki Vines</div>
            <div>All rights reserved</div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
