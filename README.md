# Fullstack Starter

A modern fullstack pnpm monorepo starter with React, Hono, and PostgreSQL.

## Tech Stack

**Frontend (packages/web)**
- React 19 with TypeScript
- Vite for bundling
- TanStack Router for routing
- TanStack Query for data fetching
- Tailwind CSS v4

**Backend (packages/api)**
- Hono API
- Drizzle ORM with PostgreSQL
- Zod for validation

**Fullstack**
- Hono RPC for end-to-end type safety

## Prerequisites

- Node.js 18+
- pnpm 10+
- PostgreSQL database

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

Create a `.env` file in `packages/api`:

```env
DATABASE_URL=postgres://user:password@localhost:5432/dbname
FRONTEND_APP_URL=http://localhost:5173
PORT=3000
```

### 3. Set up the database

```bash
# Push schema to database
pnpm db:push

# Seed with sample data (optional)
pnpm db:seed
```

### 4. Start development servers

```bash
pnpm dev
```

This starts both the API (http://localhost:3000) and web app (http://localhost:5173) in parallel.

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:generate` | Generate migrations |
| `pnpm db:migrate` | Run migrations |
| `pnpm db:seed` | Seed the database |
| `pnpm db:studio` | Open Drizzle Studio |

## Project Structure

```
├── packages/
│   ├── api/              # Hono API server
│   │   ├── src/
│   │   │   ├── db/       # Database schema and connection
│   │   │   ├── lib/      # Utilities
│   │   │   └── routes/   # API routes
│   │   └── config.ts     # Environment config
│   └── web/              # React frontend
│       └── src/
│           ├── components/
│           ├── integrations/
│           ├── lib/
│           └── routes/
├── package.json
└── pnpm-workspace.yaml
```