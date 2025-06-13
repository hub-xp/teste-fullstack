export interface Review {
  id: string;
  bookId: string;
  reviewCount: number;
  avaliation: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewResponse {
  data: Review;
  message?: string;
}

export interface ReviewsResponse {
  data: Review[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface CreateReviewDto {
  bookId: string;
  reviewCount: number;
  avaliation: string;
}

export interface UpdateReviewDto {
  reviewCount?: number;
  avaliation?: string;
}
