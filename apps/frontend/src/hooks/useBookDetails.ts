"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Book, Review } from "@/lib/types";

export function useBookDetails(id: string) {
  const book = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: () => api(`/books/${id}`),
  });

  const reviews = useQuery<Review[]>({
    queryKey: ["reviews", id],
    queryFn: () => api(`/books/${id}/reviews`),
  });

  return { book, reviews };
}
