export const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const total = 5;

  return Array.from({ length: total }, (_, i) => {
    if (i < full) {
      return (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.186 3.662a1 1 0 00.95.69h3.845c.969 0 1.371 1.24.588 1.81l-3.11 2.26a1 1 0 00-.364 1.118l1.186 3.662c.3.921-.755 1.688-1.54 1.118l-3.11-2.26a1 1 0 00-1.175 0l-3.11 2.26c-.784.57-1.838-.197-1.539-1.118l1.186-3.662a1 1 0 00-.364-1.118l-3.11-2.26c-.783-.57-.38-1.81.588-1.81h3.845a1 1 0 00.95-.69l1.186-3.662z" />
        </svg>
      );
    } else if (i === full && hasHalf) {
      return (
        <svg
          key={i}
          className="w-5 h-5 text-yellow-400 inline-block"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="lightgray" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-${i})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.186 3.662a1 1 0 00.95.69h3.845c.969 0 1.371 1.24.588 1.81l-3.11 2.26a1 1 0 00-.364 1.118l1.186 3.662c.3.921-.755 1.688-1.54 1.118l-3.11-2.26a1 1 0 00-1.175 0l-3.11 2.26c-.784.57-1.838-.197-1.539-1.118l1.186-3.662a1 1 0 00-.364-1.118l-3.11-2.26c-.783-.57-.38-1.81.588-1.81h3.845a1 1 0 00.95-.69l1.186-3.662z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          key={i}
          className="w-5 h-5 text-gray-300 inline-block"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.186 3.662a1 1 0 00.95.69h3.845c.969 0 1.371 1.24.588 1.81l-3.11 2.26a1 1 0 00-.364 1.118l1.186 3.662c.3.921-.755 1.688-1.54 1.118l-3.11-2.26a1 1 0 00-1.175 0l-3.11 2.26c-.784.57-1.838-.197-1.539-1.118l1.186-3.662a1 1 0 00-.364-1.118l-3.11-2.26c-.783-.57-.38-1.81.588-1.81h3.845a1 1 0 00.95-.69l1.186-3.662z" />
        </svg>
      );
    }
  });
};
