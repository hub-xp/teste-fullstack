"use client";

import { Suspense } from "react";
import { Loading } from "../../../components/Loading";
import { notFound } from "next/navigation";
import { BookDetails } from "./components/BookDetails";
import { useBook } from "@/network/hooks/books/useBooks";

export default function BookPage({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useBook(params.id);

  if (isLoading) {
    return <Loading />;
  }

  if (error || !data?.data) {
    notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <BookDetails book={data.data} />
    </Suspense>
  );
}
