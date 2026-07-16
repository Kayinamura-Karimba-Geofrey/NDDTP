# NDDTP — National Defence Digital Transformation Platform

| Folder | Description |
|--------|-------------|
| [NDDP-BACKEND](./NDDP-BACKEND/) | 35 NestJS microservices + platform-core |
| [NDDP-FRONTEND](./NDDP-FRONTEND/) | React 19 enterprise web application |

## Backend

```bash
cd NDDP-BACKEND
npm run build:platform && npm run build:all

# API Gateway (port 3000 — required for frontend integration)
npm run gateway:install
npm run gateway:dev
```

## Frontend

```bash
cd NDDP-FRONTEND
npm install && npm run dev
```

The Vite dev server proxies `/api/*` to the API Gateway at `http://localhost:3000`.

Demo login: any email + password (8+ chars). MFA test: `mfa@mod.gov.rw` → OTP `123456`.
