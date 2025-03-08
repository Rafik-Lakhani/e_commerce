import React from "react";
import { Star } from "lucide-react";

const dummyReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment: "Amazing product! Highly recommend.",
    date: "March 5, 2025",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment: "Very good quality, but shipping was a bit slow.",
    date: "March 3, 2025",
  },
  {
    id: 3,
    user: "Alice Johnson",
    rating: 3,
    comment: "Decent product but expected better packaging.",
    date: "March 1, 2025",
  },
];

function ShoppingProductReviews() {
  return (
    <div className="py-10 px-4 w-full">
      <div className="w-full mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Customer Reviews</h2>
        <div className="space-y-6">
          {dummyReviews.map((review) => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">{review.user}</h3>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill={i < review.rating ? "#facc15" : "none"} />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShoppingProductReviews;
