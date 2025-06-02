'use client';
import React from 'react';
import BookDetail from '../../../components/BookDetail';
import { useParams } from 'next/navigation';

export default function BookDetailPage() {
  const params = useParams() as { id: string };
  const bookId = params?.id;

  return (
    <div className="container mx-auto py-8">
      <BookDetail bookId={bookId} />
    </div>
  );
}
