"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "sarah-johnson",
      rating: 5,
      text: "Alex delivered exceptional work that exceeded our expectations. The attention to detail and creative approach was outstanding.",
    },
    {
      name: "Michael Chen",
      role: "Product Manager, InnovateCorp",
      image: "michael-chen",
      rating: 5,
      text: "Working with Alex was a pleasure. Professional, timely, and the final product was exactly what we envisioned.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthLab",
      image: "emily-rodriguez",
      rating: 5,
      text: "The brand identity Alex created for us perfectly captured our vision. Highly recommend for any design project.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
    <section id="testimonials" className="py-20 bg-[#1a1a1a]/30">
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
                What Clients Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take my word for it - here's what my clients have to say about working with me
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={itemVariants}
                className="relative bg-[#0a0a0a] p-8 rounded-2xl border border-white/10 hover:border-[#00d4ff]/30 transition-all duration-300 group"
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px rgba(0, 212, 255, 0.1)",
                }}
              >
                {/* Quote Icon */}
                <motion.div
                  className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-[#00d4ff] to-[#a855f7] rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Quote className="w-4 h-4 text-white" />
                </motion.div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-300 mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                {/* Client Info */}
                <div className="flex items-center">
                  <motion.div
                    className="relative w-12 h-12 rounded-full overflow-hidden mr-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Image
                      src={`/placeholder.svg?height=48&width=48&query=${testimonial.image}`}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/20 to-[#a855f7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(45deg, #00d4ff, #a855f7, #00d4ff)",
                    padding: "1px",
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
