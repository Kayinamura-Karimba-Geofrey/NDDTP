# NDDTP Authentication Service — Architecture

## Service Boundaries

The Authentication Service owns the **Identity & Access** bounded context. It does NOT own user profile data (User Service), permissions/roles (Authorization Service), or notification delivery (Notification Service).

```
┌─────────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION SERVICE                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │   Auth   │ │   MFA    │ │ Sessions │ │     Tokens       │ │
│  │  Module  │ │  Module  │ │  Module  │ │     Module       │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘ │
│       │            │            │                 │            │
│  ┌────┴────────────┴────────────┴─────────────────┴─────────┐ │
│  │              Infrastructure Layer                          │ │
│  │  PostgreSQL │ Redis │ RabbitMQ │ Winston │ Passport/JWT  │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
   ┌──────────┐        ┌──────────┐        ┌──────────────┐
   │PostgreSQL│        │  Redis   │        │  RabbitMQ    │
   └──────────┘        └──────────┘        └──────────────┘
```

## Domain Model

```
┌─────────────────┐       ┌─────────────────┐
│ AuthCredential  │──1:N──│   UserSession   │
│  - userId       │       │  - ipAddress    │
│  - email        │       │  - status       │
│  - passwordHash │       │  - mfaVerified  │
│  - status       │       │  - expiresAt    │
└────────┬────────┘       └─────────────────┘
         │
         ├──1:N── RefreshToken
         ├──1:1── MfaSetting ──1:N── MfaBackupCode
         ├──1:N── LoginAttempt
         └──1:N── PasswordResetToken
```

## Bounded Context

**Context:** Identity & Access Management

**Ubiquitous Language:**
- Credential — stored authentication identity (email + password hash)
- Session — active authenticated connection with device metadata
- Token Family — group of rotated refresh tokens for theft detection
- MFA Challenge — intermediate state requiring TOTP verification

## Internal Modules

| Module | Responsibility |
|--------|---------------|
| AuthModule | Login, register, logout, password management |
| MfaModule | TOTP setup, verification, disable |
| SessionModule | Session listing, revocation |
| TokenModule | JWT generation, refresh rotation |
| PasswordModule | Hashing, token generation |
| HealthModule | Liveness/readiness probes |
| EventsModule | RabbitMQ publish/consume |
| RedisModule | Caching infrastructure |
| DatabaseModule | TypeORM/PostgreSQL connection |

## Integration Points

### REST API (Inbound)
- `POST /api/v1/auth/register` — Register credentials
- `POST /api/v1/auth/login` — Authenticate
- `POST /api/v1/auth/mfa/verify` — Complete MFA login
- `POST /api/v1/auth/refresh` — Refresh tokens
- `POST /api/v1/auth/logout` — Logout
- `GET  /api/v1/auth/profile` — User profile
- `POST /api/v1/mfa/setup` — Initiate MFA
- `GET  /api/v1/sessions` — List sessions

### Published Events (Outbound via RabbitMQ)

| Event | Routing Key | Consumers |
|-------|-------------|-----------|
| User Registered | `auth.user.registered` | User Service, Audit Service |
| Login Success | `auth.user.login.success` | Audit Service, Analytics |
| Login Failed | `auth.user.login.failed` | Audit Service, Security Monitoring |
| Logout | `auth.user.logout` | Audit Service |
| Password Changed | `auth.user.password.changed` | Notification, Audit Service |
| Password Reset Requested | `auth.user.password.reset.requested` | Notification Service |
| Password Reset Completed | `auth.user.password.reset.completed` | Audit Service |
| MFA Enabled | `auth.user.mfa.enabled` | Audit Service |
| MFA Disabled | `auth.user.mfa.disabled` | Audit Service |
| Account Locked | `auth.user.account.locked` | Notification, Audit Service |
| Session Revoked | `auth.user.session.revoked` | Audit Service |
| Token Refreshed | `auth.user.token.refreshed` | Audit Service |

### Consumed Events (Inbound via RabbitMQ)

| Event | Routing Key | Action |
|-------|-------------|--------|
| User Deactivated | `user.user.deactivated` | Set credential status to INACTIVE |
| User Deleted | `user.user.deleted` | Soft-delete credentials |
| User Updated | `user.user.updated` | Sync email if changed |

## Architecture Diagram — Authentication Flow

```
Client                    Auth Service              PostgreSQL    Redis
  │                           │                        │           │
  │── POST /auth/login ──────►│                        │           │
  │                           │── find credential ────►│           │
  │                           │◄── credential ─────────│           │
  │                           │── verify password      │           │
  │                           │── check MFA enabled    │           │
  │                           │                        │           │
  │  [if MFA enabled]         │── create session ─────►│           │
  │◄── mfaToken ──────────────│                        │           │
  │                           │                        │           │
  │── POST /mfa/verify ───────►│                        │           │
  │                           │── verify TOTP          │           │
  │                           │── generate tokens      │           │
  │                           │── store refresh ──────►│           │
  │                           │── cache session ──────────────────►│
  │◄── accessToken + refresh ─│                        │           │
  │                           │── publish login.success│           │
  │                           │         (RabbitMQ)     │           │
```

## RabbitMQ Configuration

```
Exchange: nddtp.events (topic, durable)
DLX Exchange: nddtp.events.dlx (topic, durable)

Queues:
  auth-service.user.events (durable, DLX configured)
  auth-service.user.events.dlq (durable)

Bindings:
  nddtp.events → auth-service.user.events [user.user.*]
```

## Caching Strategy

| Key Pattern | TTL | Purpose |
|-------------|-----|---------|
| `auth:session:{id}` | 3600s | Active session cache |
| `auth:refresh:{hash}` | 604800s | Refresh token validation |
| `auth:mfa:setup:{userId}` | 600s | MFA setup temporary data |
| `auth:password_reset:{hash}` | 3600s | Password reset token |
| `auth:login_attempts:{email}` | 1800s | Failed attempt counter |

## Security Architecture

```
Request → Helmet → CORS → Rate Limiter → JWT Guard → Controller
                ↓
         Correlation ID → Winston Logger → Global Exception Filter
```
