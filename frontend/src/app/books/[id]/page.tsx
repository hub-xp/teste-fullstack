import BookDetail from "@/components/BookDetail";
import { Card } from "@/components/ui/Card";

export default function BookDetailPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <Card variant="default">
        <h1 className="text-sm font-bold text-zinc-500 uppercase tracking-wide mb-2">
          Book
        </h1>
        <BookDetail />
      </Card>
    </div>
  );
}
