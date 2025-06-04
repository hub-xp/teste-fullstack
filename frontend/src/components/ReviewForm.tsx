"use client";

import { submitReview } from "@/service/books";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

interface Props {
  bookId: string;
}

const reviewSchema = z.object({
  reviewer: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(3, "Comment is too short"),
});

type ReviewInput = z.infer<typeof reviewSchema>;

const ReviewForm = ({ bookId }: Props) => {
  const queryClient = useQueryClient();
  const [enabledForm, setEnabledForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5 },
  });

  const mutation = useMutation({
    mutationFn: (data: ReviewInput) => submitReview(bookId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", bookId] });
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
      setEnabledForm(false);
      reset();
    },
  });

  const rating = watch("rating");

  if (!enabledForm) {
    return (
      <div className="my-2">
        <Button
          className="flex gap-3"
          onClick={() => setEnabledForm(true)}
          variant="secondary"
        >
          <span>✏️</span> Leave a Review
        </Button>
      </div>
    );
  }

  return (
    <Card variant="outline">
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        className="space-y-4 text-left"
      >
        <h3 className="text-xl font-semibold mb-3">Leave a Review</h3>

        <div>
          <label className="block text-sm font-medium mb-1">
            Your Name (Optional)
          </label>
          <input
            {...register("reviewer")}
            className="w-full px-4 py-2 rounded-lg border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
            placeholder="Your name"
            autoFocus
          />
          {errors.reviewer && (
            <p className="text-red-500 text-sm">{errors.reviewer.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((val) => (
              <span
                key={val}
                onClick={() => setValue("rating", val)}
                className={`cursor-pointer text-2xl transition-all ease-in-out active:scale-110 hover:scale-120 ${
                  val <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            {...register("comment")}
            className="w-full px-4 py-2 rounded-lg border dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800"
            rows={4}
            placeholder="Your thoughts about the book..."
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-1">
          <Button
            onClick={() => setEnabledForm(false)}
            type="button"
            variant="text"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default memo(ReviewForm);
