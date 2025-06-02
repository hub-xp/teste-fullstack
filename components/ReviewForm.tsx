'use client';

import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { submitReview } from '../utils/api';

interface ReviewFormProps {
  bookId: string;
}

interface ReviewInput {
  rating: number;
  comment: string;
  book: string;
}

const ReviewForm = ({ bookId }: ReviewFormProps) => {
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation((input: ReviewInput) => submitReview(bookId, input), {
    onMutate: async (input) => {
      setFormError(null);
      const prevReviews = queryClient.getQueryData(['reviews', bookId]);
      queryClient.setQueryData(['reviews', bookId], (old: any) => {
        const optimistic = {
          ...input,
          author: 'You',
          rating: input.rating,
          _id: 'optimistic-' + Date.now(),
        };
        return {
          ...old,
          reviews: [optimistic, ...(old?.reviews || [])],
        };
      });
      return { prevReviews };
    },
    onError: (err, _input, context) => {
      setFormError('Failed to submit review. Please try again.');
      if (context?.prevReviews) {
        queryClient.setQueryData(['reviews', bookId], context.prevReviews);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['book', bookId]);
      queryClient.invalidateQueries(['reviews', bookId]);
      queryClient.invalidateQueries('books');
      setRating(1);
      setComment('');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (!comment.trim()) {
      setFormError('Comment is required.');
      return;
    }
    if (rating < 1 || rating > 5) {
      setFormError('Rating must be between 1 and 5.');
      return;
    }
    mutation.mutate({ rating, comment, book: bookId });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4" aria-label="Add a review">
      <h2 className="text-lg font-semibold">Add a Review</h2>
      {formError && (
        <div className="text-red-500 text-sm" role="alert">
          {formError}
        </div>
      )}
      <div>
        <label htmlFor="rating" className="block text-sm font-medium">
          Rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full text-black border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          aria-required="true"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium">
          Comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="mt-1 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
          aria-required="true"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        disabled={mutation.isLoading}
        aria-busy={mutation.isLoading}
      >
        {mutation.isLoading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
