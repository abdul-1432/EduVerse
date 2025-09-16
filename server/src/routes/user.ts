import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthedRequest } from '../utils/jwt.js';
import { User } from '../models/User.js';
import { Submission } from '../models/Submission.js';

export const router = Router();

router.get('/me', authMiddleware, async (req: AuthedRequest, res, next) => {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      user: {
        id: user._id,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        xp: user.xp,
        badges: user.badges,
        settings: user.settings,
      },
    });
  } catch (err) { next(err); }
});

router.patch('/settings/accessibility', authMiddleware, async (req: AuthedRequest, res, next) => {
  try {
    const { dyslexiaFont, highContrast, reducedMotion } = req.body || {};
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (typeof dyslexiaFont === 'boolean') user.settings.accessibility.dyslexiaFont = dyslexiaFont;
    if (typeof highContrast === 'boolean') user.settings.accessibility.highContrast = highContrast;
    if (typeof reducedMotion === 'boolean') user.settings.accessibility.reducedMotion = reducedMotion;
    await user.save();
    res.json({ settings: user.settings });
  } catch (err) { next(err); }
});

// Update avatar and displayName
const profileSchema = z.object({ displayName: z.string().min(2).optional(), avatar: z.string().optional() });
router.patch('/profile', authMiddleware, async (req: AuthedRequest, res, next) => {
  try {
    const { displayName, avatar } = profileSchema.parse(req.body || {});
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (displayName) user.displayName = displayName;
    if (avatar) user.avatar = avatar;
    await user.save();
    res.json({ user: { id: user._id, email: user.email, displayName: user.displayName, avatar: user.avatar, xp: user.xp, badges: user.badges } });
  } catch (err) { next(err); }
});

// User summary: rank and recent submissions
router.get('/summary', authMiddleware, async (req: AuthedRequest, res, next) => {
  try {
    const user = await User.findById(req.userId).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    const higher = await User.countDocuments({ xp: { $gt: user.xp } });
    const rank = higher + 1;
    const recent = await Submission.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate({ path: 'quizId', select: 'title group subgroup difficulty' })
      .lean();
    res.json({
      user: {
        id: user._id, email: user.email, displayName: user.displayName, avatar: user.avatar, xp: user.xp, badges: user.badges
      },
      rank,
      recent: recent.map(r => ({
        id: r._id,
        quizId: r.quizId?._id || r.quizId,
        quizTitle: (r as any).quizId?.title || 'Quiz',
        group: (r as any).quizId?.group,
        subgroup: (r as any).quizId?.subgroup,
        difficulty: (r as any).quizId?.difficulty,
        correct: r.correct,
        total: r.total,
        passed: r.passed,
        createdAt: r.createdAt,
      }))
    });
  } catch (err) { next(err); }
});
