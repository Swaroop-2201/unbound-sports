import { MessageCircle } from "lucide-react"

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">

    {/* Background Accents */}
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF2E2E]/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FF2E2E]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>

          {/* Tag */}
          <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-4">
            Premium Sports Equipment
          </p>

          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Gear Up with <br />
            <span className="text-[#FF2E2E]">Unbound Sports</span>
          </h1>

          {/* Subtext */}
          <p className="mt-5 text-gray-600 text-sm md:text-base max-w-md">
            High-quality sports equipment trusted by players and academies.
            Get the best value with seamless service and bulk order benefits.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-8">

            <a
              href="https://wa.me/918983337734"
              className="
                flex items-center gap-2
                px-6 py-3 rounded-full
                bg-[#FF2E2E] text-white
                text-sm font-semibold
                shadow-md hover:shadow-lg
                transition
              "
            >
              <MessageCircle size={18} />
              Contact Us
            </a>

            <a
              href="#products"
              className="
                text-sm font-medium text-gray-800
                hover:text-[#FF2E2E]
                transition
              "
            >
              Explore Products →
            </a>

          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-10 text-sm text-gray-500">

            <div>
              <p className="font-semibold text-gray-900">100+</p>
              <p className="text-xs">Players & Academies</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Fast</p>
              <p className="text-xs">Delivery</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Bulk</p>
              <p className="text-xs">Discounts</p>
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">

          {/* Main Image */}
          <img
            src="src\assets\hero\pickleball.jpg" 
            alt="Sports Equipment"
            className="w-[85%] md:w-full object-contain"
          />

          {/* Floating Card (Premium Touch) */}
          <div className="absolute bottom-6 left-6 bg-white shadow-xl rounded-xl px-4 py-3 text-sm">
            <p className="font-semibold text-gray-900">Top Quality</p>
            <p className="text-xs text-gray-500">
              Trusted by professionals
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Hero