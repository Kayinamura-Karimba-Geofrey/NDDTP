# NDDTP Finance Service — Database Design

## Database: `nddtp_finance`

| Table | Purpose |
|-------|---------|
| `budget_categories` | Budget/expense category catalog |
| `cost_accounts` | Cost center accounts by department |
| `budget_allocations` | Fiscal year allocations with committed/spent tracking |
| `expenditure_requests` | Expenditure approval workflow |
| `finance_transactions` | Payment transaction ledger |

### Expenditure Workflow

```
DRAFT → SUBMITTED → APPROVED → PAID
                ↘ REJECTED / CANCELLED
```

### Events

`finance.category.created`, `finance.account.created`, `finance.budget.allocated`, `finance.expenditure.submitted/approved/rejected/paid`
