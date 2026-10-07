# NDDTP — National Defence Digital Transformation Platform

| Folder | Description |
|--------|-------------|
| [NDDP-BACKEND](./NDDP-BACKEND/) | API gateway + NestJS microservices (currently `auth-service`) |
| [NDDP-FRONTEND](./NDDP-FRONTEND/) | React 19 enterprise web application |

> **Status:** the gateway registry lists 35 planned services, but only `auth-service` is
> implemented. Requests to other service keys return `502 Bad Gateway`. The frontend can run
> without a backend using the mock API (`VITE_ENABLE_MOCK_API=true`).

## Backend

```bash
cd NDDP-BACKEND
npm install

# Auth service (port 3001) — needs Postgres + Redis
npm run integration:infra   # Docker Postgres (auth DB on :5433) + Redis
cd services/auth-service
cp .env.example .env         # then set DB_PORT=5433 for the Docker DB
npm run migration:run && npm run seed
npm run start:dev

# API Gateway (port 3000 — required for frontend integration)
cd ../..
npm run gateway:install
npm run gateway:dev
```

## Frontend

```bash
cd NDDP-FRONTEND
cp .env.example .env
npm install && npm run dev
```

The Vite dev server proxies `/api/*` to the API Gateway at `http://localhost:3000`.

Demo accounts (development only — seeded by `npm run seed`, never in production):
`admin@mod.gov.rw` / `Nddtp@Mod2026!`, MFA test `mfa@mod.gov.rw` → OTP `123456`.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the Render + Neon setup.

## Security

- Never commit `.env` files or credentials; set secrets in the Render dashboard.
- VS Code automatic tasks are disabled for this workspace (`.vscode/settings.json`). Do not
  re-enable them — this repo has previously been targeted by a fake-font `folderOpen` task dropper.
