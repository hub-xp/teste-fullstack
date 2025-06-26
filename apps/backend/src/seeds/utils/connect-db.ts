import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('[✓] Conectado ao MongoDB com sucesso');
  } catch (err) {
    console.error('[X] Erro ao conectar ao MongoDB:', err);
    process.exit(1);
  }
};
