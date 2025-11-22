import express, { Request, Response } from 'express';
import cors from 'cors';
import livesRouter from './api/lives';
import usersRouter from './api/users';

const app = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/lives', livesRouter);
app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'CreatorSeal Backend API' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
