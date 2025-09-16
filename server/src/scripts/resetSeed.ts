import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Quiz } from '../models/Quiz.js'
import { User } from '../models/User.js'

dotenv.config()

export async function resetAndSeed() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/eduverse'
  await mongoose.connect(uri)
  await Quiz.deleteMany({})
  await User.updateMany({}, { $set: { xp: 0, badges: [] } })
  await Quiz.create([
    {
      title: 'Accessibility Basics',
      description: 'Learn about dyslexia-friendly fonts and voice input',
      questions: [
        { text: 'Which font is dyslexia-friendly?', options: ['Comic Sans', 'OpenDyslexic', 'Times New Roman'], correctIndex: 1 },
        { text: 'Speech-to-text helps which learners most?', options: ['Hearing-impaired', 'Visual learners', 'Everyone'], correctIndex: 0 }
      ],
      xpReward: 30,
      badgeReward: 'Accessibility Advocate',
    }
  ])
  await mongoose.disconnect()
}
