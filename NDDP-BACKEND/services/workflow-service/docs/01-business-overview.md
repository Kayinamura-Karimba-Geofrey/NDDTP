# NDDTP Workflow Service — Business Overview

## Purpose

The Workflow Service provides cross-domain approval orchestration — workflow definitions, running instances, sequential approval tasks, and activity logging for leave, expenditure, procurement, and other platform processes.

## Responsibilities

- Workflow definition catalog with multi-step approval chains
- Workflow instance lifecycle (draft → start → complete/reject/cancel)
- Sequential task assignment and decision tracking
- Append-only workflow activity logs
- Event publishing for domain service integration

## Key Business Rules

- Definitions require at least one approval step
- Entity type must match definition when creating instances
- Starting an instance creates tasks for all steps
- Only the current step task can be actioned
- Task rejection terminates the workflow instance
- Required steps cannot be skipped
- All steps approved/skipped completes the workflow

## Instance Workflow

```
DRAFT → RUNNING → COMPLETED
              ↘ REJECTED / CANCELLED
```

## Permissions

- `workflow:read/manage:definitions`
- `workflow:read/manage:instances`
- `workflow:read/manage:tasks`

## Dependencies

PostgreSQL (`nddtp_workflow`), Redis (DB 21), RabbitMQ, Auth Service (JWT)
