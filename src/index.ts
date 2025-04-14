import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pagination from './middlewares/pagination';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pagination.middleware);
app.use(routes);
app.get('/', (req, res) => {
  res.send('Welcome to the Secure User API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
