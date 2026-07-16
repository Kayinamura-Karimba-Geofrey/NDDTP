# NDDTP Personnel Service — Business Overview

## Purpose

The Personnel Service manages military HR records for the National Defence Digital Transformation Platform. It extends User Service profiles with service-specific data: ranks, assignments, units, qualifications, and service history.

## Responsibilities

- Personnel record lifecycle (linked to `userId` from User Service)
- Rank catalog and promotion history
- Organizational unit hierarchy
- Unit/position assignments with transfer tracking
- Qualification and certification management
- Service history (enlistment, promotion, transfer, deployment, separation)
- Event-driven sync with User Service

## Key Business Rules

- One personnel record per `userId` (unique constraint)
- Service number is unique across the platform
- Rank promotions must be to a higher level than current rank
- Only one current rank and one current assignment per personnel record
- Service status transitions follow defined state machine
- Auto-create personnel record on `user.user.created` event
- Suspend personnel on `user.user.deactivated`; soft-delete on `user.user.deleted`

## Dependencies

- PostgreSQL (`nddtp_personnel`)
- Redis (DB 5) — personnel and unit profile cache
- RabbitMQ — consumes `user.*` events, publishes `personnel.*` events
- User Service — source of user identity
- Auth Service — JWT validation
