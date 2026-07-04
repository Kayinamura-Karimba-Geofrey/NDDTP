# NDDTP Performance Service — Business Overview

## Purpose

The Performance Service manages employee performance management for National Defence personnel — review cycles, goals, assessments, ratings, and improvement plans.

## Responsibilities

- Performance review cycle management (annual, quarterly, probation, project)
- Rating criteria catalog with weighted competencies
- Employee goal setting and progress tracking
- Self-assessment and manager review workflow with competency ratings
- Performance improvement plans (PIPs) for underperforming personnel
- Event publishing for notifications, personnel records, and audit

## Key Business Rules

- Only one active performance cycle at a time
- Goals can only be added to non-closed cycles
- One review per user per cycle
- Self-assessment must precede manager review
- Manager review includes per-criteria ratings
- Improvement plans require manager assignment

## Permissions

- `performance:read:cycles` / `performance:manage:cycles`
- `performance:read:goals` / `performance:manage:goals`
- `performance:read:reviews` / `performance:manage:reviews`
- `performance:read:plans` / `performance:manage:plans`

## Dependencies

PostgreSQL (`nddtp_performance`), Redis (DB 11), RabbitMQ, Auth Service (JWT)
