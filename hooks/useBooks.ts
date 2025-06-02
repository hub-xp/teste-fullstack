import { useQuery } from 'react-query';
import { fetchBooks } from '../utils/api';

const useBooks = () => {
  const { data, error, isLoading } = useQuery('books', fetchBooks);

  return {
    books: data,
    isLoading,
    error,
  };
};

export default useBooks;