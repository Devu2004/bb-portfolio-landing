"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import MagneticCard from "./MagneticCard"
import MagneticButton from "./MagneticButton"
import Link from "next/link"

export default function Merch() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const products = [
    {
      id: 1,
      name: "T-shirt",
      price: "₹499",
      image: "/images/tshirt.png",
      category: "Apparel",
      link: "https://youthiapa.com/products/oh-yeah-black-t-shirt?_pos=6&_sid=7f6bcc549&_ss=r", // ← your product link
    },
    {
      id: 2,
      name: "Hoodie",
      price: "₹599",
      image: "/images/hoodie.png",
      category: "Apparel",
      link: "https://youthiapa.com/products/oh-yeah-hoodie?_pos=1&_psq=hoodie&_ss=e&_v=1.0",
    },
    {
      id: 3,
      name: "Coffee Mug",
      price: "₹199",
      image: "/images/mug.png",
      category: "Accessories",
      link: "https://youthiapa.com/products/the-heer-ranjha-edition-6-mug",
    },
    {
      id: 4,
      name: "Sameer face mask 2.0",
      price: "₹280",
      image: "/images/mask.png",
      category: "Accessories",
      link: "https://youthiapa.com/products/sameer-face-mask-2-0",
    },
  ]

  const handleAddToCart = (productId: number) => {
    console.log(`Adding product ${productId} to cart`)
  }

  return (
    <section
      ref={containerRef}
      id="merch"
      className="py-32 bg-[#0a0a0a] relative overflow-hidden"
    >
      <motion.div
        className="absolute top-1/2 right-1/4 w-px h-16 bg-white/5"
        style={{ y }}
      />

      <div className="container mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="mb-24"
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight cursor-pointer"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: false }}
            >
              Store
            </motion.h2>
          </div>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            viewport={{ once: false }}
          >
            Carefully crafted merchandise that celebrates the community and characters we love.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <MagneticCard key={product.id} strength={0.3} range={120} className="group">
              <motion.div
                initial={{ opacity: 0, y: 80, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: [0.76, 0, 0.24, 1],
                }}
                viewport={{ once: false, margin: "-100px" }}
              >
                {/* Real Image Section */}
                <div className="relative overflow-hidden bg-white rounded-lg p-4 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <MagneticButton
                      variant="secondary"
                      onClick={() => handleAddToCart(product.id)}
                      className="px-6 py-2 text-sm tracking-wide group"
                      strength={0.3}
                      range={60}
                    >
                      <span className="relative z-30 group-hover:text-white transition-colors duration-300">
                        ADD TO CART
                      </span>
                    </MagneticButton>
                  </motion.div>
                </div>

                {/* Details */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <motion.div
                      className="text-gray-500 text-xs tracking-wide uppercase mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      viewport={{ once: false }}
                    >
                      {product.category}
                    </motion.div>
                    <motion.h3
                      className="text-white text-lg font-light tracking-tight mb-2 group-hover:text-gray-300 transition-colors duration-500 cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                      viewport={{ once: false }}
                    >
                      {product.name}
                    </motion.h3>
                    <motion.div
                      className="text-gray-400 font-light"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      viewport={{ once: false }}
                    >
                      {product.price}
                    </motion.div>
                  </div>

                  {/* Arrow Link */}
                  <Link href={product.link} target="_blank">
                    <motion.button
                      className="bg-transparent border-none p-1"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                      viewport={{ once: false }}
                      whileHover={{
                        scale: 1.3,
                        rotate: 45,
                        color: "#ffffff",
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors duration-500" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </MagneticCard>
          ))}
        </div>

        {/* View Store Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
          viewport={{ once: false }}
        >
          <Link href="https://youthiapa.com" target="_blank">
            <MagneticButton
              variant="secondary"
              className="px-8 py-3 text-sm tracking-wide group"
              strength={0.4}
              range={100}
            >
              <span className="relative z-30 group-hover:text-white transition-colors duration-300">
                VISIT STORE
              </span>
            </MagneticButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
