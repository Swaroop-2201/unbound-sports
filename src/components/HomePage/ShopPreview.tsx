import shop1 from "../../assets/ShopImages/shop1.png"
import shop2 from "../../assets/ShopImages/shop2.png"
import shop3 from "../../assets/ShopImages/shop3.png"
import shop4 from "../../assets/ShopImages/shop4.png"

const ShopPreview = () => {
  return (
    <section className="mt-24 md:mt-32 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">

      {/* Heading (premium touch) */}
      <div className="text-center mb-10">
        <p className="text-xs tracking-widest text-[#FF2E2E] uppercase mb-2">
          Our Store
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          Experience Unbound Sports
        </h2>
      </div>

      {/* Images */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[shop1, shop2, shop3, shop4].map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={img}
              alt="Unbound Sports store"
              className="
                h-28 sm:h-32
                w-full
                object-cover
                shadow-md
                transition duration-300
                hover:scale-105
              "
            />
          </div>
        ))}
      </div>

    </section>
  )
}

export default ShopPreview