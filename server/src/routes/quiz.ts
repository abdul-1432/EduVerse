import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware, AuthedRequest } from '../utils/jwt.js';
import { Quiz } from '../models/Quiz.js';
import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';
import { Submission } from '../models/Submission.js';

export const router = Router();

const submitSchema = z.object({
  quizId: z.string(),
  answers: z.array(z.number()),
});

router.get('/', async (req, res, next) => {
  try {
    const { group, subgroup, difficulty } = req.query as any;
    const filter: any = {};
    if (group) filter.group = group;
    if (subgroup) filter.subgroup = subgroup;
    if (difficulty) filter.difficulty = difficulty;
    const quizzes = await Quiz.find(filter, { title: 1, description: 1, xpReward: 1, badgeReward: 1, group: 1, subgroup: 1, difficulty: 1 }).lean();
    res.json({ quizzes });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ quiz });
  } catch (err) { next(err); }
});

router.post('/submit', authMiddleware, async (req: AuthedRequest, res, next) => {
  try {
    const data = submitSchema.parse(req.body);
    const quiz = await Quiz.findById(data.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let correct = 0;
    quiz.questions.forEach((q, i) => {
      if (data.answers[i] === q.correctIndex) correct++;
    });

    const user = await User.findById(req.userId!);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const passed = correct >= Math.ceil(quiz.questions.length * 0.6);
    if (passed) {
      user.xp += quiz.xpReward;
      if (quiz.badgeReward && !user.badges.includes(quiz.badgeReward)) {
        user.badges.push(quiz.badgeReward);
      }
      await user.save();
    }

    await AuditLog.create({ userId: user._id, action: 'QUIZ_SUBMIT', metadata: { quizId: quiz._id, correct, total: quiz.questions.length, passed } });
    await Submission.create({ userId: user._id, quizId: quiz._id, answers: data.answers, correct, total: quiz.questions.length, passed });

    res.json({ correct, total: quiz.questions.length, passed, newXp: user.xp, badges: user.badges });
  } catch (err) { next(err); }
});
