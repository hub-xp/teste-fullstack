export type Book = {
  _id: string;
  title: string;
  author: string;
  description?: string;
  avgRating?: number;
  reviewCount?: number;
};

export type Review = {
  _id: string;
  book: string;
  rating: number;
  comment: string;
};
