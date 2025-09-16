import mongoose from 'mongoose';
import { Quiz } from '../models/Quiz.js';
import { User } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/eduverse';
  await mongoose.connect(uri);

  const user = await User.findOne();
  const quiz = await Quiz.findOne();
  console.log('Users:', await User.countDocuments(), 'Quizzes:', await Quiz.countDocuments());
  console.log('Sample user:', user?.email);
  console.log('Sample quiz:', quiz?.title);
  await mongoose.disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
