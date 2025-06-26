"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  bookId: string;
  onReviewAdded: () => void;
};

export default function ReviewForm({ bookId, onReviewAdded }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      api(`/books/${bookId}/reviews`, {
        method: "POST",
        body: JSON.stringify({ rating, comment }),
      }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["reviews", bookId] });

      const previous = queryClient.getQueryData(["reviews", bookId]);
      queryClient.setQueryData(["reviews", bookId], (old: any) => [
        ...(old || []),
        { _id: "temp", book: bookId, rating, comment },
      ]);
      return { previous };
    },
    onSettled: () => {
      onReviewAdded();
      queryClient.invalidateQueries({ queryKey: ["books", "top", 10] });
      setRating(5);
      setComment("");
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["reviews", bookId], context.previous);
      }
      setError("Erro ao adicionar avaliação");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return setError("Comentário é obrigatório");
    setError("");
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <label className="block text-sm">
        Nota:
        <select
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="ml-2 border px-2 py-1 rounded"
        >
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <textarea
        placeholder="Escreva um comentário..."
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="w-full border rounded p-2 text-sm"
        rows={3}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mutation.isPending ? "Enviando..." : "Enviar avaliação"}
      </button>
    </form>
  );
}
