// const Footer = () => {
//   return (
//     <footer className="
//       mt-16
//       bg-brand-dark
//       text-gray-300
//     ">
//       <div className="
//         max-w-7xl mx-auto
//         px-6 py-10
//         grid grid-cols-1 md:grid-cols-2
//         gap-8
//       ">
//         {/* LEFT: BRAND */}
//         <div>
//           <h3 className="text-xl font-bold text-white">
//             Unbound Sports
//           </h3>

//           <p className="mt-2 text-sm max-w-md">
//             Where quality meets the value.  
//             Premium sports equipment built for performance.
//           </p>
//         </div>

//         {/* RIGHT: CONTACT */}
//         <div>
//           <h4 className="text-lg font-semibold text-white mb-3">
//             Contact Us
//           </h4>

//           <p className="text-sm">
//             📍 Unbound Sports,<br />
//             Pune, Maharashtra, India
//           </p>

//           <p className="text-sm mt-2">
//             📞 +91 7507731460
//           </p>
//         </div>
//       </div>

//       {/* BOTTOM BAR */}
//       <div className="
//         border-t border-gray-700
//         py-4
//         text-center
//         text-sm
//       ">
//         Made with <span className="text-brand-red">❤️</span> by{" "}
//         <span className="font-semibold text-white">
//           EDITH Infographics
//         </span>
//       </div>
//     </footer>
//   )
// }

// export default Footer

import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react"

const Footer = () => {
  return (
    <footer className="mt-20 bg-[#0F0F0F] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <h3 className="text-2xl font-bold text-white tracking-wide">
            <span className="text-[#FF2E2E]">UNBOUND</span> SPORTS
          </h3>

          <p className="mt-4 text-sm leading-relaxed max-w-sm">
            Where quality meets value. <br />
            Premium sports equipment crafted
            for performance and durability.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="mailto:unboundsportspune@gmail.com"
              className="p-2 rounded-full border border-gray-700 hover:border-[#FF2E2E] hover:text-[#FF2E2E] transition"
            >
              <Mail size={16} />
            </a>

            <a
              href="https://wa.me/918983337734"
              className="p-2 rounded-full border border-gray-700 hover:border-[#FF2E2E] hover:text-[#FF2E2E] transition"
            >
              <MessageCircle size={16} />
            </a>

            <a
              href="https://instagram.com/unboundsportsindia"
              className="p-2 rounded-full border border-gray-700 hover:border-[#FF2E2E] hover:text-[#FF2E2E] transition"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            Quick Links
          </h4>

          <div className="flex flex-col gap-2 text-sm">
            <a href="#" className="hover:text-[#FF2E2E] transition">
              Home
            </a>
            <a href="#" className="hover:text-[#FF2E2E] transition">
              Sports
            </a>
            <a href="#" className="hover:text-[#FF2E2E] transition">
              About
            </a>
            <a href="#" className="hover:text-[#FF2E2E] transition">
              Contact
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-4">
            Contact
          </h4>

          <div className="space-y-3 text-sm">

            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-[#FF2E2E]" />
              <span>
                Unbound Sports,<br />
                Pune, Maharashtra, India
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={16} className="text-[#FF2E2E]" />
              <span>+91 8983337734</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#FF2E2E]" />
              <span>unboundsportspune@gmail.com</span>
            </div>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Unbound Sports. All rights reserved. <br />
        Made with <span className="text-brand-red">❤️</span> by{" "}
        <span className="font-semibold text-white">
          EDITH Infographics
        </span>
      </div>
    </footer>
  )
}

export default Footer