import { IBook, IReview } from "@/types/book";
import api from "./api";

export const fetchBooks = async (): Promise<IBook[]> => {
  try {
    const response = await api.get(`/books?limit=10`);
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

export const fetchBookById = async (id: string): Promise<IBook> => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};

export const submitReview = async (
  bookId: string,
  review: IReview
): Promise<IReview> => {
  try {
    const response = await api.post(`/books/${bookId}/reviews`, review);
    return response.data;
  } catch (err: unknown) {
    console.error("ERROR FRONT: ", err);
    throw err;
  }
};

export const fetchReviewsByBookId = async (
  bookId: string
): Promise<IReview[]> => {
  try {
    const response = await api.get(`/reviews/book/${bookId}`);
    return response.data;
  } catch (err: unknown) {
    throw err;
  }
};
