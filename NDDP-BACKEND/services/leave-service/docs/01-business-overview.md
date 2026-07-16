# NDDTP Leave Service — Business Overview

## Purpose

The Leave Service manages employee leave requests, balances, and approval workflows for the National Defence Digital Transformation Platform.

## Responsibilities

- Leave type catalog (annual, sick, maternity, etc.)
- Per-user leave balance tracking with accrual
- Leave request lifecycle with approval workflow
- Balance reservation on submit, confirmation on approve, release on reject/cancel
- Approval audit trail and status history
- Event publishing for notifications and audit

## Key Business Rules

- Leave days calculated inclusively (start to end date)
- Cannot exceed available balance (total - used - pending)
- Max consecutive days enforced per leave type
- Only owner can submit/cancel their requests
- Approvers require `leave:approve:requests` permission
- Balances auto-initialized on first access per year

## Dependencies

- PostgreSQL (`nddtp_leave`), Redis (DB 7), RabbitMQ, Auth Service (JWT)
