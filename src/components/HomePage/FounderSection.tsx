import { MessageCircle } from "lucide-react"
import owner from "../../assets/owner/nihar.jpeg" 

const FounderSection = () => {
  return (
    <section className="mt-24 md:mt-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12">

        <div className="
          grid md:grid-cols-2 gap-10 items-center
          bg-white border border-gray-100
          rounded-3xl shadow-sm
          p-6 md:p-10
        ">

          {/* IMAGE */}
          <div className="flex justify-center md:justify-start">
            <img
              src={owner}
              alt="Nihar Pradhan"
              className="
                w-64 h-64 object-cover
                rounded-2xl
                shadow-md
              "
            />
          </div>

          {/* CONTENT */}
          <div>

            {/* Tag */}
            <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-3">
              Meet the Founder
            </p>

            {/* Name */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Nihar Pradhan
            </h2>

            {/* Description */}
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
              I am Nihar Pradhan, the owner of Unbound Sports and a badminton coach with over 10+ years of experience. I run a badminton academy in NIBM, working with players across all levels — from district to international — across various age categories.
            </p>

            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
              Whether you're looking for quality equipment or professional coaching guidance, feel free to connect for bulk orders, academy needs, or training enquiries.
            </p>

            {/* CTA */}
            <div className="mt-6">
              <a
                href="https://wa.me/918983337734"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-5 py-2.5 rounded-full
                  bg-[#FF2E2E] text-white
                  text-sm font-semibold
                  shadow-md hover:shadow-lg
                  transition
                "
              >
                <MessageCircle size={18} />
                Contact for Coaching
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default FounderSection