import Review from "./review.interface";

export default interface BookReviews {
    book: string;
    reviews: Review[];
}