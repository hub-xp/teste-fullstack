export default function Header() {
  return (
    <header className="bg-gradient-to-br from-yellow-200 via-yellow-100 to-white shadow-md sticky top-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">📚 Book Reviews</h1>
        <span className="text-sm text-gray-600 italic">
          Para quem ama ler e opinar
        </span>
      </div>
    </header>
  );
}
