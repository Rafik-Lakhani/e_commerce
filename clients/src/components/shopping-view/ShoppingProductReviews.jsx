import React, { useState } from "react";
import { Star } from "lucide-react";

const dummyReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment: "Amazing product! Highly recommend. The frame quality is superb and the lenses are crystal clear.",
    date: "March 5, 2025",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment: "Very good quality, but shipping was a bit slow. The glasses look exactly as pictured and fit perfectly.",
    date: "March 3, 2025",
  },
  {
    id: 3,
    user: "Alice Johnson",
    rating: 3,
    comment: "Decent product but expected better packaging. The glasses themselves are nice, but arrived with a small scratch on the frame.",
    date: "March 1, 2025",
  },
];

function ShoppingProductReviews({ product }) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {dummyReviews.length > 2 && (
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-sm px-4 py-2 border border-gray-300 rounded-full hover:border-black transition-all duration-300"
          >
            {showAllReviews ? 'Show Less' : 'View All Reviews'}
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {(showAllReviews ? dummyReviews : dummyReviews.slice(0, 2)).map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-shadow duration-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {review.user.split(' ').map(name => name[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{review.user}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={i < review.rating ? "currentColor" : "none"}
                    className="w-4 h-4"
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {/* Show More Button (alternative to the button in the header for mobile) */}
      {dummyReviews.length > 2 && !showAllReviews && (
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={() => setShowAllReviews(true)}
            className="text-sm text-gray-700 border-b border-gray-300 pb-0.5 hover:border-black hover:text-black transition-all duration-300"
          >
            + Show More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default ShoppingProductReviews;
