# NDDTP Audit Service — Database Design

## Database: `nddtp_audit`

### Tables

| Table | Purpose |
|-------|---------|
| `audit_logs` | Immutable platform event audit trail with integrity hashing |
| `security_events` | Security-specific incidents requiring investigation |
| `retention_policies` | Per-category data retention configuration |

### `audit_logs`

- Append-only — no `updated_at` column by design
- `integrity_hash` — HMAC-SHA256 of canonical payload + `previous_hash`
- `previous_hash` — links to prior entry for tamper detection chain
- Indexed on: `user_id`, `event_type`, `category`, `resource_type+resource_id`, `correlation_id`, `created_at`

### `security_events`

- Tracks incidents: login failures, account locks, access denials, privilege escalation
- Supports resolution workflow (`is_resolved`, `resolved_at`, `resolved_by`)
- Resolved events eligible for purge after retention period

### `retention_policies`

- Seeded with 7 default categories (AUTHENTICATION, AUTHORIZATION, USER_MANAGEMENT, etc.)
- Cron job runs daily at 2 AM to purge expired records per policy

## Redis

- DB index: 4
- Keys: `audit:recent:{userId}`, `audit:stats:{date}`

## RabbitMQ

- Consumes: `auth.#`, `user.#`, `authorization.#`, `notification.#`
- Publishes: `audit.log.created`, `audit.security.recorded`, `audit.retention.applied`
- DLQ: `audit-service.platform.events.dlq`
