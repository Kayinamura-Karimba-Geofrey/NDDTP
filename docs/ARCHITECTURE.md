# NDDTP Platform Architecture

## Overview

The National Defence Digital Transformation Platform (NDDTP) is a **domain-driven microservices architecture** with 35 independently deployable NestJS services sharing a common platform library.

## Architectural Principles

| Principle | Implementation |
|-----------|----------------|
| Database per service | Each service owns `nddtp_<domain>` PostgreSQL schema |
| Shared nothing runtime | Independent deployables with isolated state |
| Shared platform library | `@nddtp/platform-core` for cross-cutting concerns |
| Event-driven integration | RabbitMQ topic exchange `nddtp.events` |
| API-first | OpenAPI/Swagger per service |
| Security by default | JWT + permission guards on all protected routes |
| Observability | Correlation IDs, structured logging, health probes |

## Repository Structure

```
NDDTP/
├── packages/
│   └── platform-core/          # Shared auth, observability, events, config
├── services/
│   ├── auth-service/           # Port 3001 — Identity gateway
│   ├── authorization-service/  # Port 3002 — RBAC
│   ├── ...                     # Domain services 3003–3034
│   └── ai-assistant-service/   # Port 3035 — AI conversations
├── scripts/                    # Monorepo automation
└── docs/                       # Platform documentation
```

## Layered Service Architecture

Each microservice follows a consistent internal structure:

```
src/
├── config/                 # Service-specific config (uses platform factories)
├── database/               # Entities, migrations, seeds
├── modules/
│   ├── cache/              # Redis integration
│   ├── <domain>/           # Domain modules (controllers, services, repos)
│   └── health/             # Re-exports PlatformHealthModule
├── events/                 # Domain event publisher (extends BaseEventPublisher)
├── common/                 # Domain enums, constants, DTOs
└── app.module.ts           # PlatformModule + domain modules
```

## Cross-Cutting Platform (`@nddtp/platform-core`)

- **Auth**: JWT strategy, guards, `@Public()`, `@RequirePermissions()`, `@CurrentUser()`
- **Observability**: Global exception filter with correlation ID, request interceptor
- **Events**: `BaseEventPublisher` with standard event envelope
- **Config**: `createPlatformConfiguration()` factory
- **Health**: Liveness (`/health/live`) and readiness (`/health/ready`) probes
- **Exceptions**: Standard domain exceptions
- **Utils**: `assertStatusTransition()` for workflow enforcement

## Service Communication

```
┌─────────────┐     JWT      ┌──────────────────┐
│   Client    │ ──────────► │  Domain Service   │
└─────────────┘             └────────┬─────────┘
                                     │ publish
                                     ▼
                            ┌──────────────────┐
                            │  nddtp.events    │
                            │  (RabbitMQ)      │
                            └──────────────────┘
```

## Service Catalog

| # | Service | Port | Database |
|---|---------|------|----------|
| 1 | auth | 3001 | nddtp_auth |
| 2 | authorization | 3002 | nddtp_authorization |
| 3 | user | 3003 | nddtp_user |
| 4 | notification | 3004 | nddtp_notification |
| 5 | audit | 3005 | nddtp_audit |
| 6–35 | … domain & platform services | 3006–3035 | nddtp_* |

## Development

```bash
# Install all workspaces
npm install

# Build shared platform library
npm run build:platform

# Build all services
npm run build:all

# Run tests across services
npm run test:all
```

## Production Hardening Roadmap

1. Deploy API gateway (Kong/Envoy) using API Management service as control plane
2. Add OpenTelemetry tracing across platform-core
3. Implement transactional outbox for reliable event delivery
4. Add background workers for Integration, Backup, Monitoring, and AI Assistant job execution
5. Centralize log aggregation (ELK/Datadog) and metrics (Prometheus/Grafana)
