import shop1 from "../assets/shop1.png"
import shop2 from "../assets/shop2.png"
import shop3 from "../assets/shop3.png"
import shop4 from "../assets/shop4.png"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <section className="
      bg-brand-light
      min-h-[calc(100vh-72px)]
      flex flex-col
      pt-24 md:pt-28
    ">
      {/* MAIN CONTENT */}
      <div className="
        max-w-7xl mx-auto
        px-5 sm:px-6 md:px-12
        grid grid-cols-1 lg:grid-cols-2
        gap-12
      ">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="
            text-4xl sm:text-5xl md:text-6xl
            font-extrabold
            text-brand-dark
            leading-tight
          ">
            <span className="text-brand-red">Unbound</span> Sports
          </h1>

          <p className="
            mt-6
            text-base sm:text-lg md:text-xl
            text-gray-600
            max-w-xl
          ">
            Where <span className="text-brand-red font-semibold">quality</span>{" "}
            meets the <span className="text-brand-red font-semibold">value</span>.
            <br />
            Premium sports equipment built for performance.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="
              bg-brand-red
              text-white
              px-8 py-3
              rounded-lg
              font-semibold
              hover:opacity-90
              transition
            ">
              Explore Products
            </button>

            <button className="
              border-2 border-brand-red
              text-brand-red
              px-8 py-3
              rounded-lg
              font-semibold
              hover:bg-brand-red hover:text-white
              transition
            ">
              View Categories
            </button>
          </div>

          {/* SHOP IMAGES */}
          <div className="
            mt-10
            grid grid-cols-2 sm:grid-cols-4
            gap-4
            max-w-xl
          ">
            {[shop1, shop2, shop3, shop4].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Unbound Sports Shop"
                className="
                  h-28 sm:h-32
                  w-full
                  object-cover
                  rounded-lg
                  shadow-md
                  hover:scale-105
                  transition
                "
              />
            ))}
          </div>

          {/* STORE LOCATION */}
          <div className="mt-12 max-w-xl">
            <div className="
              bg-white
              rounded-xl
              shadow-lg
              overflow-hidden
              border
            ">
              <iframe
                title="Unbound Sports Location"
                src="https://www.google.com/maps?q=Unbound+Sports+Pune&output=embed"
                className="w-full h-60 sm:h-64 border-0"
                loading="lazy"
              />

              <div className="p-4">
                <h3 className="font-semibold text-brand-dark">
                  📍 Unbound Sports
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Pune, Maharashtra, India
                </p>

                <a
                  href="https://maps.app.goo.gl/bcLYTKoYcFPjjB6h6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-block
                    mt-4
                    bg-brand-red
                    text-white
                    px-4 py-2
                    rounded-md
                    text-sm
                    font-medium
                    hover:opacity-90
                    transition
                  "
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (future hero image / banner) */}
        <div className="hidden lg:flex items-center justify-center">
          {/* Future banner / athlete image */}
        </div>
      </div>

      {/* CLIENT REVIEWS */}
        <div className="mt-16 bg-brand-light">
        <div className="
            max-w-7xl mx-auto
            px-5 sm:px-6 md:px-12
        ">
            <h3 className="
            text-2xl
            font-bold
            text-brand-dark
            mb-8
            text-center
            ">
            What Our Customers Say
            </h3>

            <div className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            ">
            {[
                {
                name: "Amit Kulkarni",
                review: "Excellent quality products. Best sports shop in the area!",
                rating: 5,
                },
                {
                name: "Sneha Patil",
                review: "Great variety and very helpful staff. Highly recommended.",
                rating: 4,
                },
                {
                name: "Rahul Deshmukh",
                review: "Value for money and genuine sports equipment.",
                rating: 5,
                },
            ].map((review, index) => (
                <div
                key={index}
                className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow-md
                    border
                    hover:shadow-lg
                    transition
                "
                >
                <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-brand-dark">
                    {review.name}
                    </h4>

                    <div className="text-brand-red text-sm">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-3">
                    “{review.review}”
                </p>
                </div>
            ))}
            </div>
        </div>
        </div>

        {/* FOOTER */}
        <Footer />

    </section>
  )
}

export default Home
