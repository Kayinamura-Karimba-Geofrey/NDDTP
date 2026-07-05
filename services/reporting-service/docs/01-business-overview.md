# NDDTP Reporting Service — Business Overview

## Purpose

The Reporting Service manages defence report generation — report definitions, on-demand and scheduled requests, output tracking, and generation lifecycle management.

## Responsibilities

- Report definition catalog (personnel, finance, operations, audit, compliance)
- On-demand report generation requests
- Recurring report schedules with cron expressions
- Report output artifact tracking (PDF, CSV, JSON, XLSX)
- Event publishing for analytics and notification integration

## Key Business Rules

- Only ACTIVE definitions accept new requests or schedules
- Request workflow: PENDING → PROCESSING → COMPLETED / FAILED
- Completed requests create output records with file path and record count
- Users can only cancel their own pending/processing requests
- Scheduled requests link to active schedules

## Request Workflow

```
PENDING → PROCESSING → COMPLETED
                    ↘ FAILED / CANCELLED
```

## Permissions

- `reporting:read/manage:definitions`
- `reporting:read/manage:requests`
- `reporting:read/manage:schedules`
- `reporting:read:reports`

## Dependencies

PostgreSQL (`nddtp_reporting`), Redis (DB 23), RabbitMQ, Auth Service (JWT)
