import { SITE_CONFIG } from "../../config/site.config"

const MapCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
      <iframe
        title="Unbound Sports Location"
        src={SITE_CONFIG.maps.embed}
        className="w-full h-60 sm:h-64 border-0"
        loading="lazy"
      />

      <div className="p-4">
        <h3 className="font-semibold text-brand-dark">
          📍 Unbound Sports
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          {SITE_CONFIG.city}
        </p>

        <a
          href={SITE_CONFIG.maps.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block mt-4
            bg-brand-red text-white
            px-4 py-2 rounded-md
            text-sm font-medium
            hover:opacity-90 transition
          "
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}

export default MapCard
