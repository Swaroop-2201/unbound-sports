const Footer = () => {
  return (
    <footer className="
      mt-16
      bg-brand-dark
      text-gray-300
    ">
      <div className="
        max-w-7xl mx-auto
        px-6 py-10
        grid grid-cols-1 md:grid-cols-2
        gap-8
      ">
        {/* LEFT: BRAND */}
        <div>
          <h3 className="text-xl font-bold text-white">
            Unbound Sports
          </h3>

          <p className="mt-2 text-sm max-w-md">
            Where quality meets the value.  
            Premium sports equipment built for performance.
          </p>
        </div>

        {/* RIGHT: CONTACT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Contact Us
          </h4>

          <p className="text-sm">
            📍 Unbound Sports,<br />
            Pune, Maharashtra, India
          </p>

          <p className="text-sm mt-2">
            📞 +91 9XXXXXXXXX
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="
        border-t border-gray-700
        py-4
        text-center
        text-sm
      ">
        Made with <span className="text-brand-red">❤️</span> by{" "}
        <span className="font-semibold text-white">
          EDITH Infographics
        </span>
      </div>
    </footer>
  )
}

export default Footer
