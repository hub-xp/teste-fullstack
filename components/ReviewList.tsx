'use client';

import React from 'react';

interface Review {
  id?: string;
  _id?: string;
  content: string;
  rating: number;
  author: string;
}

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const safeReviews = Array.isArray(reviews) ? reviews : [];
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">Reviews</h2>
      {safeReviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="space-y-4">
          {safeReviews.map((review) => (
            <li
              key={review.id || review._id}
              className="border p-4 rounded-md min-w-[200px] mt-2"
              tabIndex={0}
              aria-label={`Review by ${review.author}, rating ${review.rating}`}
            >
              <p className="font-bold">{review.author}</p>
              <p className="text-sm text-gray-500">Rating: {review.rating}</p>
              {review.content && <p className="text-zinc-700 mt-1">{review.content}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
