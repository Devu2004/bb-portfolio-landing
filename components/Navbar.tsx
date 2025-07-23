"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"])
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20])
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1])

  const navItems = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Work", href: "#videos", id: "videos" },
    { name: "Store", href: "#merch", id: "merch" },
    { name: "Contact", href: "#contact", id: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))

      const currentSection = sections.find((section) => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: "smooth" })
    setActiveSection(id)
    setIsOpen(false)
  }

  const handleYouTubeClick = () => {
    window.open("https://www.youtube.com/@BBKiVines", "_blank", "noopener,noreferrer")
  }

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: `blur(${backdropBlur}px)`,
        borderBottomColor: `rgba(255, 255, 255, ${borderOpacity})`,
      }}
      className="fixed top-0 w-full z-50 border-b border-transparent"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, delay: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.button
            className="text-2xl font-light text-white tracking-wide cursor-pointer bg-transparent border-none relative group"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
            }}
            onClick={() => scrollToSection("#home", "home")}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            BB
            <motion.div
              className="absolute -bottom-1 left-0 h-px bg-white"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`relative text-sm tracking-wide uppercase font-light transition-colors duration-500 bg-transparent border-none group ${
                  activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 1.5, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div
                  className="absolute -bottom-1 left-0 h-px bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === item.id ? "100%" : 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                />
              </motion.button>
            ))}

            {/* YouTube Link */}
            <motion.button
              onClick={handleYouTubeClick}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors duration-500 bg-transparent border-none group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
              whileHover={{ y: -2, scale: 1.05 }}
            >
              <span className="tracking-wide uppercase font-light">YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 bg-transparent border-none relative"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.div
                className="w-6 h-0.5 bg-white mb-1.5 rounded-full"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 6 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-white mb-1.5 rounded-full"
                animate={{ opacity: isOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-4 h-0.5 bg-white rounded-full"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -6 : 0,
                  width: isOpen ? 24 : 16,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              className="md:hidden mt-8 pb-8 border-t border-white/10"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href, item.id)}
                  className={`block w-full text-left py-4 text-sm tracking-wide uppercase font-light transition-colors bg-transparent border-none ${
                    activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    {activeSection === item.id && (
                      <motion.div
                        className="w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </div>
                </motion.button>
              ))}

              <motion.button
                onClick={handleYouTubeClick}
                className="block w-full text-left py-4 text-sm tracking-wide uppercase font-light text-gray-400 hover:text-white transition-colors bg-transparent border-none"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center space-x-2">
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
