'use client';

import React from 'react';
import { useQuery } from 'react-query';
import { fetchBookById, fetchReviewsByBookId } from '../utils/api';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

interface BookDetailProps {
  bookId: string;
}

const BookDetail = ({ bookId }: BookDetailProps) => {
  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useQuery(['book', bookId], () => fetchBookById(bookId));
  const {
    data: reviewsData,
    isLoading: isReviewsLoading,
    error: reviewsError,
  } = useQuery(['reviews', bookId], () => fetchReviewsByBookId(bookId));

  if (isBookLoading || isReviewsLoading) return <div>Loading...</div>;
  if (bookError || reviewsError) return <div>Error loading book details</div>;

  const avgRating = reviewsData?.avgRating ?? reviewsData?.avg_rating ?? 'N/A';
  const reviews = reviewsData?.reviews ?? [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{book?.title}</h1>
      <p className="text-lg">{book?.description}</p>
      <div className="flex items-center gap-2 mt-2 mb-4">
        <span className="text-yellow-500 text-lg">★</span>
        <span className="text-zinc-700 dark:text-zinc-300 font-medium">
          {Number(avgRating).toFixed(2)} / 5.0
        </span>
        <span className="text-sm text-zinc-500 ml-2">
          ({reviews.length} review{reviews.length !== 1 && 's'})
        </span>
      </div>
      <h2 className="text-xl mt-4">Reviews</h2>
      <ReviewForm bookId={bookId} />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default BookDetail;
