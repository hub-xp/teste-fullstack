module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db, client) {
    await db.collection('reviews').createIndex(
      { bookId: 1 },
      {
        unique: false,
        sparse: true,
        background: true,
        name: 'reviews_bookId_idx'
      }
    );

    await db.command({
      collMod: 'reviews',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['bookId'],
          properties: {
            bookId: {
              bsonType: 'objectId',
              description: 'Referência para o livro'
            }
          }
        }
      },
      validationLevel: 'strict'
    });
  },

  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async down(db, client) {
    await db.collection('reviews').dropIndex('reviews_bookId_idx');
    
    await db.command({
      collMod: 'reviews',
      validator: {},
      validationLevel: 'off'
    });
  }
};
