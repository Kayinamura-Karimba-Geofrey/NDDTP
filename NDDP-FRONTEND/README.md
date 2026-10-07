# NDDP Frontend

Enterprise React frontend for the **National Defence Digital Transformation Platform (NDDTP)** — Ministry of Defence, Republic of Rwanda.

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · Redux Toolkit · RTK Query · React Router · React Hook Form · Zod · Recharts

## Quick Start

```bash
cd NDDP-FRONTEND
cp .env.example .env
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Demo Login (development builds only)

Pre-filled on the sign-in page in `npm run dev`. Production builds strip these values unless
`VITE_ENABLE_DEMO_LOGIN=true` — never enable that for a real deployment.

| Account | Email | Password |
|---------|-------|----------|
| **Super Admin** | `admin@mod.gov.rw` | `Nddtp@Mod2026!` |
| **HR Officer** | `officer@mod.gov.rw` | `Nddtp@Mod2026!` |
| **MFA Test** | `mfa@mod.gov.rw` | `Nddtp@Mod2026!` → OTP `123456` |

## Branding

Uses official RDF imagery from [MoD Rwanda](https://mod.gov.rw) and [RDF Flickr](https://www.flickr.com/photos/rwandadefenceforce/).

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)

## Docker

```bash
docker compose up --build
```
