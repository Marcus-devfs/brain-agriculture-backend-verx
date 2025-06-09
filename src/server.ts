import dotenv from 'dotenv';
import app from './app';
import { initDb } from './models';

dotenv.config();

const PORT = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
