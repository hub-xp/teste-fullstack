import { connectToMongo } from './utils/connect-db';
import { BookSchema } from '../modules/books/models/book.schema';
import { ReviewSchema } from '../modules/reviews/models/review.schema';
import mongoose from 'mongoose';
import { booksSeedData } from './data/books.seed';
import { reviewsSeedData } from './data/reviews.seed';

async function runSeed() {
  await connectToMongo();

  const BookModel = mongoose.model('Book', BookSchema);
  const ReviewModel = mongoose.model('Review', ReviewSchema);

  await BookModel.deleteMany();
  await ReviewModel.deleteMany();

  console.log('[•] Limpando dados antigos...');

  const books = await BookModel.insertMany(booksSeedData);
  console.log(`[✓] ${books.length} livros inseridos.`);

  const reviews = await ReviewModel.insertMany(
    reviewsSeedData(books.map((b) => b._id)),
  );
  console.log(`[✓] ${reviews.length} avaliações inseridas.`);

  console.log('\n✅ Seed concluído com sucesso!');
  process.exit(0);
}

runSeed();
