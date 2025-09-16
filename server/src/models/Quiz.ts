import mongoose, { Schema, Types } from 'mongoose';

export interface IQuiz {
  _id: Types.ObjectId;
  title: string;
  description: string;
  group?: string; // e.g., Schooling, HighSchool, Graduates, Engineering, Medic, General
  subgroup?: string; // e.g., 1-10, 11-12, CSE, ECE, etc
  difficulty?: 'easy' | 'medium' | 'hard';
  questions: {
    text: string;
    options: string[];
    correctIndex: number;
  }[];
  xpReward: number;
  badgeReward?: string;
}

const quizSchema = new Schema<IQuiz>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  group: { type: String, index: true },
  subgroup: { type: String, index: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy', index: true },
  questions: [
    {
      text: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctIndex: { type: Number, required: true },
    },
  ],
  xpReward: { type: Number, default: 10 },
  badgeReward: { type: String },
});

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
