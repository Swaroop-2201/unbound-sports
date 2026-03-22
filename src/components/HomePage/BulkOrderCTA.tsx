import { MessageCircle } from "lucide-react"

const BulkOrderCTA = () => {
  return (
    <section className="mt-24 md:mt-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12">

        <div className="
          relative
          bg-white
          border border-gray-100
          rounded-3xl
          shadow-sm
          px-6 md:px-10
          py-10 md:py-12
          text-center
        ">

          {/* Subtle Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-[#FF2E2E]"></div>

          {/* Tag */}
          <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-3">
            For Coaches & Academies
          </p>

          {/* Heading */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-snug">
            Need Equipment in Bulk?
          </h2>

          {/* Subtext */}
          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Get special pricing, exclusive discounts, and a seamless ordering experience 
            tailored for academies, coaches, and teams.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <a
              href="https://wa.me/918983337734"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-full
                bg-[#FF2E2E] text-white
                text-sm font-semibold
                shadow-md hover:shadow-lg
                transition duration-300
              "
            >
              <MessageCircle size={18} />
              Contact on WhatsApp
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BulkOrderCTA