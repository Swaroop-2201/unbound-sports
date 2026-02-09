// import badmintonHero from "../assets/Background/badminton.jpg"
// import tennisHero from "../assets/Background/tennis.jpg"
// import pickleballHero from "../assets/Background/pickleball.jpg"
// import shop1 from "../assets/ShopImages/shop1.png"
// import shop2 from "../assets/ShopImages/shop2.png"
// import shop3 from "../assets/ShopImages/shop3.png"
// import shop4 from "../assets/ShopImages/shop4.png"
// import yonex from "../assets/Promos/YonexRacket.jpg"
// import bg65 from "../assets/Promos/BG65.jpg"
// import mavis from "../assets/Promos/Mavis350.jpg"


// import Footer from "../components/HomePage/Footer"
// import ReviewCard from "../components/HomePage/ReviewCard"
// import Map from "../components/HomePage/MapCard"
// import PromoSlider from "../components/HomePage/PromoSlider"

// const Home = () => {
//   const heroSports = [
//     {
//       sport: "Badminton",
//       tagline: "Speed. Control. Precision.",
//       description:
//         "Professional badminton equipment trusted by competitive players and academies.",
//       image: badmintonHero,
//       cta: "Shop Badminton",
//     },
//     {
//       sport: "Tennis",
//       tagline: "Power meets consistency.",
//       description:
//         "Grand Slam inspired tennis gear built for performance and durability.",
//       image: tennisHero,
//       cta: "Shop Tennis",
//     },
//     {
//       sport: "Pickleball",
//       tagline: "Fast. Fun. Competitive.",
//       description:
//         "Premium pickleball paddles and accessories for all skill levels.",
//       image: pickleballHero,
//       cta: "Shop Pickleball",
//     },
//   ]

//   const promoSlides = [
//     {
//       image: yonex,
//       title: "Minimum 30% OFF",
//       subtitle: "On all Yonex Rackets",
//     },
//     {
//       image: bg65,
//       title: "Flat ₹500 OFF",
//       subtitle: "Yonex BG65 Strings",
//     },
//     {
//       image: mavis,
//       title: "Flat ₹1000 OFF",
//       subtitle: "Yonex Mavis 350 Shuttle",
//     },
//   ]

//   const reviews = [
//     {
//       name: "Amit Kulkarni",
//       review: "Excellent quality products. Best sports shop in the area!",
//       rating: 5,
//     },
//     {
//       name: "Sneha Patil",
//       review: "Great variety and very helpful staff. Highly recommended.",
//       rating: 4,
//     },
//     {
//       name: "Rahul Deshmukh",
//       review: "Value for money and genuine sports equipment.",
//       rating: 5,
//     },
//   ]

//   return (
//     <section
//       className="
//         bg-brand-light
//         min-h-[calc(100vh-72px)]
//         flex flex-col
//         pt-24 md:pt-28
//       "
//     >
//       {/* ================= MAIN CONTENT ================= */}
//       <div
//         className="
//           max-w-7xl mx-auto
//           px-5 sm:px-6 md:px-12
//           grid grid-cols-1 lg:grid-cols-2
//           gap-12
//         "
//       >
//         {/* ================= LEFT CONTENT ================= */}
//         <div>
//           {/* BRAND TITLE */}
//           <h1
//             className="
//               text-4xl sm:text-5xl md:text-6xl
//               font-extrabold
//               text-brand-dark
//               leading-tight
//             "
//           >
//             <span className="text-brand-red">Unbound</span> Sports
//           </h1>

//           {/* TAGLINE */}
//           <p
//             className="
//               mt-6
//               text-base sm:text-lg md:text-xl
//               text-gray-600
//               max-w-xl
//             "
//           >
//             Where{" "}
//             <span className="text-brand-red font-semibold">quality</span>{" "}
//             meets the{" "}
//             <span className="text-brand-red font-semibold">value</span>.
//             <br />
//             Premium sports equipment built for performance.
//           </p>

//           {/* PROMO SLIDER */}
//           <div className="mt-8">
//             <PromoSlider slides={promoSlides} />
//           </div>

//           {/* CTA BUTTONS */}
//           <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
//             <button
//               className="
//                 bg-brand-red
//                 text-white
//                 px-8 py-3
//                 rounded-lg
//                 font-semibold
//                 hover:opacity-90
//                 transition
//               "
//             >
//               Explore Products
//             </button>

//             <button
//               className="
//                 border-2 border-brand-red
//                 text-brand-red
//                 px-8 py-3
//                 rounded-lg
//                 font-semibold
//                 hover:bg-brand-red hover:text-white
//                 transition
//               "
//             >
//               View Categories
//             </button>
//           </div>

//           {/* ================= SHOP IMAGES ================= */}
//           <div
//             className="
//               mt-10
//               grid grid-cols-2 sm:grid-cols-4
//               gap-4
//               max-w-xl
//             "
//           >
//             {[shop1, shop2, shop3, shop4].map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt="Unbound Sports Shop"
//                 className="
//                   h-28 sm:h-32
//                   w-full
//                   object-cover
//                   rounded-lg
//                   shadow-md
//                   hover:scale-105
//                   transition
//                 "
//               />
//             ))}
//           </div>

//           {/* ================= STORE LOCATION ================= */}
//           <div className="mt-12 max-w-xl">
//             <Map />
//           </div>
//         </div>

//         {/* ================= RIGHT SIDE ================= */}
//         <div className="hidden lg:flex items-center justify-center">
//           {/* Future hero banner / athlete image */}
//         </div>
//       </div>

//       {/* ================= CLIENT REVIEWS ================= */}
//       <div className="mt-16 bg-brand-light">
//         <div
//           className="
//             max-w-7xl mx-auto
//             px-5 sm:px-6 md:px-12
//           "
//         >
//           <h3
//             className="
//               text-2xl
//               font-bold
//               text-brand-dark
//               mb-8
//               text-center
//             "
//           >
//             What Our Customers Say
//           </h3>

//           <div
//             className="
//               grid grid-cols-1
//               sm:grid-cols-2
//               lg:grid-cols-3
//               gap-6
//             "
//           >
//             {reviews.map((review, index) => (
//               <ReviewCard
//                 key={index}
//                 name={review.name}
//                 review={review.review}
//                 rating={review.rating}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ================= FOOTER ================= */}
//       <Footer />
//     </section>
//   )
// }

// export default Home

import shop1 from "../assets/ShopImages/shop1.png"
import shop2 from "../assets/ShopImages/shop2.png"
import shop3 from "../assets/ShopImages/shop3.png"
import shop4 from "../assets/ShopImages/shop4.png"

import Footer from "../components/HomePage/Footer"
import ReviewCard from "../components/HomePage/ReviewCard"
import Map from "../components/HomePage/MapCard"
import PromoSlider from "../components/HomePage/PromoSlider"
import SportsHeroCarousel from "../components/HomePage/SportsHeroCarousel"

import yonex from "../assets/Promos/YonexRacket.jpg"
import bg65 from "../assets/Promos/BG65.jpg"
import mavis from "../assets/Promos/Mavis350.jpg"

const Home = () => {
  const promoSlides = [
    {
      image: yonex,
      title: "Minimum 30% OFF",
      subtitle: "On all Yonex Rackets",
    },
    {
      image: bg65,
      title: "Flat ₹500 OFF",
      subtitle: "Yonex BG65 Strings",
    },
    {
      image: mavis,
      title: "Flat ₹1000 OFF",
      subtitle: "Yonex Mavis 350 Shuttle",
    },
  ]

  const reviews = [
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
  ]

  return (
    <main className="bg-brand-light">
      {/* HERO */}
      <div className="pt-24 md:pt-28 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <SportsHeroCarousel />
      </div>

      {/* PROMOS */}
      <section className="mt-16 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <PromoSlider slides={promoSlides} />
      </section>

      {/* SHOP PREVIEW */}
      <section className="mt-16 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[shop1, shop2, shop3, shop4].map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Unbound Sports store"
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
      </section>

      {/* MAP */}
      <section className="mt-16 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <Map />
      </section>

      {/* REVIEWS */}
      <section className="mt-20 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <h2 className="text-2xl font-bold text-center text-brand-dark mb-8">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
