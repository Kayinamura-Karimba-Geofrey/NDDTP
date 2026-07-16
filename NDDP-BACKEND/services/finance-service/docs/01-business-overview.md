# NDDTP Finance Service — Business Overview

## Purpose

The Finance Service manages defence financial operations — budget categories, cost accounts, fiscal year allocations, expenditure requests, and payment transactions.

## Responsibilities

- Budget category catalog (personnel, operations, capital, maintenance)
- Cost account registration by department/unit
- Fiscal year budget allocation with committed and spent tracking
- Expenditure request workflow (draft → submit → approve/reject → pay)
- Payment transaction ledger for approved expenditures
- Event publishing for procurement, payroll, and reporting integration

## Key Business Rules

- Budget allocations are unique per account and fiscal year
- Only ACTIVE budgets can receive submitted expenditures
- Expenditure amount cannot exceed available budget (allocated − committed − spent)
- Submitting reserves (commits) budget; rejection/cancellation releases it
- Payment moves amount from committed to spent and creates a debit transaction
- Only APPROVED expenditures can be paid

## Expenditure Workflow

```
DRAFT → SUBMITTED → APPROVED → PAID
                ↘ REJECTED / CANCELLED
```

## Permissions

- `finance:read/manage:categories`
- `finance:read/manage:accounts`
- `finance:read/manage:budgets`
- `finance:read/manage:expenditures`
- `finance:read:reports`

## Dependencies

PostgreSQL (`nddtp_finance`), Redis (DB 19), RabbitMQ, Auth Service (JWT)
