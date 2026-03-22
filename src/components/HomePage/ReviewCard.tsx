import { Star } from "lucide-react"

type Review = {
  name: string
  review: string
  rating: number
}

export const reviews: Review[] = [
  {
    name: "Rahul Sharma",
    rating: 5,
    review: "Got great pricing when I ordered in bulk for our academy...",
  },
  {
    name: "Amit Kulkarni",
    rating: 5,
    review: "Super quick response on WhatsApp and very easy to deal with...",
  },
  {
    name: "Sneha Patil",
    rating: 5,
    review: "We regularly order equipment for our coaching batches...",
  },
  {
    name: "Vikram Desai",
    rating: 4,
    review: "Clean communication, fair pricing, and no unnecessary delays...",
  },
]

const ReviewCard = ({ name, review, rating }: Review) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-900 text-sm">{name}</h4>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < rating ? "text-[#FF2E2E] fill-[#FF2E2E]" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-4 leading-relaxed">“{review}”</p>
      <div className="mt-5 h-[2px] w-10 bg-[#FF2E2E] opacity-70"></div>
    </div>
  )
}

export default ReviewCard