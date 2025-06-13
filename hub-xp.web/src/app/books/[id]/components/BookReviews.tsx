import { Star } from "lucide-react";
import { useState } from "react";
import { ReviewModal } from "../../../../../components/ReviewModal";
import { useCreateReview, useBookReviews } from "@/network/hooks/reviews/useReviews";

interface BookReviewsProps {
  id: string;
  name: string;
  avaliation: number;
  reviewCount: number;
}

export function BookReviews({
  id,
  name,
  avaliation,
  reviewCount: initialReviewCount,
}: BookReviewsProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { mutateAsync: createReview, isPending: isSubmitting } = useCreateReview();
  const { data: reviewsData } = useBookReviews(id, { page: 1, limit: 10 });

  const handleReview = async (reviewCount: number, avaliation: string) => {
    await createReview(
      {
        bookId: id,
        reviewCount,
        avaliation,
      },
      {
        onSuccess: () => setIsReviewOpen(false),
      }
    );
  };

  const reviews = reviewsData?.data || [];
  const totalReviews = reviewsData?.meta?.total || initialReviewCount;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Reviews</h2>
        <button
          onClick={() => setIsReviewOpen(true)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-lg text-white"
        >
          Adicionar review
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
            />
          ))}
        </div>
        <span className="text-zinc-400">({avaliation})</span>
        <span className="mx-2 text-zinc-600">|</span>
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">
          {totalReviews} avaliações
        </span>
      </div>

      {reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#1a1a1a] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < review.reviewCount ? "text-yellow-400" : "text-zinc-700"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <span className="text-sm text-zinc-400">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-zinc-300">{review.avaliation}</p>
            </div>
          ))}
        </div>
      )}

      <ReviewModal
        book={{ id, name }}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSubmitReview={handleReview}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
