"use client";

import { useBooks } from "@/hooks/useBooks";
import BookListItem from "./BookListItem";

const BookList = () => {
  const { data: books, isLoading, error } = useBooks();

  if (isLoading) {
    return (
      <div className="my-10 text-center py-10 text-lg animate-pulse">
        Loading top books...
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-10 text-center py-10 text-red-500">
        Error loading books. Please try again later.
      </div>
    );
  }

  if (!Array.isArray(books) || books.length === 0) {
    return (
      <div className="my-10 text-center py-10 text-zinc-500">
        No books found.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <p className="text-center text-zinc-800 dark:text-zinc-100 mb-1">
        <a
          className="underline"
          href="https://www.linkedin.com/in/lucas-bachega-8751101b9/"
          target="_blank"
        >
          Lucas Bachega
        </a>
      </p>
      <h1 className="text-4xl font-bold text-center text-zinc-800 dark:text-zinc-100 mb-12">
        📚 Top Books
      </h1>

      <ul className="flex flex-col gap-4">
        {books.map((book, idx: number) => {
          return <BookListItem key={book._id} position={idx + 1} {...book} />;
        })}
      </ul>
    </section>
  );
};

export default BookList;
