# RESTANAGE local backend

RESTANAGE now includes an Express API backed by SQLite. The database is created automatically at `backend/data/restanage.sqlite` and seeded with the Indian menu and dining tables on first startup.

## Run locally

Use Node.js 22.5 or newer (the API uses Node's built-in SQLite module).

1. In the project root, run `npm run dev` to start the Vite frontend.
2. In another terminal, run `npm run backend:dev` to start the API.
3. The API listens at `http://localhost:3000/api`; the frontend is configured to use it through the root `.env`.

The frontend switches to API mode when `VITE_API_BASE_URL` is set. If needed, copy `backend/.env.example` to `backend/.env`, set a long random `JWT_SECRET`, then run `npm run seed:admin` inside `backend` to create or update the admin account from `ADMIN_EMAIL`, `ADMIN_NAME`, and `ADMIN_PASSWORD`.

## Deploy on Render

This repository includes a `render.yaml` Blueprint. The single Render web service builds the Vite app, serves the frontend and API from one HTTPS origin, and writes SQLite to a persistent disk. A paid Render web service is required for persistent disk storage; a free instance can lose the SQLite database when it restarts or redeploys.

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Render, create a new Blueprint and select that repository. Render will read `render.yaml`.
3. When prompted, set `ADMIN_EMAIL` and a new, unique `ADMIN_PASSWORD` of at least 12 characters. Render generates `JWT_SECRET` for you.
4. Apply the Blueprint and wait for the service health check to pass at `/api/health`.
5. Open the Render service URL, register a customer account, and sign in to admin with the email and password you configured.

The Render configuration uses a persistent disk mounted at `/var/data`, with the database at `/var/data/restanage.sqlite`. Keep the service at one instance while using SQLite; its disk is attached to only one instance. Render manages HTTPS for the service URL.

## Admin account

Use the values configured in `backend/.env` for local admin access. Never commit `.env` files or use local development credentials in production. Customers create accounts through the opening registration page. Admin pages require an admin login; customer accounts cannot access them.

## API overview

- `GET /api/health`
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/menu` and admin menu management under `/api/admin/menu`
- `POST /api/orders`, `GET /api/orders`, `PATCH /api/orders/:id/status`
- Admin dashboard, customers, tables, and operational records under `/api/admin/*`

Authenticated requests use `Authorization: Bearer <token>`. Data is stored locally in SQLite and is not configured for internet deployment, backups, or multiple server instances.
