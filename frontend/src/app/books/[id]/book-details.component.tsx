'use client';

import BookReviews from "@/Interfaces/book-reviews.interface";
import api from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function BookDetails() {
    const params = useParams();
    const queryClient = useQueryClient();
    const [newReview, setNewReview] = useState({ userName: '', rating: 5 });
 
    const { isPending: isBookPending, error: bookError, data: bookReviews, refetch: refetchReviews } = useQuery({
        queryKey: [`bookReviews:${params.id}`],
        queryFn: async () => {
            const {data} = await api.get<BookReviews>(`/books/${params.id}/reviews`)
            return data
        }
    });


    const addReviewMutation = useMutation({
        mutationFn: async (review: { userName: string; rating: number }) => {
            const {data} = await api.post(`/reviews`, {...review, bookId: params.id})
            refetchReviews()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookReviews', params.id] })
            setNewReview({ userName: '', rating: 5 })
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addReviewMutation.mutate(newReview)
    };

    if (isBookPending) return 'Loading...';
    if (bookError) return 'An error has occurred: ' + bookError.message;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-gray-500 text-2xl font-bold mb-8">Detalhes do Livro: {bookReviews?.book}</h1>

            

            <div className="w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Adicionar Avaliação</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">
                                Seu Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={newReview.userName}
                                onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="rating" className="block text-sm font-medium mb-1">
                                Avaliação
                            </label>
                            <select
                                id="rating"
                                value={newReview.rating}
                                onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                                className="w-full p-2 rounded bg-gray-700 text-white"
                                required
                            >
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating} {rating === 1 ? 'estrela' : 'estrelas'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                            disabled={addReviewMutation.isPending}
                        >
                            {addReviewMutation.isPending ? 'Enviando...' : 'Enviar Avaliação'}
                        </button>
                    </div>
                </form>

                <div className="mb-8 mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-white">Avaliações</h2>
                    <div className="space-y-4">
                        {bookReviews?.reviews?.map((review) => (
                            <div key={review._id} className="bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">{review.userName}</h3>
                                    <div className="text-yellow-400">
                                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

              
            </div>
        </div>
    );
} 