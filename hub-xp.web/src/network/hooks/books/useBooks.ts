import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  getTopBooks,
  updateBook,
} from "../../actions/books/actionBooks";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Book } from "@/shared/types/Book";
import { api } from "../../api";

interface BooksResponse {
  data: Book[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

interface ReviewsResponse {
  data: {
    id: string;
    bookId: {
      _id: string;
      name: string;
      author: string;
      avaliation: number;
      description: string;
      reviewCount: number;
      createdAt: string;
      updatedAt: string;
    } | null;
    reviewCount: number;
    avaliation: string;
    createdAt: string;
  }[];
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
}

interface TopBooksResponse {
  data: (Book & {
    avgRating: number;
    reviewCount: number;
  })[];
}

interface BookResponse {
  data: Book;
}

export function useBooks(params?: {
  page?: number;
  limit?: number;
  name?: string;
  author?: string;
}) {
  const query = useQuery<BooksResponse>({
    queryKey: ["books", params],
    queryFn: async () => await getBooks(params || {}),
  });

  return query;
}

export function useBook(id: string) {
  return useQuery<BookResponse>({
    queryKey: ["book", id],
    queryFn: async () => await getBookById(id),
    enabled: !!id,
  });
}

export function useCreateBook() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (
      data: Omit<Book, "id" | "created_at" | "updated_at">
    ): Promise<BookResponse> => await createBook(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar o livro");
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: { id: string } & Partial<
      Omit<Book, "id" | "created_at" | "updated_at">
    >) => await updateBook(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", variables.id] });
      toast.success("Livro atualizado com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar livro");
      } else {
        toast.error("Erro ao atualizar livro");
      }
    },
  });
}

export function useDeleteBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Livro excluído com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao excluir livro");
      } else {
        toast.error("Erro ao excluir livro");
      }
    },
  });
}

export function useBestRatedBooks(params?: { page?: number; limit?: number; reviewCount?: number }) {
  const query = useQuery<ReviewsResponse, Error, BooksResponse>({
    queryKey: ["best-rated-books", params],
    queryFn: async () => {
      const response = await api.get<ReviewsResponse>("/reviews", {
        params: {
          ...params,
          reviewCount: params?.reviewCount
        }
      });
      return response.data;
    },
    select: (data) => ({
      data: data.data
        .filter((review): review is typeof review & { bookId: NonNullable<typeof review.bookId> } => review.bookId !== null)
        .map(review => ({
          id: review.bookId._id,
          name: review.bookId.name,
          author: review.bookId.author,
          avaliation: review.bookId.avaliation,
          description: review.bookId.description,
          reviewCount: review.reviewCount,
          created_at: review.bookId.createdAt,
          updated_at: review.bookId.updatedAt
        })),
      meta: data.meta
    })
  });

  return query;
}

export function useTopBooks(limit?: number) {
  return useQuery<TopBooksResponse>({
    queryKey: ["top-books", limit],
    queryFn: async () => await getTopBooks(limit),
  });
}
