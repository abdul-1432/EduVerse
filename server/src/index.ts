import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { router as authRouter } from './routes/auth.js';
import { router as quizRouter } from './routes/quiz.js';
import { router as userRouter } from './routes/user.js';
import { router as leaderboardRouter } from './routes/leaderboard.js';
import { errorHandler, notFound } from './utils/errors.js';

dotenv.config();

const app = express();

app.use(helmet());
// Flexible CORS: allow localhost/127.0.0.1 during development
const devOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://localhost:8080'
];
const configured = (process.env.CORS_ORIGIN || '').split(',').filter(Boolean);
const allowed = configured.length > 0 ? configured : devOrigins;
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowed.includes(origin) || process.env.NODE_ENV !== 'production') return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 120 });
app.use(limiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/user', userRouter);
app.use('/api/leaderboard', leaderboardRouter);

// Optionally serve client build in production
if (process.env.SERVE_CLIENT === 'true') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const clientDist = path.resolve(__dirname, '../../client/dist');
  if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(path.join(clientDist, 'index.html'));
    });
  }
}

app.use(notFound);
app.use(errorHandler);

const PORT = Number(process.env.PORT || 4000);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eduverse';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
