import mongoose, { Schema, Types } from 'mongoose';

export interface ISubmission {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  quizId: Types.ObjectId;
  answers: number[];
  correct: number;
  total: number;
  passed: boolean;
  createdAt: Date;
}

const submissionSchema = new Schema<ISubmission>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{ type: Number, required: true }],
  correct: { type: Number, required: true },
  total: { type: Number, required: true },
  passed: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Submission = mongoose.model<ISubmission>('Submission', submissionSchema);
