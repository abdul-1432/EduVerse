import mongoose, { Schema, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  displayName: string;
  avatar: string;
  xp: number;
  badges: string[];
  settings: {
    accessibility: {
      dyslexiaFont: boolean;
      highContrast: boolean;
      reducedMotion: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, required: true, index: true },
    passwordHash: { type: String, required: true },
    displayName: { type: String, required: true },
    avatar: { type: String, default: 'avatar-1' },
    xp: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    settings: {
      accessibility: {
        dyslexiaFont: { type: Boolean, default: false },
        highContrast: { type: Boolean, default: false },
        reducedMotion: { type: Boolean, default: false },
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
