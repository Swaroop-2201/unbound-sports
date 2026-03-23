import Footer from "../components/HomePage/Footer"
import ReviewCard, {reviews} from "../components/HomePage/ReviewCard"
import Map from "../components/HomePage/MapCard"
import PromoSlider, {promoSlides} from "../components/HomePage/FeaturedProducts"
import Hero from "../components/HomePage/Hero"
import ShopPreview from "../components/HomePage/ShopPreview"
import BulkOrderCTA from "../components/HomePage/BulkOrderCTA"
import FounderSection from "../components/HomePage/FounderSection"

const Home = () => {

  return (
    <main className="bg-brand-light">
      {/* HERO */}
      <Hero />

      {/* PROMOS */}
      <section
        id="products"
        className="mt-24 md:mt-32 max-w-7xl mx-auto px-5 sm:px-6 md:px-12"
      >
        <PromoSlider slides={promoSlides} />
      </section>

      {/* SHOP PREVIEW */}
      <ShopPreview />

      {/* BULK ORDER CTA */}
      <BulkOrderCTA />

      {/* FOUNDER STORY */}
      <FounderSection />

      {/* MAP */}
      <section className="mt-24 md:mt-32 bg-gray-50 py-16 rounded-3xl">
        <div className="px-5 sm:px-6 md:px-12 max-w-7xl mx-auto">
          <Map />
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mt-20 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <h2 className="text-2xl font-bold text-center text-brand-dark mb-8">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
