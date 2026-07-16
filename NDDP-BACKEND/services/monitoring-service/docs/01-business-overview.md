# NDDTP Monitoring Service — Business Overview

## Purpose

The Monitoring Service provides platform observability for the National Defence Digital Transformation Platform — monitored targets, health check execution, and alert incident management.

## Responsibilities

- Monitoring target registration (services, databases, endpoints)
- Health check submission and lifecycle tracking
- Alert raising from failed checks with acknowledgement and resolution
- Event publishing for monitoring activity

## Key Business Rules

- Only ACTIVE targets accept new health checks
- Alerts can only be raised from FAILED health checks
- Check lifecycle: PENDING → RUNNING → PASSED / FAILED / CANCELLED
- Alert lifecycle: OPEN → ACKNOWLEDGED → RESOLVED / CLOSED

## Check Workflow

```
PENDING → RUNNING → PASSED
                  → FAILED
                  → CANCELLED
```

## Alert Workflow

```
OPEN → ACKNOWLEDGED → RESOLVED
    ↘ CLOSED
```

## Permissions

- `monitoring:read/manage:targets`
- `monitoring:read/manage:checks`
- `monitoring:read/manage:alerts`

## Dependencies

PostgreSQL (`nddtp_monitoring`), Redis (DB 33), RabbitMQ, Auth Service (JWT)
