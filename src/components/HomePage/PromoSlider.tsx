import { useEffect, useState } from "react"

interface Slide {
  image: string
  title: string
  subtitle: string
}

interface PromoSliderProps {
  slides: Slide[]
}

const SLIDE_WIDTH = 260 // width of one vertical image card
const SLIDES_VISIBLE = 2

const PromoSlider = ({ slides }: PromoSliderProps) => {
  const [current, setCurrent] = useState(0)

  // Duplicate slides for seamless loop
  const extendedSlides = [...slides, ...slides]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev + 1 >= slides.length ? 0 : prev + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div
      className="overflow-hidden rounded-xl shadow-lg"
      style={{
        width: SLIDE_WIDTH * SLIDES_VISIBLE,
      }}
    >
      {/* SLIDE TRACK */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * SLIDE_WIDTH}px)`,
        }}
      >
        {extendedSlides.map((slide, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 bg-white"
            style={{ width: SLIDE_WIDTH, height: 360 }}
          >
            {/* IMAGE */}
            <img
              src={slide.image}
              alt={slide.title}
              className="
                h-full
                w-full
                object-contain
                p-4
              "
            />

            {/* TEXT OVERLAY */}
            <div
            className="
                absolute bottom-0 left-0 right-0
                bg-black/30
                px-4 py-3
                text-center
            "
            >
            <h3 className="text-white text-sm font-bold">
                {slide.title}
            </h3>

            <p className="text-brand-red text-xs font-semibold mt-1">
                {slide.subtitle}
            </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default PromoSlider
