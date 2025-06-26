"use client";

import { useTopBooks } from "@/hooks/useBooks";
import BookCard from "@/components/BookCard";

export default function BooksPage() {
  const { data, isLoading } = useTopBooks();

  if (isLoading) return <p>Carregando livros...</p>;

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Top Livros</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {data?.map(book => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </main>
  );
}
