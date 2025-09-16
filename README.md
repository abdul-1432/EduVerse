# EduVerse – Gamified Learning & Accessibility

A production-ready MERN + TypeScript monorepo with Docker Compose. Includes:
- React + Vite frontend with Three.js-ready avatar UI, quests/quizzes, leaderboard, accessibility mode (OpenDyslexic font, reduced motion, high contrast), and speech-to-text via Web Speech API.
- Express + TypeScript API with JWT auth, quizzes, XP/badges, leaderboard, user settings, audit logging, robust error handling.
- MongoDB for persistence.
- Nginx serving the client and reverse-proxying the API.

## Quick start (Docker)

1) Copy env template and set secrets:

```bash
cp .env.example .env
# Fill JWT_SECRET, CORS_ORIGIN, etc.
```

2) Build and start

```bash
docker compose up -d --build
```

- Web: http://localhost:8080
- API: http://localhost:4000 (proxied via Nginx at /api in production image)
- Mongo: mongodb://localhost:27017/eduverse

3) Seed sample data

```bash
docker compose exec api node dist/scripts/seed.js
```

## Local dev (without Docker)

- Server
```bash
cd server
cp .env.example .env
npm i
npm run dev
```
- Client
```bash
cd client
npm i
npm run dev
```

## Environment variables

Create `.env` in repo root (used by docker-compose and server):

```ini
# Common
JWT_SECRET=replace_me
CORS_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/eduverse
NODE_ENV=development
PORT=4000
# Speech/AI (optional)
GOOGLE_PROJECT_ID=
GOOGLE_APPLICATION_CREDENTIALS=/run/secrets/google_service_account.json
OPENAI_API_KEY=
```

Store Google credentials as a Docker secret or bind mount. Avoid committing secrets.

## Production build

```bash
docker compose -f docker-compose.yml up -d --build
```

For cloud hosting, point a domain and terminate TLS at a load balancer or front Nginx with certbot.

## Tech choices

- TypeScript across stack
- Vite for fast builds
- JWT stateless auth with refresh tokens
- Zod validation for request bodies
- Helmet, cors, rate-limit, morgan
- Audit logs collection in Mongo

## Repo structure

```
client/           # React app (Vite)
server/           # Express API
nginx/            # Nginx config for production
Dockerfile(s)     # In client/ and server/
docker-compose.yml
```

## Demo script

- Register/login
- Choose avatar, toggle Accessibility Mode (OpenDyslexic font)
- Complete a short quiz quest
- See XP increment, badge unlocked, and leaderboard update

## License
MIT