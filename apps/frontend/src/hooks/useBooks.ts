import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Book } from "@/lib/types";

export function useTopBooks(limit = 10) {
  return useQuery<Book[]>({
    queryKey: ["books", "top", limit],
    queryFn: () => api(`/books/top?limit=${limit}`),
  });
}
