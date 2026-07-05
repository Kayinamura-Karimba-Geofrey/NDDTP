# NDDTP Visitor Service — Business Overview

## Purpose

The Visitor Service manages defence installation access — visit sites, visitor registration, visit request approval, and check-in/check-out tracking.

## Responsibilities

- Visit site/gate catalog (main gate, secondary gate, buildings)
- Visitor registration with ID document tracking
- Visit request workflow (submit → approve/reject → check-in → check-out)
- Check-in and check-out log recording
- Blacklist enforcement for restricted visitors
- Event publishing for security and facilities integration

## Key Business Rules

- Blacklisted visitors cannot request visits
- Visits must be scheduled in the future
- Only APPROVED visits can be checked in
- Only ACTIVE (checked-in) visits can be checked out
- Check-out automatically completes the visit
- Duplicate check-in blocked while visitor is on-site

## Visit Workflow

```
PENDING → APPROVED → ACTIVE → COMPLETED
      ↘ REJECTED / CANCELLED
```

## Permissions

- `visitor:read/manage:sites`
- `visitor:read/manage:visitors`
- `visitor:read/manage:visits`
- `visitor:read/manage:checkins`

## Dependencies

PostgreSQL (`nddtp_visitor`), Redis (DB 20), RabbitMQ, Auth Service (JWT)
