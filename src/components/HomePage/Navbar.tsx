import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Instagram, MessageCircle } from "lucide-react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sportsOpen, setSportsOpen] = useState(false)

  const sportsList = [
    "Badminton",
    "Cricket",
    "Tennis",
    "Football",
    "Pickleball",
    "Table Tennis",
    "Fitness",
    "Yoga",
    "Volleyball",
    "Accessories",
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">

        {/* Logo */}
        <div className="flex flex-col leading-tight cursor-pointer">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tracking-wide text-[#FF2E2E]">
              UNBOUND
            </span>
            <span className="text-2xl font-bold tracking-wide text-gray-900">
              SPORTS
            </span>
          </div>
          <span className="mt-1 text-[11px] tracking-[2px] text-gray-500 uppercase">
            Where quality meets value
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-gray-800 text-sm font-medium">

          <a href="#" className="hover:text-[#FF2E2E] transition">
            Home
          </a>

          {/* Sports Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSportsOpen(true)}
            onMouseLeave={() => setSportsOpen(false)}
          >
            <button className="hover:text-[#FF2E2E] transition flex items-center gap-1">
              Sports
              <span className="text-xs">▾</span>
            </button>

            <AnimatePresence>
              {sportsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 mt-4 w-56 bg-white shadow-xl rounded-xl border border-gray-100 p-2"
                >
                  {sportsList.map((sport) => (
                    <a
                      key={sport}
                      href="#"
                      className="block px-4 py-2 text-sm rounded-md hover:bg-gray-50 hover:text-[#FF2E2E] transition"
                    >
                      {sport}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#" className="hover:text-[#FF2E2E] transition">
            About
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-4 ml-2">

            <a
              href="mailto:unboundsportspune@gmail.com"
              className="text-[#FF2E2E] hover:text-[#FF2E2E] transition"
            >
              <Mail size={18} />
            </a>

            <a
              href="https://wa.me/918983337734"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF2E2E] hover:text-[#FF2E2E] transition"
            >
              <MessageCircle size={18} />
            </a>

            <a
              href="https://instagram.com/unboundsportsindia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF2E2E] hover:text-[#FF2E2E] transition"
            >
              <Instagram size={18} />
            </a>

          </div>

          {/* Contact CTA */}
          {/* <a
            href="#contact"
            className="
              ml-4 px-5 py-2.5 rounded-full
              text-sm font-semibold
              bg-[#FF2E2E] text-white
              hover:bg-red-600
              transition
              shadow-md hover:shadow-lg
            "
          >
            Contact
          </a> */}

        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-6 space-y-5"
          >
            <a href="#" className="block font-medium text-gray-800">
              Home
            </a>

            {/* Sports */}
            <div>
              <button
                onClick={() => setSportsOpen(!sportsOpen)}
                className="w-full text-left font-medium text-gray-800"
              >
                Sports
              </button>

              {sportsOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {sportsList.map((sport) => (
                    <a
                      key={sport}
                      href="#"
                      className="block text-sm text-gray-600"
                    >
                      {sport}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a href="#" className="block font-medium text-gray-800">
              About
            </a>

            {/* Social Icons */}
            <div className="flex gap-6 pt-2">
              <a
                href="mailto:unboundsportspune@gmail.com"
                className="text-[#FF2E2E] hover:opacity-80 transition"
              >
                <Mail size={20} />
              </a>

              <a
                href="https://wa.me/918983337734"
                className="text-[#FF2E2E] hover:opacity-80 transition"
              >
                <MessageCircle size={20} />
              </a>

              <a
                href="https://instagram.com/unboundsportsindia"
                className="text-[#FF2E2E] hover:opacity-80 transition"
              >
                <Instagram size={20} />
              </a>
            </div>

            {/* CTA */}
            {/* <a
              href="#contact"
              className="
                block text-center mt-4 px-4 py-3 rounded-full
                bg-[#FF2E2E] text-white font-semibold
                shadow-md
              "
            >
              Contact
            </a> */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar