import { MessageCircle } from "lucide-react"
import owner from "../../assets/owner/nihar.jpeg"

const FounderSection = () => {
  return (
    <section className="mt-24 md:mt-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">

        <div className="
          bg-white border border-gray-100
          rounded-3xl shadow-sm
          p-6 md:p-10
        ">

          {/* IMAGE */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={owner}
                alt="Nihar Pradhan"
                className="
                  w-40 h-40 md:w-48 md:h-48
                  object-cover
                  rounded-2xl
                  shadow-md
                "
              />

              {/* Subtle Accent */}
              <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-[#FF2E2E]/10 rounded-xl"></div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-6">

            {/* Tag */}
            <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-2">
              Meet the Founder
            </p>

            {/* Name */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
              Nihar Pradhan
            </h2>

            {/* Subtitle */}
            <p className="text-xs text-gray-400 mt-1">
              Head Coach • Academy Owner
            </p>

            {/* Divider */}
            <div className="h-[2px] w-10 bg-[#FF2E2E] mx-auto mt-3"></div>

            {/* Description */}
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
              I am Nihar Pradhan, owner of Unbound Sports and a badminton coach with over 15+ years of playing experience and 10+ years in coaching. I have trained 300+ students across all levels, from beginners to competitive players.
            </p>

            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
              I lead a high-performance team of 8+ coaches and hold professional certifications including PPSM, BWF Level 1, and NIS Sports Science & Coaching.
            </p>

            {/* STATS */}
            <div className="flex justify-center flex-wrap gap-6 mt-6 text-sm">

              <div className="text-center">
                <p className="font-semibold text-gray-900">15+ Years</p>
                <p className="text-xs text-gray-500">Playing Experience</p>
              </div>

              <div className="text-center">
                <p className="font-semibold text-gray-900">300+</p>
                <p className="text-xs text-gray-500">Students Trained</p>
              </div>

              <div className="text-center">
                <p className="font-semibold text-gray-900">8+ Coaches</p>
                <p className="text-xs text-gray-500">High Performance Team</p>
              </div>

            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-center">
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