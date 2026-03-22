// import { SITE_CONFIG } from "../../config/site.config"

// const MapCard = () => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
//       <iframe
//         title="Unbound Sports Location"
//         src={SITE_CONFIG.maps.embed}
//         className="w-full h-60 sm:h-64 border-0"
//         loading="lazy"
//       />

//       <div className="p-4">
//         <h3 className="font-semibold text-brand-dark">
//           📍 Unbound Sports
//         </h3>

//         <p className="text-sm text-gray-600 mt-1">
//           {SITE_CONFIG.city}
//         </p>

//         <a
//           href={SITE_CONFIG.maps.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="
//             inline-block mt-4
//             bg-brand-red text-white
//             px-4 py-2 rounded-md
//             text-sm font-medium
//             hover:opacity-90 transition
//           "
//         >
//           Open in Google Maps
//         </a>
//       </div>
//     </div>
//   )
// }

// export default MapCard

import { SITE_CONFIG } from "../../config/site.config"

const MapCard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-3xl mx-auto">
      {/* Map iframe */}
      <div className="relative w-full h-64 sm:h-80">
        <iframe
          title="Unbound Sports Location"
          src={SITE_CONFIG.maps.embed}
          className="absolute inset-0 w-full h-full rounded-t-3xl border-0"
          loading="lazy"
        />
      </div>

      {/* Info section */}
      <div className="p-6 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          📍 Unbound Sports
        </h3>

        <p className="text-gray-500 mt-2 text-sm sm:text-base">
          {SITE_CONFIG.city}
        </p>

        <a
          href={SITE_CONFIG.maps.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-6
            inline-block
            bg-gradient-to-r from-[#FF2E2E] to-[#FF5E5E]
            text-white
            px-6 py-3
            rounded-full
            font-semibold
            shadow-lg
            hover:scale-105 hover:shadow-xl
            transition-transform duration-300
          "
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}

export default MapCard