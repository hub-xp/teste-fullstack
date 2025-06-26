"use client";

import { useState } from "react";
import ReviewModal from "@/components/ReviewModal";
import { useBookDetails } from "@/hooks/useBookDetails";

export default function BookDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [modalOpen, setModalOpen] = useState(false);

  const { book, reviews } = useBookDetails(id);

  if (!book.data) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{book.data.title}</h1>
        <p className="text-gray-600 italic mb-2">por {book.data.author}</p>
        <p className="text-sm text-gray-700">{book.data.description}</p>

        <div className="mt-4 flex items-center gap-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            onClick={() => setModalOpen(true)}
          >
            Ver Avaliações
          </button>
        </div>
      </div>

      <ReviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        bookId={id}
        reviews={reviews.data || []}
        onReviewAdded={reviews.refetch}
      />
    </div>
  );
}
