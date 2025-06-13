import { api } from '@/lib/axios'
import { Review } from '@/shared/types/Review'

interface CreateReviewDTO {
  bookId: string
  reviewCount: number
  avaliation: string
}

export async function createReview(data: CreateReviewDTO): Promise<Review> {
  const response = await api.post<Review>('/reviews', data)
  return response.data
} 