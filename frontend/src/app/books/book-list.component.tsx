'use client';

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import api from "@/services/api";
import TopBookResponse from "@/Interfaces/top-book-response.interface";

export default function BooksList() {
    const { isPending, error, data } = useQuery({
        queryKey: ['topBooksData'],
        queryFn: async () => {
            try {
                const {data} = await api.get<TopBookResponse[]>('/books/top', { params: { limit: 10}})
                console.log("topBooksData data: ", data)
                return data
            } catch (err) {
                console.error("Error fetching books:", err)
                throw err
            }
        }
    });

    if (isPending) {
        console.log("Loading state:", isPending)
        return 'Loading...'
    }
    if (error) {
        console.error("Error state:", error)
        return 'An error has occurred: ' + error.message
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-gray-500 text-2xl font-bold">Ranking de Livros</h1>

            <p className="text-white">Veja nossos livros mais populares</p>

            <div className="flex flex-col items-center justify-center mt-10 gap-4">



            {data?.map((book: TopBookResponse) => (
                <Link key={book.bookId} href={`/books/${book.bookId}`}>
                   - {book.name}
                    </Link>
                ))}
            </div>
        </div>
    );
} 