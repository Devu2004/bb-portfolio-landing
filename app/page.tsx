"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import OriginalLoader from "@/components/OriginalLoader"
import SmoothScroll from "@/components/SmoothScroll"
import Navbar from "@/components/Navbar"
import DarkHero from "@/components/DarkHero"
import About from "@/components/About"
import Merch from "@/components/Merch"
import Videos from "@/components/Videos"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import CrystalCursor from "@/components/CrystalCursor"

export default function DarkPortfolio() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 200)
  }

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <OriginalLoader onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {showContent && (
        <SmoothScroll>
          <CrystalCursor />
          <Navbar />
          <main>
            <DarkHero />
            <About />
            <Videos />
            <Merch />
            <Contact />
            <Footer />
          </main>
        </SmoothScroll>
      )}
    </div>
  )
}
