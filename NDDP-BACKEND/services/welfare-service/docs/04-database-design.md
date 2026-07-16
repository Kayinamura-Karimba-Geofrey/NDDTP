# NDDTP Welfare Service — Database Design

## Database: `nddtp_welfare`

| Table | Purpose |
|-------|---------|
| `welfare_programs` | Benefit program catalog |
| `dependents` | Registered family dependents |
| `welfare_claims` | Benefit claims with workflow |
| `claim_status_history` | Append-only status audit |
| `disbursements` | Payment records for approved claims |

### Claim Workflow

```
DRAFT → submit → UNDER_REVIEW → APPROVED → DISBURSED
                          ↘ REJECTED
         cancel ↘ CANCELLED
```

### Events

`welfare.program.created`, `welfare.dependent.registered`, `welfare.claim.submitted/approved/rejected/disbursed`
