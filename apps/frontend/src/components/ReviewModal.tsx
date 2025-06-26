import Modal from "./ui/Modal";
import ReviewForm from "./forms/ReviewForm";
import { Review } from "@/lib/types";

type Props = {
  open: boolean;
  onClose: () => void;
  bookId: string;
  reviews: Review[];
  onReviewAdded: () => void;
};

export default function ReviewModal({
  open,
  onClose,
  bookId,
  reviews,
  onReviewAdded,
}: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-2 text-white">Avaliações</h2>

      <div className="max-h-60 overflow-y-auto space-y-2 mb-4">
        {reviews.length === 0 && (
          <p className="text-sm text-white">Nenhuma avaliação.</p>
        )}
        {reviews.map(r => (
          <div
            key={r._id}
            className="border p-2 rounded bg-gray-50 text-sm text-black"
          >
            <div className="text-yellow-500">⭐ {r.rating}</div>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>

      <ReviewForm bookId={bookId} onReviewAdded={onReviewAdded} />
    </Modal>
  );
}
