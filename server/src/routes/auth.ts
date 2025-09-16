import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';

export const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2),
  avatar: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function signToken(userId: string) {
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.sign({ sub: userId }, secret, { expiresIn: '2h' });
}

router.post('/register', async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const exists = await User.findOne({ email: data.email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await User.create({
      email: data.email,
      passwordHash,
      displayName: data.displayName,
      avatar: data.avatar || 'avatar-1',
    });
    await AuditLog.create({ userId: user._id, action: 'USER_REGISTER' });
    const token = signToken(user._id.toString());
    res.status(201).json({
      token,
      user: { id: user._id, email: user.email, displayName: user.displayName, avatar: user.avatar, xp: user.xp, badges: user.badges },
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(data.password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    await AuditLog.create({ userId: user._id, action: 'USER_LOGIN' });
    const token = signToken(user._id.toString());
    res.json({
      token,
      user: { id: user._id, email: user.email, displayName: user.displayName, avatar: user.avatar, xp: user.xp, badges: user.badges },
    });
  } catch (err) {
    next(err);
  }
});
