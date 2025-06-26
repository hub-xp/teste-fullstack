import { Types } from 'mongoose';

export const reviewsSeedData = (bookIds: Types.ObjectId[]) => [
  { book: bookIds[0], rating: 5, comment: 'Excelente leitura!' },
  {
    book: bookIds[0],
    rating: 4,
    comment: 'Muito bom, mas poderia ser mais direto.',
  },
  { book: bookIds[1], rating: 5, comment: 'Obra obrigatória para devs!' },
  { book: bookIds[2], rating: 3, comment: 'Achei técnico demais.' },
];
