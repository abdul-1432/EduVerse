# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

EduVerse is a TypeScript MERN monorepo (workspaces: client, server) with Docker Compose. The client is a React + Vite app; the server is an Express API with JWT auth and MongoDB. CI builds and deploys the client to GitHub Pages and publishes the API image to GHCR.

- Node version: 20.x (see CI)
- Package manager: npm (workspaces)
- Default ports: client dev 5173, API 4000, web (nginx) 8080, Mongo 27017

Commands you’ll use most

- Install all dependencies (workspaces)
  ```bash
  npm install
  ```

- Local development (without Docker)
  - API
    ```bash
    cd server
    cp .env.example .env
    npm run dev
    ```
  - Client
    ```bash
    cd client
    npm run dev
    ```

- Build
  - All workspaces
    ```bash
    npm run build
    ```
  - Client only / preview static build
    ```bash
    cd client
    npm run build
    npm run preview -- --port 5173
    ```
  - Server only / start compiled API
    ```bash
    cd server
    npm run build
    npm start
    ```

- Lint (API)
  ```bash
  cd server
  npm run lint
  ```

- Seed sample data (after building the server)
  ```bash
  # Local (server must be compiled: npm run build)
  cd server
  npm run seed
  ```

- Docker Compose (recommended for local prod-style)
  ```bash
  # Build and start all services (mongo, api, web)
  docker compose up -d --build

  # Web:   http://localhost:8080
  # API:   http://localhost:4000
  # Mongo: mongodb://localhost:27017/eduverse

  # Seed via running API container (server compiled in image)
  docker compose exec api node dist/scripts/seed.js
  ```

- Tests
  - No test scripts are configured in this repo at present.

Environment variables

Create a .env at the repo root for Docker Compose (and copy server/.env.example to server/.env for local API dev):

```ini
# Common
JWT_SECRET=replace_me
CORS_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://localhost:27017/eduverse
NODE_ENV=development
PORT=4000
# Optional integrations
GOOGLE_PROJECT_ID=
GOOGLE_APPLICATION_CREDENTIALS=/run/secrets/google_service_account.json
OPENAI_API_KEY=
```

High-level architecture

- Monorepo layout (npm workspaces)
  - client/ – React + Vite (TypeScript). Builds to static assets in client/dist.
  - server/ – Express (TypeScript). Compiles to server/dist and runs node dist/index.js.
- Runtime composition (docker-compose.yml)
  - mongo (MongoDB 6) for persistence.
  - api (Node 20) runs the compiled Express API; depends_on: mongo. CORS_ORIGIN and MONGO_URI are set via env.
  - web (nginx) serves the client production build on port 80 mapped to localhost:8080. The client image is built in client/Dockerfile (multi-stage). Note: that Dockerfile copies nginx.conf; ensure client/nginx.conf exists when modifying nginx behavior or API proxying.
- Client ↔ API
  - In Docker, VITE_API_BASE_URL is passed to the web container at build/runtime for API origin. For local dev, the client calls the dev server origin; the API enables CORS based on CORS_ORIGIN.
- API concerns
  - JWT-based auth (stateless), Zod validation, Helmet, CORS, rate-limiting, morgan logging; audit logging stored in Mongo.
- CI/CD (GitHub Actions)
  - .github/workflows/deploy-pages.yml builds client on pushes to main (client/ changes) and deploys to GitHub Pages.
  - .github/workflows/build-api.yml builds and pushes the server image to ghcr.io/<owner>/eduverse-api:latest on pushes to main (server/ changes).

Notes for future changes

- If deploying the client to GitHub Pages needs a specific API URL, set VITE_API_BASE_URL in the Pages workflow (e.g., via env or repository variables) so Vite inlines the correct value at build time.
- When hosting the API outside Docker Compose, set MONGO_URI, JWT_SECRET, and CORS_ORIGIN appropriately, then run npm run build && npm start under Node 20.
