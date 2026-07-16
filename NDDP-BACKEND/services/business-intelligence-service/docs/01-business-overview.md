# NDDTP Business Intelligence Service — Business Overview

## Purpose

The Business Intelligence Service manages structured defence analytics — data marts, semantic models, BI report definitions, and report execution lifecycle for enterprise decision support.

## Responsibilities

- BI dataset catalog (warehouses, data marts, external sources)
- Semantic model management with dimensions and measures
- BI report definition templates (tabular, pivot, chart, combined)
- Report execution workflow with result tracking
- Event publishing for analytics, reporting, and notification integration

## Key Business Rules

- Only ACTIVE datasets accept new semantic models
- Semantic models require at least one dimension and measure to activate
- Only ACTIVE semantic models accept new report definitions
- Only ACTIVE report definitions accept execution requests
- Execution workflow: PENDING → PROCESSING → COMPLETED / FAILED
- Users can only cancel their own pending/processing executions

## Execution Workflow

```
PENDING → PROCESSING → COMPLETED
                    ↘ FAILED / CANCELLED
```

## Permissions

- `bi:read/manage:datasets`
- `bi:read/manage:models`
- `bi:read/manage:reports`
- `bi:read:executions`

## Dependencies

PostgreSQL (`nddtp_business_intelligence`), Redis (DB 25), RabbitMQ, Auth Service (JWT)
