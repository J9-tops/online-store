# Online Store

A full-stack e-commerce application built with Next.js (App Router), TypeScript, Tailwind CSS and Prisma (PostgreSQL). It provides product and category management, sales/coupons, user accounts with roles (Admin, Vendor, User), a shopping cart, and vendor/admin pages.

This README explains how to run the project locally, required environment variables, Prisma/database workflow, and useful development tips.

## Table of contents

- Quick start
- Scripts
- Environment variables (.env)
- Database & Prisma
- Project structure
- Authentication, email & uploads
- Deployment tips

## Quick start

Prerequisites

- Node.js (18+ recommended)
- pnpm (project uses pnpm)
- PostgreSQL database (local or remote)

1. Install dependencies

```powershell
cd online-store
pnpm install
```

2. Create an environment file

Create a `.env.local` at the repository root and add the variables shown in the "Environment variables" section below.

3. Prepare the database and Prisma client

Use migrations (recommended during development):

```powershell
pnpm migrate
pnpm generate
```

Or push the schema directly (no migration files):

```powershell
pnpm db:push
pnpm generate
```

4. Start the dev server

```powershell
pnpm dev
```

Open http://localhost:3000 to view the app.

## Scripts

The main scripts available in `package.json`:

- `pnpm dev` — start Next.js dev server
- `pnpm build` — `prisma migrate deploy && prisma generate && next build` (apply migrations, generate Prisma client, build)
- `pnpm start` — start production server
- `pnpm lint` — run ESLint
- `pnpm db:push` — `pnpm prisma db push` (apply schema without migrations)
- `pnpm migrate` — `pnpm prisma migrate dev` (create & apply migrations)
- `pnpm migrate:reset` — reset the migrations (development only)
- `pnpm migrate:status` — show migration status
- `pnpm generate` — `pnpm prisma generate` (regenerate Prisma client)
- `pnpm studio` — `pnpm prisma studio` (open Prisma Studio)
- `pnpm db:wipe` — runs `ts-node ./utils/truncate-table.ts` (custom truncate script)

> Note: The `build` script already runs `prisma migrate deploy` — in CI you may prefer to run migrations as a separate step depending on your deployment flow.

## Environment variables

Create `.env.local` in the project root. Example template (values are examples — replace with real secrets):

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"

# Client base URL (used by libs that call the API)
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Nodemailer (transactional emails)
NODEMAILER_USER="your-smtp-user@example.com"
NODEMAILER_APP_PASSWORD="your-smtp-app-password"

# Admin and vendor email lists (semicolon-separated)
ADMIN_EMAILS="admin1@example.com;admin2@example.com"
VENDOR_EMAILS="vendor1@example.com;vendor2@example.com"

# Google OAuth (optional — used if you enable Google sign-in)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary (optional — used by file upload hook)
NEXT_PUBLIC_PRESET_KEY="upload_preset_here"
NEXT_PUBLIC_CLOUD_NAME="your_cloud_name"
```

Files and code check for missing keys and often guard access, so Cloudinary and Google values can be left blank in local development if you don't need those integrations.

## Database & Prisma

Prisma is configured to use PostgreSQL (see `prisma/schema.prisma`). Primary models include `User`, `Product`, `Category`, `Sale`, `Session`, `Account`, and `Verification`. Enums include `UserRole` (Admin, Vendor, User) and `Status` (Hot, New, Sale).

Common Prisma commands:

```powershell
pnpm migrate           # create + apply migrations (dev)
pnpm db:push           # apply schema directly without migrations
pnpm generate          # generate Prisma client
pnpm studio            # open Prisma Studio
```

If you change the schema, run `pnpm migrate` (dev) and `pnpm generate` to keep Prisma client in sync.

## Project structure (selected)

- `app/` — Next.js App Router routes, layouts and API routes (server & client components)
- `components/` — React UI components (UI primitives under `components/ui/`)
- `lib/` — server utilities and integrations (Prisma client, nodemailer, auth helpers)
- `prisma/` — Prisma schema and migrations
- `redux/` — Redux store and slices
- `hooks/` — React hooks (e.g., `useFileUpload.tsx` for Cloudinary)
- `actions/` — server actions (product/category/user/sale/email flows)
- `services/` — client-side API wrappers
- `utils/` — small utilities (includes `truncate-table.ts` used by `db:wipe`)

## Authentication, roles & authorization

- Roles are defined via Prisma `UserRole` enum: `Admin`, `Vendor`, `User`.
- `lib/auth.ts` references `ADMIN_EMAILS` and `VENDOR_EMAILS` environment variables (semicolon-separated). These are used to map email addresses to roles during sign-up or provisioning.
- Google OAuth credentials (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`) are optional; code checks for their presence before enabling provider flows.

## Emails & uploads

- Emails: `lib/nodemailer.ts` uses `NODEMAILER_USER` and `NODEMAILER_APP_PASSWORD` from env to configure SMTP transport. Actions like `actions/send-email.ts` and others rely on this.
- File uploads: `hooks/useFileUpload.tsx` supports Cloudinary using `NEXT_PUBLIC_PRESET_KEY` and `NEXT_PUBLIC_CLOUD_NAME`. Upload is optional and only active when those vars are present.

## Deployment tips

- On platforms like Vercel, add the environment variables to the project settings. Ensure the `DATABASE_URL` points to your production Postgres instance.
- CI: Consider running migrations before building. The `build` script runs `prisma migrate deploy` by default, which requires the build environment to have DB access.
- If you prefer not to run migrations during `next build`, run migrations as a separate deploy step:

```powershell
pnpm migrate:status
pnpm migrate # or run prisma migrate deploy in CI
pnpm build
```

---
