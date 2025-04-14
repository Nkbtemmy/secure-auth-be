import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.get('/', (_, res) => {
  res.send('Secure User Dashboard API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
