import Link from "next/link";
import { Book } from "@/lib/types";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="p-4 rounded-xl border shadow-sm bg-white flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
      <p className="text-sm text-gray-500 mb-1">{book.author}</p>

      {book.avgRating !== undefined && (
        <div className="text-yellow-500 text-sm mb-2">
          ⭐ {book.avgRating?.toFixed(1)} ({book.reviewCount})
        </div>
      )}

      <Link
        href={`/books/${book._id}`}
        className="mt-auto text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        Ver detalhes →
      </Link>
    </div>
  );
}
