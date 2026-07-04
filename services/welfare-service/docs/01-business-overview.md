# NDDTP Welfare Service — Business Overview

## Purpose

The Welfare Service manages employee welfare benefits for the National Defence Digital Transformation Platform — programs, dependents, claims, and disbursements.

## Responsibilities

- Welfare program catalog (housing, hardship, education, medical, counseling)
- Dependent registration for benefit eligibility
- Welfare claim submission and review workflow
- Approval with amount adjustment
- Disbursement tracking with payment references
- Event publishing for notifications and audit

## Key Business Rules

- Requested amount cannot exceed program maximum
- Only active programs accept claims
- Dependents must belong to the claiming user
- Approved amount cannot exceed requested amount
- Disbursement only for approved claims
- Status history is append-only

## Permissions

- `welfare:read:programs` — view programs
- `welfare:manage:programs` — create programs (HR)
- `welfare:read:claims` — submit/view own claims and dependents
- `welfare:manage:claims` — review, approve, reject, disburse

## Dependencies

PostgreSQL (`nddtp_welfare`), Redis (DB 8), RabbitMQ, Auth Service (JWT)
