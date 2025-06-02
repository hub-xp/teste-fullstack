import BookList from '../components/BookList';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Top Books</h1>
      <BookList />
    </div>
  );
}
