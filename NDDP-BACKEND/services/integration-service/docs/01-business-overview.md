# NDDTP Integration Service — Business Overview

## Purpose

The Integration Service manages external system connectivity for the National Defence Digital Transformation Platform — connectors, API endpoint mappings, and sync job execution with audit logs.

## Responsibilities

- External system connector management (HRIS, ERP, Finance)
- API endpoint mapping per connector
- Integration job submission and lifecycle tracking
- Job execution logging
- Event publishing for integration activity

## Key Business Rules

- Only ACTIVE connectors accept new endpoints and jobs
- Endpoint codes must be unique within a connector
- Jobs must reference an endpoint belonging to the specified connector
- Job lifecycle: PENDING → RUNNING → COMPLETED / FAILED / CANCELLED
- Every job state change records a log entry

## Job Workflow

```
PENDING → RUNNING → COMPLETED
                  → FAILED
                  → CANCELLED
PENDING → CANCELLED
```

## Permissions

- `integration:read/manage:connectors`
- `integration:read/manage:endpoints`
- `integration:read/manage:jobs`

## Dependencies

PostgreSQL (`nddtp_integration`), Redis (DB 30), RabbitMQ, Auth Service (JWT)
