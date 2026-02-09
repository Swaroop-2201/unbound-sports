type Review = {
  name: string
  review: string
  rating: number
}

const ReviewCard = ({ name, review, rating }: Review) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
      <div className="flex justify-between">
        <h4 className="font-semibold text-brand-dark">{name}</h4>
        <div className="text-brand-red text-sm">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-3">“{review}”</p>
    </div>
  )
}

export default ReviewCard
