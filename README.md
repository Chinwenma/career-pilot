# CareerPilot AI

An AI-powered job search assistant built with Next.js. Analyze your CV, match it against job descriptions, generate tailored cover letters, and track your applications — all in one dashboard.

**[🚀 Live Demo](https://career-pilot-eosin.vercel.app/)** | **[GitHub](https://github.com/Chinwenma/career-pilot)**

---

## Current Features

- ✅ **CV Analysis** — Upload a PDF/DOCX (or paste text) and get AI-driven insights: ATS score, strengths, weaknesses, missing skills, suggestions
- ✅ **Job Match** — Compare an analyzed CV against a job description to get a match percentage, matching/missing skills, recommended keywords, and suggestions
- ✅ **Cover Letter Generator** — AI-generated cover letters tailored to a job description
- ✅ **Application Tracker** — Log applications with company, position, status, date, location, salary, and notes
- ✅ **Authentication** — Email/password login with an admin approval flow (email notification via Formspree)
- ✅ **Dashboard** — Overview of your job search activity

### Roadmap

- 🚧 Interview preparation (AI-generated Q&A)
- 🚧 LinkedIn job import

---

## Tech Stack

**Frontend**
- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev) + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com)
- [Lucide React](https://lucide.dev) (icons),
- [Framer Motion](https://www.framer.com/motion/) (animation)
- React Hook Form + Zod (form validation)

**Backend**
- Next.js Server Actions & Route Handlers
- [Prisma 7](https://www.prisma.io) + `@prisma/adapter-pg` → PostgreSQL

**Auth**
- [NextAuth (Auth.js) v5](https://authjs.dev), credentials provider, JWT sessions, bcrypt password hashing
- Formspree for admin-approval email notifications

**AI**
- [Anthropic Claude API](https://docs.claude.com) (`claude-haiku-4-5`) for CV analysis, job matching, and cover letter generation
- `pdfjs-dist` / `mammoth` for parsing uploaded PDF/DOCX CVs

**Deployment**
- [Vercel](https://vercel.com) (hosting + build)

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) 1.0+
- A PostgreSQL database

### Local Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Chinwenma/career-pilot.git
   cd career-pilot
   ```

2. **Install dependencies:**

   ```bash
   bun install
   ```

3. **Set up environment variables** in `.env.local`:

   ```env
   DATABASE_URL=postgresql://user:password@host/careerpilot
   NEXTAUTH_SECRET=your-random-secret-here
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   APP_URL=http://localhost:3000
   FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxx
   ```

   - `NEXTAUTH_SECRET`: generate with `openssl rand -base64 32`
   - `ANTHROPIC_API_KEY`: from the [Anthropic Console](https://console.anthropic.com/keys)
   - `FORMSPREE_ENDPOINT`: from [Formspree](https://formspree.io) (used to email the admin for new-user approvals)

4. **Run database migrations:**

   ```bash
   bunx prisma migrate dev
   ```

5. **Start the dev server:**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command               | Description                                |
| ---------------------- | ------------------------------------------- |
| `bun run dev`          | Start the dev server                        |
| `bun run build`        | `prisma generate` then build for production |
| `bun run start`        | Start the production server                 |
| `bun run lint`         | Lint and auto-fix                           |
| `bun run type-check`   | Run TypeScript checks                       |
| `bun run format`       | Format code with Prettier                   |
| `bun run db:seed`      | Seed the database                           |

---

## Deployment

Deployed on [Vercel](https://vercel.com). To deploy your own:

1. Push the repo to GitHub and import it into Vercel.
2. Add the environment variables from step 3 above (with `APP_URL` set to your Vercel domain) in the Vercel project settings.
3. Deploy — `prisma generate` runs automatically via the `postinstall` and `build` scripts, so no extra build configuration is needed.

---

## Project Structure

```
career-pilot/
├── app/
│   ├── (auth)/                  # login, register, forgot-password
│   ├── (dashboard)/             # dashboard, cv-analysis, job-match, cover-letter, applications, profile, settings
│   ├── actions/                 # server actions (auth, cv-analysis, job-match, applications, profile)
│   ├── api/
│   │   ├── admin/approve-user/
│   │   ├── auth/[...nextauth]/
│   │   └── cover-letter/generate/
│   └── page.tsx                 # landing page
├── components/
│   └── dashboard/                # layout, cv-analysis, job-match, applications, profile components
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── prisma.ts                 # Prisma client
│   ├── notify-owner.ts           # Formspree admin-approval notification
│   └── approval-token.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── .github/workflows/ci.yml      # type-check + build on push/PR
```

---

## Database Schema

- **User** — email, password (hashed), name, location, headline, bio, skills, `approvalStatus` (PENDING/APPROVED/REJECTED)
- **Application** — company, position, status, dateApplied, location, salary, notes
- **CVAnalysis** — fileName, cvText, atsScore, strengths, weaknesses, missingSkills, suggestions
- **JobMatch** — linked to a CVAnalysis; jobDescription, matchPercentage, matchingSkills, missingSkills, recommendedKeywords, suggestions

---

## How It Works

1. **Register** → provide email, password, name
2. **Wait for approval** → the admin gets a Formspree email and approves the account
3. **Log in** → access the dashboard
4. **Analyze your CV** → upload a PDF/DOCX or paste text, get AI feedback
5. **Match to jobs** → paste a job description, see compatibility against your analyzed CV
6. **Generate a cover letter** → tailored to the job description
7. **Track applications** → log each one and update its status as it progresses

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Push to the branch and open a Pull Request

---

## Acknowledgments

- [Anthropic](https://anthropic.com) for the Claude API
- [Vercel](https://vercel.com) for hosting
- [Prisma](https://www.prisma.io) and [Next.js](https://nextjs.org)
