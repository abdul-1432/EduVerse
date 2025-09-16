import dotenv from 'dotenv'
import express from 'express'
const app = express()

// In container, serve static via Nginx. This server is API only.
app.get('/', (_req, res) => res.json({ name: 'EduVerse API', status: 'ok' }))

const PORT = Number(process.env.PORT || 4000)
dotenv.config()
app.listen(PORT, () => console.log(`API bootstrap on ${PORT}`))
