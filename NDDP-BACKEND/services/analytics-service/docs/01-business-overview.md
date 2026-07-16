# NDDTP Analytics Service — Business Overview

## Purpose

The Analytics Service manages defence platform analytics — metric definitions, time-series snapshots, dashboards, and ad-hoc query execution for operational intelligence.

## Responsibilities

- Metric definition catalog (personnel, finance, operations, readiness)
- Time-series metric snapshot recording and retrieval
- Dashboard management with configurable widgets
- Ad-hoc analytics query workflow with result tracking
- Event publishing for BI and notification integration

## Key Business Rules

- Only ACTIVE metrics accept new snapshots
- Period end must be after period start for snapshots
- Dashboard widgets must reference valid metric definitions
- Users can only activate their own dashboards
- Query workflow: PENDING → PROCESSING → COMPLETED / FAILED
- Users can only cancel their own pending/processing queries

## Query Workflow

```
PENDING → PROCESSING → COMPLETED
                    ↘ FAILED / CANCELLED
```

## Permissions

- `analytics:read/manage:metrics`
- `analytics:read/manage:dashboards`
- `analytics:read/manage:queries`
- `analytics:read:snapshots`

## Dependencies

PostgreSQL (`nddtp_analytics`), Redis (DB 24), RabbitMQ, Auth Service (JWT)
