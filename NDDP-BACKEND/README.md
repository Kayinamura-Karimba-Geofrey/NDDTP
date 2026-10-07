# NDDP Backend

National Defence Digital Transformation Platform — API gateway and NestJS microservices.

## Structure

```
NDDP-BACKEND/
├── api-gateway/              # Express reverse proxy: /api/svc/{serviceKey}/... → service
├── services/
│   └── auth-service/         # Authentication, sessions, MFA (NestJS, Postgres, Redis)
├── scripts/                  # Build, test, seed and integration automation
├── docs/                     # Architecture documentation
└── package.json              # npm workspaces root
```

> The gateway registry (`api-gateway/src/shared/service-registry.json`) lists 35 planned
> services on ports 3001–3035. Only `auth-service` exists today; `packages/platform-core`
> is not in this repository yet, so `npm run build:platform` and `npm run install:deps` fail.

## Commands

```bash
npm install                      # install workspace dependencies
npm test                         # turbo: run tests in every workspace
npm run build                    # turbo: build every workspace
npm run integration:infra        # local Postgres + Redis via Docker
npm run gateway:install && npm run gateway:dev
```

Inside `services/auth-service`:

```bash
npm run start:dev                # watch mode on :3001
npm test                         # unit tests
npm run migration:run            # apply migrations (uses DATABASE_URL or DB_*)
npm run seed                     # demo users — refuses to run when NODE_ENV=production
```

## Gateway configuration

Each upstream defaults to `http://$SERVICE_HOST:<registry port>`. When services run on
separate hosts, set `SERVICE_URL_<KEY>` (for example `SERVICE_URL_AUTH`). See
`api-gateway/.env.example` for rate limit and body size settings.

## Documentation

- [Architecture](./docs/ARCHITECTURE.md)
- [Deployment](../DEPLOYMENT.md)
