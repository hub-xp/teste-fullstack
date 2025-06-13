module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    const books = await db
      .collection('books')
      .find({ reviewCount: { $exists: true } })
      .toArray();

    for (const book of books) {
      await db.collection('reviews').insertOne({
        bookId: book._id,
        reviewCount: book.reviewCount,
        avaliation: '',
        created_at: new Date(),
        updated_at: new Date()
      });

      await db
        .collection('books')
        .updateOne({ _id: book._id }, { $unset: { reviewCount: '' } });
    }

    await db.collection('reviews').createIndex({ bookId: 1 });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    const reviews = await db.collection('reviews').find({}).toArray();

    for (const review of reviews) {
      await db
        .collection('books')
        .updateOne(
          { _id: review.bookId },
          { $set: { reviewCount: review.reviewCount } },
        );
    }

    await db.collection('reviews').drop();
  },
};
