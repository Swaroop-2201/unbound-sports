// import { useEffect, useState } from "react"

// import yonex from "../../assets/Promos/YonexRacket.jpg"
// import bg65 from "../../assets/Promos/BG65.jpg"
// import mavis from "../../assets/Promos/Mavis350.jpg"
// import transformHybridShuttles from "../../assets/Promos/transform-hybrid-shuttles.webp"

// interface Slide {
//   image: string
//   title: string
//   subtitle: string
// }

// interface PromoSliderProps {
//   slides: Slide[]
// }

// const AUTO_SLIDE_MS = 3000

// export const promoSlides = [
//     {
//       image: yonex,
//       title: "Flat 3000₹",
//       subtitle: "Play Series",
//     },
//     {
//       image: bg65,
//       title: "Flat 469₹",
//       subtitle: "Yonex BG65 Strings",
//     },
//     {
//       image: mavis,
//       title: "Flat 969₹",
//       subtitle: "Yonex Mavis 350 Shuttle",
//     },
//     {
//       image: transformHybridShuttles,
//       title: "Flat 1849₹",
//       subtitle: "Transform Hybrid Shuttles",
//     },
//   ]

// const PromoSlider = ({ slides }: PromoSliderProps) => {
//   const [current, setCurrent] = useState(0)

//   const total = slides.length

//   // Auto slide
//   useEffect(() => {
//     if (total <= 1) return

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % total)
//     }, AUTO_SLIDE_MS)

//     return () => clearInterval(interval)
//   }, [total])

//   return (
//     <section className="mt-24 max-w-7xl mx-auto px-6 md:px-12">

//       {/* Heading */}
//       <div className="text-center mb-12">
//         <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-2">
//           Featured
//         </p>
//         <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
//           Top Brands & Products
//         </h2>
//         <p className="text-sm text-gray-500 mt-2">
//           Carefully selected equipment trusted by players and academies.
//         </p>
//       </div>

//       {/* Slider */}
//       <div className="relative overflow-hidden">

//         <div className="flex items-center justify-center gap-6 transition-all duration-700">

//           {slides.map((slide, index) => {
//             const isActive = index === current

//             return (
//               <div
//                 key={index}
//                 className={`
//                   relative transition-all duration-700
//                   ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-50"}
//                 `}
//                 style={{ width: "260px", height: "360px" }}
//               >
//                 {/* Card */}
//                 <div className="bg-white rounded-2xl shadow-md hover:shadow-xl h-full flex flex-col items-center justify-between p-4">

//                   {/* Image */}
//                   <img
//                     src={slide.image}
//                     alt={slide.title}
//                     className="h-[200px] object-contain"
//                   />

//                   {/* Text */}
//                   <div className="text-center mt-4">
//                     <h3 className="text-sm font-semibold text-gray-900">
//                       {slide.title}
//                     </h3>

//                     <p className="text-xs text-[#FF2E2E] font-medium mt-1">
//                       {slide.subtitle}
//                     </p>
//                   </div>

//                 </div>
//               </div>
//             )
//           })}

//         </div>

//       </div>

//       {/* Dots Indicator */}
//       <div className="flex justify-center mt-6 gap-2">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`h-2 w-2 rounded-full transition-all ${
//               index === current
//                 ? "bg-[#FF2E2E] w-5"
//                 : "bg-gray-300"
//             }`}
//           ></div>
//         ))}
//       </div>

//     </section>
//   )
// }

// export default PromoSlider

import { useEffect, useRef } from "react"

import yonex from "../../assets/Promos/YonexRacket.jpg"
import bg65 from "../../assets/Promos/BG65.jpg"
import mavis from "../../assets/Promos/Mavis350.jpg"
import transformHybridShuttles from "../../assets/Promos/transform-hybrid-shuttles.webp"
import grips from "../../assets/Promos/grips.jpg"
import shoes from "../../assets/Promos/shoes.jpg"
import victor from "../../assets/Promos/victor.jpg"

interface Slide {
  image: string
  price: string
  original: string
  subtitle: string
}

interface PromoSliderProps {
  slides: Slide[]
}

const AUTO_SCROLL_MS = 3000

export const promoSlides: Slide[] = [
  {
    image: yonex,
    price: "₹3000",
    original: "₹4500",
    subtitle: "Yonex Play Series",
  },
  {
    image: bg65,
    price: "₹469",
    original: "₹700",
    subtitle: "Yonex BG65 Strings",
  },
  {
    image: mavis,
    price: "₹969",
    original: "₹1400",
    subtitle: "Yonex Mavis 350 Shuttle",
  },
  {
    image: transformHybridShuttles,
    price: "₹1849",
    original: "₹2500",
    subtitle: "Transform Hybrid Shuttles",
  },
  {
    image: grips,
    price: "Starting ₹79",
    original: "₹100",
    subtitle: "All kinds of Grips",
  },
  {
    image: shoes,
    price: "Flat 20% Off",
    original: "",
    subtitle: "On all brands",
  },
  {
    image: victor,
    price: "Flat 25% Off",
    original: "",
    subtitle: "On all equipments",
  },
]

const PromoSlider = ({ slides }: PromoSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto scroll logic
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scroll = () => {
      if (!container) return

      const scrollAmount = 280 // card width + gap

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        // loop back
        container.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }

    const interval = setInterval(scroll, AUTO_SCROLL_MS)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="mt-24 max-w-7xl mx-auto px-6 md:px-12">

      {/* Heading */}
      <div className="text-center mb-10">
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

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="
          flex gap-5 overflow-x-auto scroll-smooth
          snap-x snap-mandatory
          pb-2
        "
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="
              min-w-[260px] max-w-[260px]
              snap-center flex-shrink-0
            "
          >
            {/* Card */}
            <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl h-[360px] flex flex-col items-center justify-between p-4 relative">

              {/* DEAL BADGE */}
              <div className="absolute top-3 right-3 text-[10px] font-semibold bg-[#FF2E2E] text-white px-2 py-1 rounded-full">
                DEAL
              </div>

              {/* Image */}
              <img
                src={slide.image}
                alt={slide.subtitle}
                className="h-[200px] object-contain transition-transform duration-500 group-hover:scale-105"
              />

              {/* Text */}
              <div className="text-center mt-4">

                {/* Price */}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-[#FF2E2E]">
                    {slide.price}
                  </span>

                  <span className="text-xs text-gray-400 line-through">
                    {slide.original}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-gray-600 mt-1">
                  {slide.subtitle}
                </p>

                <p className="text-[10px] text-green-600 font-medium mt-1">
                  Limited Time Offer
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default PromoSlider