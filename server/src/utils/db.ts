import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export async function connectMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/eduverse'
  await mongoose.connect(uri)
}
