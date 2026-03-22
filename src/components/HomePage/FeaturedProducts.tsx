import { useEffect, useState } from "react"

import yonex from "../../assets/Promos/YonexRacket.jpg"
import bg65 from "../../assets/Promos/BG65.jpg"
import mavis from "../../assets/Promos/Mavis350.jpg"

interface Slide {
  image: string
  title: string
  subtitle: string
}

interface PromoSliderProps {
  slides: Slide[]
}

const AUTO_SLIDE_MS = 3000

export const promoSlides = [
    {
      image: yonex,
      title: "Minimum 30% OFF",
      subtitle: "On all Yonex Rackets",
    },
    {
      image: bg65,
      title: "Flat ₹500 OFF",
      subtitle: "Yonex BG65 Strings",
    },
    {
      image: mavis,
      title: "Flat ₹1000 OFF",
      subtitle: "Yonex Mavis 350 Shuttle",
    },
  ]

const PromoSlider = ({ slides }: PromoSliderProps) => {
  const [current, setCurrent] = useState(0)

  const total = slides.length

  // Auto slide
  useEffect(() => {
    if (total <= 1) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total)
    }, AUTO_SLIDE_MS)

    return () => clearInterval(interval)
  }, [total])

  return (
    <section className="mt-24 max-w-7xl mx-auto px-6 md:px-12">

      {/* Heading */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-2">
          Featured
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Top Brands & Products
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Carefully selected equipment trusted by players and academies.
        </p>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">

        <div className="flex items-center justify-center gap-6 transition-all duration-700">

          {slides.map((slide, index) => {
            const isActive = index === current

            return (
              <div
                key={index}
                className={`
                  relative transition-all duration-700
                  ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"}
                `}
                style={{ width: "260px", height: "360px" }}
              >
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl h-full flex flex-col items-center justify-between p-4">

                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-[200px] object-contain"
                  />

                  {/* Text */}
                  <div className="text-center mt-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {slide.title}
                    </h3>

                    <p className="text-xs text-[#FF2E2E] font-medium mt-1">
                      {slide.subtitle}
                    </p>
                  </div>

                </div>
              </div>
            )
          })}

        </div>

      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === current
                ? "bg-[#FF2E2E] w-5"
                : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>

    </section>
  )
}

export default PromoSlider