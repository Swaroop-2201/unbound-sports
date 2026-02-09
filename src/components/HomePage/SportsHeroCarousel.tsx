import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import badmintonImg from "../../assets/hero/badminton.jpg"
import tennisImg from "../../assets/hero/tennis.jpg"
import pickleballImg from "../../assets/hero/pickleball.jpg"

const heroes = [
  {
    id: "badminton",
    title: "Badminton Excellence",
    subtitle: "Speed • Precision • Control",
    description:
      "Professional rackets, strings & shuttles trusted by competitive players.",
    image: badmintonImg,
  },
  {
    id: "tennis",
    title: "Tennis Power Play",
    subtitle: "Strength • Spin • Accuracy",
    description:
      "High-performance tennis gear designed for power hitters and baseliners.",
    image: tennisImg,
  },
  {
    id: "pickleball",
    title: "Pickleball Revolution",
    subtitle: "Agility • Touch • Fun",
    description:
      "Lightweight paddles and accessories built for fast-growing pickleball pros.",
    image: pickleballImg,
  },
]

const AUTO_SLIDE_MS = 5000

export default function SportsHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  // ✅ PRELOAD IMAGES ONCE
  useEffect(() => {
    heroes.forEach((hero) => {
      const img = new Image()
      img.src = hero.image
    })
  }, [])

  // ✅ AUTO SLIDE
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroes.length)
    }, AUTO_SLIDE_MS)

    return () => clearInterval(timer)
  }, [])

  const activeHero = heroes[activeIndex]

  return (
    <section
      aria-label="Sports equipment categories"
      className="
        relative overflow-hidden rounded-2xl
        min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]
        bg-black
      "
    >
      {/* ✅ BACKGROUND IMAGE — INSTANT */}
      <motion.img
        key={activeHero.id}
        src={activeHero.image}
        alt={`${activeHero.title} sports equipment`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0 }}
      />

      {/* ✅ TEXT CARD (TOP-LEFT ONLY) */}
      <div className="relative z-10 h-full flex items-start pt-14 sm:pt-20">
        <div className="ml-6 sm:ml-10 lg:ml-14 max-w-2xl rounded-2xl bg-black/50 backdrop-blur-md px-6 py-6 sm:px-8 sm:py-8 shadow-2xl">
          <motion.h1
            key={activeHero.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white"
          >
            {activeHero.title}
          </motion.h1>

          <motion.p
            key={activeHero.subtitle}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-brand-red uppercase tracking-widest text-sm font-semibold"
          >
            {activeHero.subtitle}
          </motion.p>

          <p className="mt-4 text-gray-200 text-sm sm:text-base max-w-md">
            {activeHero.description}
          </p>

          <div className="mt-6 flex gap-4">
            <button className="bg-brand-red text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Shop Now
            </button>
            <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
              View Gear
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
