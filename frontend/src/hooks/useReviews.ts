import { fetchReviewsByBookId } from "@/service/books";
import { IReview } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export const useReviews = (bookId: string | undefined) => {
  return useQuery<IReview[]>({
    queryKey: ["reviews", bookId],
    queryFn: () => fetchReviewsByBookId(bookId!),
    enabled: !!bookId,
  });
};
