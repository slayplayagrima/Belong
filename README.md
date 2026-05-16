# Belong

Belong is a full-stack animal adoption platform that connects adopters with verified NGOs and shelters. The project is split into independent npm apps for local development and deployment.

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query
- Backend: Node.js, Express, TypeScript, CORS, dotenv, Pino logging
- Package manager: npm

## Project Structure

```text
belong/
├── frontend/
├── backend/
├── .gitignore
├── README.md
└── package.json
```

## Setup

Install dependencies for each app:

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

Create backend environment variables:

```bash
cd backend
cp .env.example .env
```

## Development

Run the frontend:

```bash
cd frontend
npm run dev
```

Run the backend:

```bash
cd backend
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend health check: `http://localhost:5000/api/healthz`

## Useful Commands

From the repository root:

```bash
npm run typecheck
npm run build
```

From either `frontend/` or `backend/`:

```bash
npm run dev
npm run typecheck
npm run build
```
