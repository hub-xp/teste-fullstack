import { IReview } from "@/types/book";
import { formatRelativeTime } from "@/utils/date";
import { memo } from "react";
import Stars from "./ui/Stars";

const ReviewListItem = ({ comment, rating, reviewer, createdAt }: IReview) => {
  return (
    <li className="flex items-start bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl">
      <div className="grow">
        <p>
          <span className="font-bold">{reviewer ?? "Anônimo"}</span>
        </p>
        <p className="text-sm text-zinc-800 dark:text-zinc-100">
          {comment ?? "No comment"}
        </p>
        <Stars
          disableText
          reviewsCount={null}
          avgRating={rating}
          className="mt-2"
        />
      </div>
      <p className="text-xs text-zinc-800 dark:text-zinc-200">
        {createdAt ? formatRelativeTime(new Date(createdAt)) : "Just now"}
      </p>
    </li>
  );
};

export default memo(ReviewListItem);
