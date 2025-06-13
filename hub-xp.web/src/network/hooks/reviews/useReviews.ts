import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { CreateReviewDto, ReviewResponse, ReviewsResponse, UpdateReviewDto } from "@/shared/types/Review";
import { 
  createReview, 
  deleteReview, 
  getReviews, 
  getReviewsByBookId, 
  updateReview 
} from "@/network/actions/reviews";

export function useReviews(params?: {
  page?: number;
  limit?: number;
  reviewCount?: number;
  avaliation?: string;
}) {
  const query = useQuery<ReviewsResponse>({
    queryKey: ["reviews", params],
    queryFn: async () => await getReviews(params?.page, params?.limit),
  });

  return query;
}

export function useBookReviews(bookId: string, params?: { page?: number; limit?: number }) {
  return useQuery<ReviewsResponse>({
    queryKey: ["book-reviews", bookId, params],
    queryFn: async () => await getReviewsByBookId(bookId, params?.page, params?.limit),
    enabled: !!bookId,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: CreateReviewDto): Promise<ReviewResponse> => 
      await createReview(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["book-reviews", variables.bookId] });
      queryClient.invalidateQueries({ queryKey: ["books"] }); // Atualiza a lista de livros também
      toast.success("Avaliação enviada com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao enviar avaliação");
      } else {
        toast.error("Erro ao enviar avaliação");
      }
    },
  });

  return { mutateAsync, isPending };
}

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      ...data
    }: { id: string } & UpdateReviewDto) => await updateReview(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Avaliação atualizada com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao atualizar avaliação");
      } else {
        toast.error("Erro ao atualizar avaliação");
      }
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => await deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Avaliação excluída com sucesso!");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Erro ao excluir avaliação");
      } else {
        toast.error("Erro ao excluir avaliação");
      }
    },
  });
} 