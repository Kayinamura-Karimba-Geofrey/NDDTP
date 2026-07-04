# NDDTP Audit Service — Business Overview

## Purpose

The Audit Service is the centralized compliance and security logging backbone for the National Defence Digital Transformation Platform (NDDTP). It captures immutable audit trails from all platform microservices, records security events, and provides searchable compliance reports.

## Responsibilities

- Consume all platform events (`auth.#`, `user.#`, `authorization.#`, `notification.#`)
- Append-only immutable audit log storage with HMAC integrity chaining
- Security event detection and tracking (failed logins, access denied, account locks)
- User activity trails and resource change history APIs
- Retention policy enforcement with scheduled purge
- Publish audit domain events (`audit.log.created`, `audit.security.recorded`)

## Key Business Rules

- Audit logs are append-only — no updates or deletes via API
- Each log entry includes an HMAC-SHA256 integrity hash chained to the previous entry
- Security events from failed auth, access denial, and account lock are auto-recorded
- Default retention: 7 years (2555 days) for compliance categories
- Manual audit entries require `audit:create:logs` permission
- Search and read require `audit:read:logs` / `audit:read:security` permissions

## Dependencies

- PostgreSQL (`nddtp_audit`)
- Redis (cache invalidation for user activity)
- RabbitMQ (`nddtp.events` topic exchange)
- Auth Service (JWT validation)
