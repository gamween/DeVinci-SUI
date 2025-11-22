import express from 'express';
import cors from 'cors';
import livesRouter from './api/lives.js';
import usersRouter from './api/users.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/lives', livesRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.json({ message: 'CreatorSeal Backend API' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
