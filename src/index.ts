import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import pagination from './middlewares/pagination';
import routes from './routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pagination.middleware);
app.use(routes);

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.info('Connected to the database successfully.🏅🏅🏅');
  } catch (error) {
    console.error('Failed to connect to the database!', error);
    process.exit(1);
  }
  console.log(`Server running on http://localhost:${PORT}`);
});
