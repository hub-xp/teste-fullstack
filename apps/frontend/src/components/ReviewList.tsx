import { Review } from "@/lib/types";

type Props = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: Props) {
  if (!reviews.length)
    return <p className="text-sm text-gray-500">Nenhuma avaliação ainda.</p>;

  return (
    <ul className="mt-2 space-y-3">
      {reviews.map(r => (
        <li key={r._id} className="border p-3 rounded shadow-sm">
          <p className="text-yellow-500">⭐ {r.rating}/5</p>
          <p className="text-sm">{r.comment}</p>
        </li>
      ))}
    </ul>
  );
}
