import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const fetchBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/books?limit=10`);
  return response.data;
};

export const fetchBookById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/books/${id}`);
  return response.data;
};

export const submitReview = async (bookId: string, review: any) => {
  const response = await axios.post(`${API_BASE_URL}/books/${bookId}/reviews`, review);
  return response.data;
};

export const fetchReviewsByBookId = async (bookId: string) => {
  const response = await axios.get(`${API_BASE_URL}/books/${bookId}/reviews`);
  return response.data;
};
