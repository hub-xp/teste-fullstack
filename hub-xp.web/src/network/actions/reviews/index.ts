import { api } from '@/lib/axios'
import { CreateReviewDto, ReviewResponse, ReviewsResponse, UpdateReviewDto } from '@/shared/types/Review'

export async function getReviews(page?: number, limit?: number): Promise<ReviewsResponse> {
  const response = await api.get<ReviewsResponse>('/reviews', {
    params: { page, limit }
  })
  return response.data
}

export async function getReviewsByBookId(
  bookId: string,
  page?: number,
  limit?: number
): Promise<ReviewsResponse> {
  const response = await api.get<ReviewsResponse>(`/reviews/book/${bookId}`, {
    params: { page, limit }
  })
  return response.data
}

export async function createReview(data: CreateReviewDto): Promise<ReviewResponse> {
  const response = await api.post<ReviewResponse>('/reviews', data)
  return response.data
}

export async function updateReview(id: string, data: UpdateReviewDto): Promise<ReviewResponse> {
  const response = await api.patch<ReviewResponse>(`/reviews/${id}`, data)
  return response.data
}

export async function deleteReview(id: string): Promise<void> {
  await api.delete(`/reviews/${id}`)
} 