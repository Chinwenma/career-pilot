# Career Pilot

An AI-powered job search assistant built with Next.js. Analyze your CV, match it against job descriptions, generate tailored cover letters, and track your applications — all in one dashboard.

## Features

- **CV Analysis** — upload your CV and get AI-driven feedback
- **Job Match** — compare your CV against a job description for fit
- **Cover Letter Generator** — generate tailored cover letters with AI
- **Application Tracker** — keep track of jobs you've applied to
- **Auth** — email/password login with an admin approval flow

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, Turbopack)
- [Prisma](https://www.prisma.io) + PostgreSQL
- [NextAuth](https://authjs.dev)
- [Anthropic (Claude) SDK](https://docs.claude.com) for AI features
- Tailwind CSS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh)
- A PostgreSQL database

### Setup

1. Clone the repo and install dependencies:

   ```bash
   bun install
   ```

2. Create a `.env.local` file with the following variables:

   ```env
   DATABASE_URL=
   NEXTAUTH_SECRET=
   ANTHROPIC_API_KEY=
   APP_URL=
   FORMSPREE_ENDPOINT=
   ```

3. Run database migrations:

   ```bash
   bunx prisma migrate dev
   ```

4. Start the dev server:

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description                    |
| --------------------- | ------------------------------ |
| `bun run dev`         | Start the dev server           |
| `bun run build`       | Build for production           |
| `bun run start`       | Start the production server    |
| `bun run lint`        | Lint and auto-fix               |
| `bun run type-check`  | Run TypeScript checks          |
| `bun run test`        | Run unit tests (Vitest)        |
| `bun run test:e2e`    | Run end-to-end tests (Cypress) |
| `bun run db:seed`     | Seed the database              |
