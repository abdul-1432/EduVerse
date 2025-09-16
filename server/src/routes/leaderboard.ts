import { Router } from 'express';
import { User } from '../models/User.js';

export const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const top = await User.find({}, { displayName: 1, avatar: 1, xp: 1 })
      .sort({ xp: -1 })
      .limit(20)
      .lean();
    res.json({ leaderboard: top });
  } catch (err) { next(err); }
});