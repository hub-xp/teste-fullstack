import { fetchBooks } from "@/service/books";
import { IBook } from "@/types/book";
import { useQuery } from "@tanstack/react-query";

export function useBooks() {
  return useQuery<IBook[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
}
