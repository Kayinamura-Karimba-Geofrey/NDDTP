# NDDTP Backup Service — Business Overview

## Purpose

The Backup Service manages data protection for the National Defence Digital Transformation Platform — backup policy definitions, job execution, and restore operations.

## Responsibilities

- Backup policy management (schedule, retention, target type)
- Backup job submission and lifecycle tracking
- Restore request management from completed backups
- Event publishing for backup and restore activity

## Key Business Rules

- Only ACTIVE policies accept new backup jobs
- Restore requests require a COMPLETED backup job with a valid backup path
- Job lifecycle: PENDING → RUNNING → COMPLETED / FAILED / CANCELLED
- Restore lifecycle: PENDING → RUNNING → COMPLETED / FAILED / CANCELLED

## Job Workflow

```
PENDING → RUNNING → COMPLETED
                  → FAILED
                  → CANCELLED
```

## Permissions

- `backup:read/manage:policies`
- `backup:read/manage:jobs`
- `backup:read/manage:restores`

## Dependencies

PostgreSQL (`nddtp_backup`), Redis (DB 32), RabbitMQ, Auth Service (JWT)
