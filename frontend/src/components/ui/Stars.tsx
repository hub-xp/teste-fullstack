import { renderStars } from "@/utils/books";

interface Props {
  avgRating: number;
  reviewsCount: number | null;
  disableText?: boolean;
  className?: string;
}

const Stars = ({
  avgRating = 0,
  reviewsCount = 0,
  className = "",
  disableText = false,
}: Props) => {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      {renderStars(avgRating)}
      {!disableText && (
        <span className="ml-2 text-zinc-500 dark:text-zinc-400">
          {avgRating.toFixed(1)} ({reviewsCount ?? 0} review
          {reviewsCount !== 1 ? "s" : ""})
        </span>
      )}
    </div>
  );
};

export default Stars;
