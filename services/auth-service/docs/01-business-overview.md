# NDDTP Authentication Service — Business Overview

## Purpose

The Authentication Service is the identity and access gateway for the National Defence Digital Transformation Platform (NDDTP). It manages user credentials, authentication flows, multi-factor authentication (MFA), session lifecycle, and token issuance. It is the single source of truth for **who** is authenticated on the platform.

## Responsibilities

- User credential registration and lifecycle management
- Email/password authentication with bcrypt hashing
- JWT access token and refresh token issuance with rotation
- Multi-factor authentication (TOTP) with backup codes
- Session management (create, list, revoke)
- Account lockout after failed login attempts
- Password reset workflow
- Login attempt auditing
- Publishing authentication domain events to RabbitMQ
- Consuming user lifecycle events from User Service

## Business Goals

1. **Secure Access** — Enforce enterprise-grade authentication with MFA support
2. **Compliance** — Maintain audit trails of all login attempts and security events
3. **Availability** — Support 99.9% uptime for authentication operations
4. **Scalability** — Handle concurrent authentication for thousands of personnel
5. **Interoperability** — Decouple from User Service via event-driven integration

## Business Rules

| Rule ID | Description |
|---------|-------------|
| BR-AUTH-001 | Passwords must be minimum 12 characters with uppercase, lowercase, number, and special character |
| BR-AUTH-002 | Accounts lock after 5 consecutive failed login attempts for 30 minutes |
| BR-AUTH-003 | Access tokens expire in 15 minutes; refresh tokens expire in 7 days |
| BR-AUTH-004 | Refresh tokens rotate on use; reuse detection revokes entire token family |
| BR-AUTH-005 | MFA is optional but enforced when enabled — login requires TOTP verification |
| BR-AUTH-006 | Password reset tokens expire after 1 hour and are single-use |
| BR-AUTH-007 | All sessions are revoked on password change or reset |
| BR-AUTH-008 | Soft-delete credentials when User Service publishes user.deleted event |
| BR-AUTH-009 | Email addresses are unique and stored lowercase |
| BR-AUTH-010 | New accounts start in PENDING_VERIFICATION status until email verified |

## Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-AUTH-001 | Register user credentials with userId, email, and password |
| FR-AUTH-002 | Authenticate via email/password and return JWT token pair |
| FR-AUTH-003 | Support MFA verification step during login |
| FR-AUTH-004 | Refresh access tokens using refresh token with rotation |
| FR-AUTH-005 | Logout and revoke session/tokens |
| FR-AUTH-006 | Change password (requires current password) |
| FR-AUTH-007 | Forgot/reset password workflow |
| FR-AUTH-008 | Setup, verify, and disable MFA (TOTP) |
| FR-AUTH-009 | List and revoke active sessions |
| FR-AUTH-010 | Retrieve authenticated user profile |
| FR-AUTH-011 | Record all login attempts with result |
| FR-AUTH-012 | Publish domain events for all security-relevant actions |

## Non-Functional Requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-AUTH-001 | Authentication latency (p95) | < 200ms |
| NFR-AUTH-002 | Token refresh latency (p95) | < 100ms |
| NFR-AUTH-003 | Availability | 99.9% |
| NFR-AUTH-004 | Concurrent sessions per user | Unlimited (configurable) |
| NFR-AUTH-005 | Password hashing | bcrypt, 12 rounds |
| NFR-AUTH-006 | Rate limiting | 10 login attempts/minute per IP |
| NFR-AUTH-007 | Audit retention | 7 years (via Audit Service) |
| NFR-AUTH-008 | Horizontal scaling | Stateless (Redis-backed sessions) |

## Dependencies

| Service | Dependency Type | Description |
|---------|----------------|-------------|
| PostgreSQL | Infrastructure | Primary data store |
| Redis | Infrastructure | Session cache, rate limiting, MFA setup cache |
| RabbitMQ | Infrastructure | Event publishing and consumption |
| User Service | Upstream (events) | Publishes user.created, user.updated, user.deactivated, user.deleted |
| Authorization Service | Downstream (events) | Consumes auth events for permission assignment |
| Notification Service | Downstream (events) | Consumes password reset and MFA events for email delivery |
| Audit Service | Downstream (events) | Consumes all auth events for compliance logging |
