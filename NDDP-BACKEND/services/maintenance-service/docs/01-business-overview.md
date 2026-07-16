# NDDTP Maintenance Service — Business Overview

## Purpose

The Maintenance Service manages defence asset upkeep — maintenance categories, requests, work orders, tasks, and activity logs for vehicles, facilities, and equipment.

## Responsibilities

- Maintenance category catalog (preventive, corrective, emergency, inspection)
- Maintenance request workflow (submit → approve/reject)
- Work order creation from approved requests with task breakdown
- Work order lifecycle (schedule → start → complete)
- Task-level tracking with complete/skip support
- Append-only maintenance activity logs
- Event publishing for fleet, asset, and facilities integration

## Key Business Rules

- Work orders require at least one task
- Only APPROVED requests can spawn work orders
- All tasks must be completed or skipped before work order closure
- Tasks can only start when work order is IN_PROGRESS
- All status changes create maintenance log entries

## Permissions

- `maintenance:read/manage:categories`
- `maintenance:read/manage:requests`
- `maintenance:read/manage:work-orders`
- `maintenance:read/manage:tasks`

## Dependencies

PostgreSQL (`nddtp_maintenance`), Redis (DB 17), RabbitMQ, Auth Service (JWT)
